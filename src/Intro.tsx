import React, { FC } from 'react';
import styled from '@emotion/styled';
import Button, { ButtonLink } from './Button';
import throaxLabelingImg from './images/thorax-labeling.png';

const Outer = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  & > *+* { margin-top: 50px; }  
  & > section {
    max-width: 900px;
  }
  & ul > li {
    margin-top: 10px;
  }
`;

const ButtonsSection = styled.div`
  display: flex;
  justify-content: center;
`;

const BackButtonsSection = styled(ButtonsSection)`
  & > *+* { margin-left: 10px; }
  align-items: center;
`;

const Img = styled.img`
  display: block;
  margin: 20px auto 30px auto;
`;


const Intro: FC<{ group: string }> = ({ group }) => {

  return <Outer>
    <BackButtonsSection>
      <ButtonLink to="/training/poster">&lt;&lt; Zurück zum Poster</ButtonLink>
      {group === '2' &&
      <ButtonLink to="/training/webinar">&lt;&lt; Zurück zum Webinar</ButtonLink>}
    </BackButtonsSection>
    <section>

      Hier einige Infos zum Tool bevor es losgeht/weitergeht:
      <ul>
        <li>Es sind insgesamt 100 verschiedene Loops (=Videoclips) von 10s von Patienten mit Covid-19 auf ITS.</li>
        <li>Jeder Loop läuft mindestens 1x10s ab; ab dann kannst du deine Antwort geben und submitten.</li>
        {/*<li>Nach 90 Sekunden ohne Handlung wirst du automatisch ausgeloggt.</li>*/}
        <li>Die Loops sind gekennzeichnet mit R1-R6 oder L1-L6 (wie auf dem Bild angegeben).
          <Img width={300} height={192} src={throaxLabelingImg}/>
        </li>
        <li>Bei „Pathologien“: entweder „Keine“ ankreuzen ODER alle die man sieht (man kann mehr als 1 Pathologie angeben!).</li>
        <li>Bei „LUS Score“: du kannst nur einen Score ankreuzen.</li>
        {/*<li>Nachdem du „Submit“ geklickt hast kannst du jeweils immer nur zum letzten Loop zurück und ändern (2 zurück geht nicht).</li>*/}
        <li>Du kannst Dich jeder Zeit ausloggen und machst genau dort weiter wo du aufgehört hast!</li>
      </ul>

    </section>

    <ButtonsSection>
      <ButtonLink large to="/next-video">Los geht's</ButtonLink>
    </ButtonsSection>
  </Outer>
};

export default Intro;
