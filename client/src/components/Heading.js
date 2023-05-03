import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ title }) => {
    return (
        <div className='container heading d-flex align-items-center'>
            <span className='fw-bold d-flex align-items-center'>{title}</span>
        </div>
    )
}

Heading.propTypes = {
    title: PropTypes.string,
}

export default Heading;
