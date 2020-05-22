import React from 'react';
import styled from '@emotion/styled';
import { ButtonLink } from './Button';
import throaxLabelingImg from './images/thorax-labeling.png';

const Outer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 80px;
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

const StartSection = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  display: block;
  margin: 20px auto 30px auto;
`;


const Home = () => {

  return <Outer>
    <section>
      Dear observers, thank you for taking part in this intra- and interobserver study using our tool.

      <p>
        Here are the instructions regarding the tool:
      </p>
      <ul>
        <li>There are a total of 100 different loops of LUS of COVID patients on ICU.</li>
        <li>Each loop will appear 4 times.</li>
        <li>The order of appearance will be random for each observer (which also means that by chance you might get the same loop twice one after another).</li>
        <li>
          The loops are labeled as R1-R6 (right thorax) and L1-L6 (left thorax) simulating that you are having the ultrasound probe in your hand
          (see picture below) and know where you are looking (even though it doesn't play an essential role for this analysis).
          <Img width={300} src={throaxLabelingImg}/>
        </li>
        <li>Pathologies: either select “Keine” or check all the pathologies you see (you can check more than 1 pathology!).</li>
        <li>LUS Score: you must select one.</li>
        <li>After grading the loop and clicking submit you cannot go back.</li>
        <li>You can stop and leave the page at any time. When logging in again you will start where you left until you have graded the 400 loops.</li>
      </ul>

    </section>

    <StartSection>
      <ButtonLink large to="/questionnaire">Start</ButtonLink>
    </StartSection>
  </Outer>
};

export default Home;
