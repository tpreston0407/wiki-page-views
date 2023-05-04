

export const getAllCountries = async () => {
    const url = `https://restcountries.com/v3.1/all?fields=name,cca2`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        return error;
      });
}

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