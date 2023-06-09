import React, { useState, useEffect } from 'react';
import Heading from './Heading';
import { getArticlesByPageViewsForCountryAndDate, getArticlesByPageViewsForDate } from '../api/WikiAPI';
import DateSelect from './DateSelect';
import TableCountSelect from './TableCountSelect';
import CountrySelect from './CountrySelect';
import ArticleView from './ArticleView';
import { getYesterday } from '../utilities';
import { TableCountOptions } from '../constants';

const WikiPageViews = () => {
    const [currentDate, setCurrentDate] = useState(getYesterday());
    const [articles, setArticles] = useState([]);
    const [tableCount, setTableCount] = useState(100);
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');

    const handleDateChange = ( newDate ) => {
        setCurrentDate(newDate);
    };

    const handleTableCountChange = ( event ) => {
        setTableCount(Number(event.target.value));
    };

    const handleCountryNameChange = ( event ) => {
        setCountry(event.target.value);
    }

    useEffect(() => {
        // Load/re-load articles if date or selected country changes
        const getArticles = async ( currentDate, country ) => {
            // The wiki api needs day and month formatted w/ 2 digits
            const day = ("0" + currentDate.getDate()).slice(-2);
            const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
            const year = currentDate.getFullYear();

            try {
                let articles = country && country.length > 0 ?
                    await getArticlesByPageViewsForCountryAndDate(country, day, month, year)
                    : await getArticlesByPageViewsForDate(day, month, year);
                if (articles && articles.length) {
                    // We only need to store up to the maximum number of results allowed to display in state
                    const maxArticles = Math.max(...TableCountOptions);
                    const newArticles = articles.slice(0, maxArticles);
                    setArticles(newArticles);
                    setError('');
                }
            } catch (error) {
                // Set error state so we can display a message to the user
                console.error(error);
                setError(error);
                setArticles([]);
            }
        }

        getArticles(currentDate, country);
    }, [currentDate, country]);

    const renderArticles = () => {
        if (articles.length === undefined || articles.length <= 0) {
            return <p data-testid="no-articles">Could not find Wikipedia articles for the given date.</p>
        } else {
            let articleViews = []
            const totalArticles = articles.length < tableCount ? articles.length : tableCount;
            for (let i = 0; i < totalArticles; i++){
                articleViews.push(
                    <li
                        className='p-2'
                        data-testid={`article-item-${i}`}
                        key={`article-item-${i}`}
                    >
                            <ArticleView
                                key={i}
                                title={articles[i].article}
                                viewCount={articles[i].views || articles[i].views_ceil}
                            />
                    </li>
                );
            }
            return articleViews;
        }
    };

    return (
        <>
            <Heading title="Grow Take Home" />
            <div className='d-flex justify-content-center article-container'>
                <div className='d-block article-list'>
                    <div className='row p-2'>
                        <div className='col'>
                            <DateSelect labelText="Start date:" currentDate={currentDate} handleChange={handleDateChange} />
                        </div>
                        <div className='col'>
                            <TableCountSelect labelText="Number of Results" currentCount={tableCount} handleChange={handleTableCountChange} />
                        </div>
                        <div className='col'>
                            <CountrySelect labelText="Country" currentCountry={country} handleChange={handleCountryNameChange} />
                        </div>
                    </div>

                    <div className='row'>
                        {error &&
                            <p>An error occurred. Wikipedia may not have data for your selection, or the project you asked for is not loaded yet.</p>
                        }
                        <ul className='no-bullet'>
                            {renderArticles()}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WikiPageViews;
