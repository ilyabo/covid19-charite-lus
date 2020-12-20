import React from 'react';
import styled from '@emotion/styled';
import { ButtonLink } from './Button';

const Outer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  & > *+* { margin-top: 50px; }  
  & > section {
    max-width: 900px;
  }
  & ul > li {
    margin-top: 10px;
  }
`;

const StartSection = styled.div`
  display: flex;
  justify-content: center;
`;


const Home = () => {

  return <Outer>
    <section>
      <h2>Willkommen!</h2>
      <ul>
      <li>Beim ersten Anmelden gibt es einen kleinen Fragebogen.</li>
        <li>Es erfolgt auch einmalig die Gruppenzuordnung.</li>
          <li>Wir verwenden Englisch und Deutsch im Wechsel.</li>
        </ul>
    </section>

    <StartSection>
      <ButtonLink large to="/questionnaire">Weiter &gt;&gt;</ButtonLink>
    </StartSection>
  </Outer>
};

export default Home;
