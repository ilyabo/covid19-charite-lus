import React from 'react';
import styled from '@emotion/styled';
import { ButtonLink } from './Button';


const Outer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  & > *+* { margin-top: 50px; }  
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
      Dear observers, thank you for taking part in this intra- and interobserver study using our tool.

      <p>
        Here some instructions regarding the tool:
        <ul>
          <li>There are a total of 100 different loops of LUS of COVID patients on ICU.</li>
          <li>Each loop will appear 4 times.</li>
          <li>The order of appearance will be random for each observer (which also means that by chance you might get the same loop twice one after another).</li>
          <li>The loops are labeled as R1-R6 (right thorax) and L1-L6 (left thorax) simulating that you are having the ultrasound probe in your hand (see picture below) and know where you are looking (even though it doesn't play an essential role for this analysis).</li>
          <li>Pathologies: either select “Keine” or check all the pathologies you see (you can check more than 1 pathology!).</li>
          <li>LUS Score: you must select one.</li>
          <li>After grading the loop and clicking submit you cannot go back.</li>
          <li>You can stop and leave the page at any time. When logging in again you will start where you left until you have graded the 400 loops.</li>
        </ul>
      </p>
    </section>

    <StartSection>
      <ButtonLink large to="/next-video">Beginnen</ButtonLink>
    </StartSection>
  </Outer>
};

export default Home;
