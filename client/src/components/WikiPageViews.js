import React, { useState, useEffect } from 'react';
import Heading from './Heading';
import { getArticlesByPageViewsForDate } from '../api/WikiAPI';
import DateSelect from './DateSelect';
import TableCountSelect from './TableCountSelect';

import ArticleView from './ArticleView';
import { getYesterday } from '../utilities';
import { TableCountOptions } from '../constants';

const WikiPageViews = () => {
    const [currentDate, setCurrentDate] = useState(getYesterday());
    const [articles, setArticles] = useState([]);
    const [tableCount, setTableCount] = useState(100);

    const handleDateChange = (newDate) => {
        setCurrentDate(newDate);
    };

    const handleTableCountChange = (event) => {
        setTableCount(Number(event.target.value));
    };

    useEffect(() => {
        const getArticles = async ( currentDate ) => {
            const day = ("0" + currentDate.getDate()).slice(-2);
            const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
            const year = currentDate.getFullYear();

            let articles = await getArticlesByPageViewsForDate(day, month, year);
            if (articles && articles.length) {
                // We only need to store up to the maximum number of results allowed to display in state
                const maxArticles = Math.max(...TableCountOptions);
                const newArticles = articles.slice(0, maxArticles);
                setArticles(newArticles);
            }
        }

        getArticles(currentDate)
            .catch(console.error); // todo: display error message

    }, [currentDate]);

    const renderArticles = () => {
        if (articles.length === undefined || articles.length <= 0) {
            return <p>Could not find Wikipedia articles for the given date.</p>
        } else {
            let articleViews = []
            const totalArticles = articles.length < tableCount ? articles.length : tableCount;
            console.log(`rendering ${totalArticles} articles`);
            for (let i = 0; i < totalArticles; i++){
                articleViews.push(
                    <li className='p-2'><ArticleView key={i} title={articles[i].article} viewCount={articles[i].views} /></li>
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
                            <TableCountSelect labelText={"Number of Results"} currentCount={tableCount} handleChange={handleTableCountChange} />
                        </div>
                    </div>

                    <div className='row'>
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