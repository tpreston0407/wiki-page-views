
/**
 * Async function that gets a list of all of the country names and two character country codes.
 *
 */
export const getAllCountries = async () => {
    const url = `https://restcountries.com/v3.1/all?fields=name,cca2`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        return error;
      });
}

/**
 * Helper function that formats response from getAllCountries
 * to an array of country names and abbreviation codes
 */
export const getCountryListFromCountries = ( countries ) => {
    let countryList = [];
    countries.map(country => {
        return countryList.push({
            name: country.name.common,
            abbrev: country.cca2,
        });
    })

    return countryList;
}