import React from 'react';
import PropTypes from 'prop-types';


const ArticleView = ({ title, viewCount }) => {
    return (
        <div className='container article-view'>
            <div className='d-flex justify-content-center align-items-center article-content'>
                <div className='align-self-center article-title text-truncate'>
                    <strong>{title}</strong>
                </div>
                <div className='align-self-center article-count'>
                    Views: <br />{viewCount}
                </div>
            </div>
        </div>
    );
}

ArticleView.propTypes = {
    title: PropTypes.string,
    viewCount: PropTypes.number,
}


export default ArticleView;