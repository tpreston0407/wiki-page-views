import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getYesterday } from '../utilities';

const DateSelect = ({ labelText, currentDate, handleChange }) => {
    return (
        <div className='container'>
            <label for='view-date'>{labelText}</label>
            <DatePicker
                id='view-date'
                className='date-select'
                selected={currentDate}
                onChange={handleChange}
                maxDate={getYesterday()}
            />
        </div>
    );
}

DateSelect.propTypes = {
    labelText: PropTypes.string,
    currentDate: PropTypes.instanceOf(Date),
    handleChange: PropTypes.func,
}


export default DateSelect;