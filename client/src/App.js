import './styles.css';
import Container from 'react-bootstrap/Container';
import React from 'react';
import WikiPageViews from './components/WikiPageViews';

const App = () => {
    return (
      <Container>
        <WikiPageViews />
      </Container>
    )
};

export default App;
