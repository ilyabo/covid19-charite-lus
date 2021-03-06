import React, { useEffect } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import netlifyIdentity from 'netlify-identity-widget';
import Button from './Button';


const Login: React.FC<{ large?: boolean }> = ({ large }) => {
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
      large={large}
      onClick={handleIdentity}>
      {isLoggedIn ? 'Log out' : 'Log in'}
    </Button>
  )
};

export default Login;
