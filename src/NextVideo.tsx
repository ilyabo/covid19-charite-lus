import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAsyncFn, useAsyncRetry } from 'react-use';
import { useIdentityContext } from 'react-netlify-identity';
import GradingForm, { GradingFormValues } from './GradingForm';
import Login from './Login';
import fetchApi from './fetchApi';
import Spinner from './Spinner';
import { errorColor } from './colors';
import { ErrorBox } from './errors';


type NextVideoResponse =
  | {
    status: 'NEXT'
    name: string;
    url: string;
    numTotal: number;
    numDone: number;
  }
  | {
    status: 'ALL_DONE'
  }


const Outer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  @media(min-width: 800px) {
    height: 100%;
    flex-direction: row;
    & > *+* { margin-left: 40px; }
  }
  @media(max-width: 800px) {
    padding: 60px 0px 20px 0px;
    box-sizing: border-box;
    flex-direction: column;
    & > *+* { margin-top: 10px; }
  } 
`;


const LoadingOuter = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  & > *+* { margin-top: 20px; }
`;

const Progress = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: small;
`;

const AllDoneOuter = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  & > *+* { margin-top: 20px; }
`;

const VideoOuter = styled.div`
  flex-grow: 1;
  max-width: 910px;
  position: relative;
`;


const DemoVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const SmallError = styled.div`
  color: ${errorColor};
  max-width: 300px;
  margin-top: 20px;
`;


const ThoraxLabel = styled(({ fileName, ...props }) => {
  const m = /^(\d+)_(.+)\.mp4$/.exec(fileName);
  if (!m) return null;
  return (
    <div {...props}>{m[2]}</div>
  );
})`
  position: absolute;
  top: 50px;
  left: 20px;
  font-size: 25px;
  font-weight: bold;
`;

const NextVideo: React.FC<{}> = (props) => {

  const { user } = useIdentityContext();
  const nextVideoFetch = useAsyncRetry(async () => {
    return await fetchApi('video-next', user) as NextVideoResponse;
  }, [user]);

  const [submitState, submitFetch] = useAsyncFn(async (values: GradingFormValues) => {
    if (nextVideoFetch?.value?.status === 'NEXT') {
      return await fetchApi('video-submit', user, {
        method: 'POST',
        body: JSON.stringify({
          values,
          video: nextVideoFetch.value.name,
        }),
      });
    }
  }, [nextVideoFetch.value]);


  const handleSubmit = (formValues: GradingFormValues, videoName: string) => {
    submitFetch(formValues);
  };

  useEffect(() => {
    if (!submitState.loading && submitState?.value?.status === 'ok') {
      nextVideoFetch.retry();
    }
  }, [submitState, nextVideoFetch])

  const { loading, error, value } = nextVideoFetch;

  return (
    <Outer>
      {loading
        ? <LoadingOuter>
            <div>Das nächste Video wird geladen…</div>
            <Spinner/>
          </LoadingOuter>
        : error
          ? <ErrorBox
            text="Das Video konnte leider nicht geladen werden…"
            retry={() => nextVideoFetch.retry()}
          />
          : value?.status === 'ALL_DONE'
            ? <AllDoneOuter>
              <div>
                Das war's!
                Sie haben schon alle Videos angeschaut.
              </div>
              <div>
                Vielen Dank für Ihre Zeit!
              </div>
              <Login large={true} />
            </AllDoneOuter>
            : value?.status === 'NEXT'
              ? <>
                {value.numDone != null &&
                <Progress>
                  {value.numDone + 1} von {value.numTotal}
                </Progress>}
                <VideoOuter>
                  <DemoVideo preload="auto" autoPlay={true} controls loop>
                    <source src={value.url} />
                  </DemoVideo>
                  <ThoraxLabel
                    fileName={value.name}
                  />
                </VideoOuter>
                <div>
                  <GradingForm
                    isLoading={submitState.loading}
                    onSubmit={formValues => handleSubmit(formValues, value.name)}
                  />
                  {!submitState.loading && submitState.error &&
                  <SmallError>Oops… Etwas ist schief gelaufen. Versuchen Sie es bitte nochmals.</SmallError>
                  }
                </div>
              </>
              : <ErrorBox
                text="Oops… Etwas stimmt nicht…"
                retry={() => nextVideoFetch.retry()}
              />
      }

    </Outer>
  )
};

export default NextVideo;
