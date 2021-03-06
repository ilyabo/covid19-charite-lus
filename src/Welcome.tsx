import React from 'react';
import styled from '@emotion/styled';
import Login from './Login';
import logoImg from './images/logo.svg';

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
        Interobserver and intraobserver variability in point-of-care lung ultrasound of intensive care patients with confirmed Covid-19
      </Title>
      <Login large={true} />
      <Subtitle>
        Studienverantwortliche für Fragen:
        <div>
          <div><a href="mailto:frederic.muench@charite.de">Frederic Münch</a> 614644</div>
          <div><a href="mailto:markus.lerchbaumer@charite.de">Markus Lerchbaumer</a> 657084</div>
        </div>
      </Subtitle>
      <Logo src={logoImg}/>
    </Outer>
  )
};

export default Welcome;
