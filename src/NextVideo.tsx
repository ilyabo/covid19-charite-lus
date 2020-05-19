import React from 'react';
import styled from '@emotion/styled';
import { API_ROOT } from './index';
import { useAsyncRetry } from 'react-use';
import { useIdentityContext } from 'react-netlify-identity';
import GradingForm from './GradingForm';
import Button from './Button';


interface VideoEntry {
  id: string;
  url: string;
}


const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  & > *+* { margin-left: 40px; }
`;



const VideoOuter = styled.div`
  max-width: 800px;
`;


const DemoVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const ErrorOuter = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  & > *+* { margin-top: 20px; }
`;



const NextVideo = () => {
  const { user } = useIdentityContext();

  const nextVideoFetch = useAsyncRetry(async () => {
    const response = await fetch(
      `${API_ROOT}/get-next-video`,
      {
        headers: new Headers({
           Accept: 'application/json',
           'Content-Type': 'application/json',
           Authorization: 'Bearer ' + user?.token.access_token,
        })
      }
    );
    if (!response.ok) {
      // TODO: enforce log out if the response is 401 "Unauthorized")
      console.error(nextVideoFetch.error);
      throw new Error(await response.text());
    }
    return (await response.json()) as VideoEntry;
  }, []);



  return (
    <Outer>
        {nextVideoFetch.loading
          ? `Das nächste Video wird geladen…`
          : nextVideoFetch.error
          ? <ErrorOuter>
              <div>Das Video konnte leider nicht geladen werden…</div>
              <div>
                <Button onClick={() => nextVideoFetch.retry()}>
                  Nochmals versuchen
                </Button>
              </div>
            </ErrorOuter>
          :
          <>
            <VideoOuter>
            <DemoVideo preload="auto" autoPlay={true} controls loop>
              <source src={nextVideoFetch.value?.url} />
            </DemoVideo>
            </VideoOuter>
            <GradingForm/>
          </>
       }

    </Outer>
  )
};

export default NextVideo;
