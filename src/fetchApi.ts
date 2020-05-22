import { API_ROOT } from './index';
import netlifyIdentity from 'netlify-identity-widget';

export default async function fetchApi(endpoint: string, user: any, opts?: any) {
  if (!user || !user.token?.access_token) {
    throw new Error('Not authenticated');
  }
  const response = await fetch(
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
  if (!response.ok) {
    if (response.status === 401) {
      // Workaround for refreshing the auth token:
      // document.location.reload();
      // netlifyIdentity.open();
      // @ts-ignore
      netlifyIdentity.refresh();
      // netlifyIdentity.logout();
    }
    // TODO: enforce log out if the response is 401 "Unauthorized")
    const errorText = await response.text();
    console.error('API fetch error: ' + errorText);
    throw new Error(errorText);
  }
  return await response.json();
}
