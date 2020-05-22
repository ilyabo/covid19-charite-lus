import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useAsyncRetry } from 'react-use';
import fetchApi from './fetchApi';
import Spinner from './Spinner';
import { ErrorBox } from './errors';
import { useIdentityContext } from 'react-netlify-identity';

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

const QuestionnaireCheck: React.FC<{}> = (props) => {
  const {user} = useIdentityContext();
  const checkFetch = useAsyncRetry(async () => {
    return await fetchApi('questionnaire-check', user, {
      method: 'POST'
    });
  }, []);
  useEffect(() => {
    if (!checkFetch.loading && checkFetch.value) {
      const { hasSubmitted } = checkFetch.value;
      if (hasSubmitted) {
        document.location.href = '/next-video';
      }
    }
  }, [checkFetch.loading, checkFetch.value]);

  return (
    <>
      {!checkFetch.loading && checkFetch.value && !checkFetch.value.hasSubmitted
        ? props.children
        :
        <Outer>
          {checkFetch.loading && <Spinner/>}
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
