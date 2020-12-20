import React from 'react'
import styled from '@emotion/styled';
import { ButtonLink } from './Button';


const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;

  video {
    height: 80%;
    width: 80%;
  }  
    flex-direction: column;
  &> *+*{ margin-top: 20px; }
  
`;


const TrainingVideo = () => {
  const url = 'https://storage.googleapis.com/covid19-lus-training/Lehrvid%20COVID_final.mp4'
  return (
    <Outer>
      <video controls>
        <source
          src={url}
        />
      </video>
      <ButtonLink large to="/intro">Weiter &gt;&gt;</ButtonLink>
    </Outer>
  )
}

export default TrainingVideo
