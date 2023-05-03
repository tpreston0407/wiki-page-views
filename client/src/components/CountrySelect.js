import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllCountries } from '../api/Countries';

const CountrySelect = ({ labelText, currentCountry, handleChange }) => {
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            const countries = await getAllCountries();
            setCountryList(countries);
        }

        if (countryList.length <= 0) {
            getCountries()
                .catch(console.error); // todo: display error message
        }

    }, [countryList]);

    return (
        <div className='container'>
            <label for='country-select'>{labelText}</label>
            <select id='country-select' className='country-select' value={currentCountry} onChange={handleChange}>
                <option key='empty' value=''></option>
                {
                    countryList.map((country) => {
                        return <option key={country.abbrev} value={country.abbrev}>{country.name}</option>
                    })
                }
            </select>
        </div>
    );
}

CountrySelect.propTypes = {
    labelText: PropTypes.string,
    currentCount: PropTypes.number,
    handleChange: PropTypes.func,
}


export default CountrySelect;