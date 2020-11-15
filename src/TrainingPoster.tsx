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

  embed {
    width: 600px;
    height: 800px;
  }  
`;


const TrainingPoster = () => {
  const url = 'https://storage.googleapis.com/covid19-lus-training/Poster%20Training.pdf'
  return (
    <Outer>
      <embed
        src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${url}`}
      />
    </Outer>
  )
}

export default TrainingPoster
