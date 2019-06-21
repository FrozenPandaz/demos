import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import './app.scss';

const App = () => {
  return (
    <div>
      <h1>Welcome to Nx!</h1>
    </div>
  );
};

export default withAuthenticator(App, true);
