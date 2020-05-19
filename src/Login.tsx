import React, { useEffect } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import netlifyIdentity from 'netlify-identity-widget';
import Button from './Button';


const Login: React.FC = (props) => {
  const { isLoggedIn } = useIdentityContext();
  useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on('login', () => {
      document.location.href = '/home';
    });
    netlifyIdentity.on('logout', () => {
      document.location.href = '/welcome';
    });
  }, []);
  const handleIdentity = (e: any) => {
    e.preventDefault();
    netlifyIdentity.open();
  };
  return (
    <Button
      large={!isLoggedIn}
      onClick={handleIdentity}>
      {isLoggedIn ? 'Abmelden' : 'Anmelden'}
    </Button>
  )
};

export default Login;
