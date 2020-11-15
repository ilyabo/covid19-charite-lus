import React from 'react'
import styled from '@emotion/styled';


const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;

  video {
    width: 800px;
    height: 450px;
  }  
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
    </Outer>
  )
}

export default TrainingVideo
