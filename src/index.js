import React from 'react';
import Routes from './routes';

if (__DEV__) {
  console.log('ENTROU EM DEV');
  require('react-devtools-core').connectToDevTools({port: 8081});
}

export default function App() {
  return <Routes />;
}
