import React from 'react';
import Routes from './routes';

if (__DEV__) {
  require('react-devtools-core').connectToDevTools({port: 8888});
}

export default function App() {
  return <Routes />;
}
