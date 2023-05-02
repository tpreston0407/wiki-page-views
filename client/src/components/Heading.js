import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/esm/Container';

const Heading = ({ title }) => {
    return (
        <Container className='heading d-flex align-items-center'>
            <span className='fw-bold d-flex align-items-center'>{title}</span>
        </Container>
    )
}

Heading.propTypes = {
    title: PropTypes.string,
}

export default Heading;
