import React, { FC } from 'react'
import styled from '@emotion/styled';
import Button, { ButtonA, ButtonLink } from './Button';


const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;

  embed {
    height: 80%;
    width: 80%;
    min-height: 800px;
  }  
  flex-direction: column;
  &> *+*{ margin-top: 20px; }
`;

export const POSTER_URL = 'https://storage.googleapis.com/covid19-lus-training/Poster%20Training.pdf'

const TrainingPoster: FC<{ group: string }> = ({ group }) => {
  return (
    <Outer>
      <div>
        <ButtonA
          href={POSTER_URL}
          target="_blank"
        >
          Poster im neuen Fenster aufzumachen
        </ButtonA>
      </div>
      <embed
        // src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${url}`}
        src={POSTER_URL}
      />
      {group === '2'
        ? <ButtonLink large to="/training/webinar">Weiter zum Webinar &gt;&gt;</ButtonLink>
        : <ButtonLink large to="/intro">Weiter &gt;&gt;</ButtonLink>
      }
    </Outer>
  )
}

export default TrainingPoster
