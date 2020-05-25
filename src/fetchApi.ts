import { API_ROOT } from './index';
import netlifyIdentity from 'netlify-identity-widget';
import { captureException, withScope } from '@sentry/core';

async function doFetch(endpoint: string, user: any, opts?: any) {
  return fetch(
    `${API_ROOT}/${endpoint}`,
    {
      ...opts,
      headers: new Headers({
        ...opts?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user?.token?.access_token,
      }),
    }
  );
}

export default async function fetchApi(endpoint: string, user: any, opts?: any) {
  if (!user || !user.token?.access_token) {
    throw new Error('Not authenticated');
  }
  let response = await doFetch(endpoint, user, opts);
  if (response.status === 401) {
    // netlifyIdentity.logout();
    await user.jwt(true);  // force token refresh
    response = await doFetch(endpoint, user, opts); // retry with the new token
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API fetch error: ' + errorText);
    const error = new Error(errorText);
    if (process.env.REACT_APP_SENTRY_DSN) {
      withScope(scope => {
        scope.setUser({ id: user?.email });
        captureException(error);
      });
    }
    throw error;
  }
  return await response.json();
}
