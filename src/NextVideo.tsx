import React from 'react';
import styled from '@emotion/styled';
import { API_ROOT } from './index';
import { useAsyncRetry } from 'react-use';
import { useIdentityContext } from 'react-netlify-identity';
import GradingForm from './GradingForm';
import Button from './Button';
import Login from './Login';


type NextVideoResponse =
  | {
    status: 'NEXT'
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
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  & > *+* { margin-left: 40px; }
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


const ErrorBox: React.FC<{ text: string, retry: () => void }> = ({ text, retry }) =>
  <ErrorOuter>
    <div>{text}</div>
    <div>
      <Button onClick={retry}>
        Nochmals versuchen
      </Button>
    </div>
  </ErrorOuter>

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
    return (await response.json()) as NextVideoResponse;
  }, []);


  const { loading, error, value } = nextVideoFetch;

  return (
    <Outer>
        {loading
          ? `Das nächste Video wird geladen…`
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
                {value?.numDone != null &&
                <Progress>
                  {value.numDone + 1} von {value.numTotal}
                </Progress>}
                <VideoOuter>
                  <DemoVideo preload="auto" autoPlay={true} controls loop>
                    <source src={value?.url} />
                  </DemoVideo>
                </VideoOuter>
                <GradingForm/>
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
