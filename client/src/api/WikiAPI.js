/**
 * Async function that gets a list of articles from Wikipedia with the most page views for a specific date.
 * The list is ordered by rank and 1000 articles are returned by default.
 *
 * @param {String} day -    day component of view date. Must be two characters long (i.e. 05)
 * @param {String} month -  month component of view date. Must be two characters long (i.e. 02)
 * @param {String} year -   year component of view date. Must be four characters long (i.e. 2023)
 *
 */
export const getArticlesByPageViewsForDate = async ( day, month, year ) => {
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data || !data.items) {
            throw new Error('No data returned from Wikipedia for the given date.');
        }
        return data?.items[0]?.articles;
      });
}

/**
 * Async function that gets a list of articles from Wikipedia with the most page views for a country on a specific date.
 * The list is ordered by rank and 1000 articles are returned by default.
 *
 * @param {String} countryAbbrev -  two character country abbreviation
 * @param {String} day -            day component of view date. Must be two characters long (i.e. 05)
 * @param {String} month -          month component of view date. Must be two characters long (i.e. 02)
 * @param {String} year -           year component of view date. Must be four characters long (i.e. 2023)
 *
 */
export const getArticlesByPageViewsForCountryAndDate = async ( countryAbbrev, day, month, year ) => {
    const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${countryAbbrev}/all-access/${year}/${month}/${day}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data || !data.items) {
            throw new Error('No data returned from Wikipedia for the given country and date.');
        }
        return data?.items[0]?.articles;
      });
}