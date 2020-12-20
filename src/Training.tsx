import React, { FC } from 'react'
import styled from '@emotion/styled';
import { ButtonLink } from './Button';


const Outer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  & > *+* { margin-top: 40px; }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  padding: 50px;
  line-height: 1.3;
  & > ul > *+* {
    margin-top: 1em;        
  }
`;


const Training: FC<{ group: string }> = ({ group }) => {

  return (
    <Outer>
      {
        group === '2'
          ? <Content>
            <h2>Du bist in der Gruppe „Poster + Webinar-Learning“.</h2>

            <p>Das bedeutet:
            </p>
            <ul>
              <li>Nach dieser Einführung wirst du ein Poster (PDF) mit Informationen zu Lungenultraschall und charakteristischen Zeichen erhalten UND du siehst Dir ein Webinar (20min) von uns zu Lungenultraschall an (du kannst es Dir so oft ansehen wie du willst).</li>
              <li>Das Poster enthält minimale Theorie und einige Beispiele.</li>
              <li>Du kannst das Poster als PDF runterladen oder einfach im Browser öffnen.</li>
              <li>Im Tool während du die Studie durchgehst wird das Poster immer für Dich einzusehen sein, sodass du immer nachschauen kannst.</li>
            </ul>

          </Content>
          : <Content>
            <h2>Du bist in der Gruppe „Poster-Learning“.</h2>

            <p>Das bedeutet:</p>
            <ul>
              <li>Nach dieser Einführung wirst du ein Poster (PDF) mit Informationen zu Lungenultraschall und charakteristischen Zeichen erhalten.
              </li>
              <li>Das Poster enthält minimale Theorie und einige Beispiele.
              </li>
              <li>Du kannst das Poster als PDF runterladen oder einfach im Browser öffnen.
              </li>
              <li>Im Tool während du die Studie durchgehst wird das Poster immer für Dich einzusehen sein, sodass du immer nachschauen kannst.</li>
            </ul>
          </Content>

      }
      <ButtonLink large to="/training/poster">Weiter &gt;&gt;</ButtonLink>
    </Outer>
  )
}


export default Training;
