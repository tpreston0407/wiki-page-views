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
        return data?.items[0]?.articles;
      })
      .catch(error => {
        console.error(error);
        return error;
      });
}