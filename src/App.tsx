import React from 'react';
import { IdentityContextProvider, useIdentityContext, } from 'react-netlify-identity';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import NextVideo from './NextVideo';
import { APP_URL } from './index';
import styled from '@emotion/styled';
import Login from './Login';
import Questionnaire from './Questionnaire';
import QuestionnaireCheck from './QuestionnaireCheck';
import ErrorBoundary from './ErrorBoundary';

interface Props {
  component: React.FunctionComponent;
  exact?: boolean;
  path: string;
}

const Outer = styled.div`
  // padding: 20px;
`;

const PublicRoute: React.FunctionComponent<Props> = (props: Props) => {
  const { isLoggedIn } = useIdentityContext();
  return isLoggedIn ? <Redirect to="/home" /> : <Route {...props} />;
};

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const { isLoggedIn } = useIdentityContext();
  return isLoggedIn ? <Route {...props} /> : <Redirect to="/welcome" />;
};

const LogoutBoxLayout = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  & > a { font-size: small; }
  & > *+* { margin-left: 20px; }
`;

const LogoutBox = () => {
  const { isLoggedIn } = useIdentityContext();
  return isLoggedIn
    ? <LogoutBoxLayout>
         <a
           href="mailto:frederic.muench@charite.de?subject=LUS study"
           rel="noopener noreferrer"
           target="_blank"
         >Questions?</a>
        <Login />
      </LogoutBoxLayout>
    : null;
};

function App() {
  return (
    <Outer>
      <IdentityContextProvider url={APP_URL}>
        <ErrorBoundary>
          <BrowserRouter>
            <Switch>
              <PublicRoute exact path="/" component={Welcome} />
              <PublicRoute path="/welcome" component={Welcome} />
              {/*<PublicRoute path="/createaccount" component={CreateAccount} />*/}
              {/*<PublicRoute path="/login" component={LogIn} />*/}
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/questionnaire" component={() => <QuestionnaireCheck><Questionnaire/></QuestionnaireCheck>} />
              <PrivateRoute path="/next-video" component={NextVideo} />
            </Switch>
          </BrowserRouter>
          <LogoutBox/>
        </ErrorBoundary>
      </IdentityContextProvider>
    </Outer>
  );
}

export default App;
