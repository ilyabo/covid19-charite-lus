import React from 'react';
import styled from '@emotion/styled';
import { ButtonLink } from './Button';


const Outer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  & > *+* { margin-top: 50px; }
`;

const StartSection = styled.div`
  display: flex;
  justify-content: center;
`;


const Home = () => {

  return <Outer>
    <section>
      <p>
        Study name:
        Prospective analysis of inter-observer and intra-observer variability in standardized lung ultrasound of patients
        with confirmed diagnosis of SARS-CoV 2.
      </p>

      <p>
        Context & Purpose:
        Lung ultrasound (LUS) is known for 15-20 years especially in point-of-care (POC) application in intensive care
        units and emergency room. Recently in context of the SARS-CoV-2 pandemic it has received even more attention.
        Advantages include reducing ionizing radiation (vs CT), less transport of critically ill patients (better for
        patient as transport always is a risk and in terms of contamination also better for stuff in radiology and people
        crossing while transporting), done by treating physician (direct feedback), and other. Also, ARDS/viral pneumonia
        in COVID-19 seems to affect mostly peripheral lung areas, which can easily be displayed on LUS. Also in terms of
        pandemics more stuff that didn’t use such techniques before will be new users. (many sources online).
      </p>

      <p>
        As such, it is important to know how reproducible such diagnostic and progress examinations are. We attempt to let
        experienced (lung) ultrasound users (observers=readers=users) analyze loops of COVID-19 lung ultrasound images to
        assess inter- and intra-observer variability.
      </p>
    </section>

    <StartSection>
      <ButtonLink large to="/next-video">Beginnen</ButtonLink>
    </StartSection>
  </Outer>
};

export default Home;
