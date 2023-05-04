import React from 'react';
import PropTypes from 'prop-types';
import { TableCountOptions } from '../constants';

const TableCountSelect = ({ labelText, currentCount, handleChange }) => {
    return (
        <div className='container'>
            <label htmlFor='table-count'>{labelText}</label>
            <select id='table-count' className='table-select' value={currentCount} onChange={handleChange}>
            {
                TableCountOptions.map((count) => {
                    return <option key={count}>{count}</option>
                })
            }
            </select>
        </div>
    );
}

TableCountSelect.propTypes = {
    labelText: PropTypes.string,
    currentCount: PropTypes.number,
    handleChange: PropTypes.func,
}


export default TableCountSelect;