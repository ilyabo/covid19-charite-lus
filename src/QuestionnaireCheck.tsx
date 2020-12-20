import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useAsyncRetry } from 'react-use';
import fetchApi from './fetchApi';
import Spinner from './Spinner';
import { ErrorBox } from './errors';
import { useIdentityContext } from 'react-netlify-identity';
import { useHistory } from 'react-router-dom';

const Outer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  & > *+* { margin-top: 40px; }
`;

export interface QuestionnaireCheckResult {
  hasSubmitted: boolean;
  group: string;
}

const QuestionnaireCheck: React.FC<
  {
    redirectIfSubmitted?: string;
    redirectIfNotSubmitted?: string;
    renderChildren: (result: QuestionnaireCheckResult) => React.ReactNode;
  }> = (props) => {
  const { redirectIfSubmitted, redirectIfNotSubmitted } = props;
  const {user} = useIdentityContext();
  const checkFetch = useAsyncRetry(async () => {
    return await fetchApi('questionnaire-check', user, {
      method: 'POST'
    });
  }, []);
  const history = useHistory();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!checkFetch.loading && checkFetch.value) {
      const { hasSubmitted } = checkFetch.value;
      if (hasSubmitted) {
        if (redirectIfSubmitted) {
          history.push(redirectIfSubmitted, checkFetch.value);
          setRedirecting(true);
        }
      } else {
        if (redirectIfNotSubmitted) {
          history.push(redirectIfNotSubmitted, checkFetch.value);
          setRedirecting(true);
        }
      }
    }
  }, [
    checkFetch.loading,
    checkFetch.value,
    history,
    redirectIfSubmitted,
    redirectIfNotSubmitted,
  ]);

  return (
    <>
      {!checkFetch.loading && checkFetch.value && !redirecting
        ? props.renderChildren(checkFetch.value)
        :
        <Outer>
          {(checkFetch.loading || redirecting) && <Spinner/>}
          {!checkFetch.loading && checkFetch.error &&
            <ErrorBox
              text="Oops, etwas ist schief gelaufen.…"
              retry={() => checkFetch.retry()}
            />
          }
        </Outer>
      }
    </>
  );
};

export default QuestionnaireCheck;
