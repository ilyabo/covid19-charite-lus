import React from 'react';
import styled from '@emotion/styled';
import Login from './Login';
import logoImg from './logo.svg';

const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  & > *+* { margin-top: 40px; }
`;

const Title = styled.h1`
  display: flex;
  text-align: center;
  max-width: 600px;
`;

const Subtitle = styled.div`
  text-align: center;
  line-height: 1.5em;
`;

const Logo = styled.img`
  width: 200px;
`;


const Welcome = () => {
  return (
    <Outer>
      <Title>
        Prospective analysis of inter-observer and intra-observer variability
        in standardized lung ultrasound of patients with confirmed diagnosis of SARS-CoV 2
      </Title>
      <Login />
      <Subtitle>
        Studienverantwortliche für Fragen:
        <div>
        Frederic Münch 614644,
        Markus Lerchbaumer 657084
        </div>
      </Subtitle>
      <Logo src={logoImg}/>
    </Outer>
  )
};

export default Welcome;
