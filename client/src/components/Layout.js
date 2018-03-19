import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../containers/Header';

export default props => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};
