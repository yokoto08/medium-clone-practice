import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadArticles } from '../redux/actions/actions';

const Feed = ({ articles, loadArticles }) => {
    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    return (
        <div>
            <h2>Articles Feed</h2>
            {articles && articles.map(article => (
                <div key={article._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    articles: state.articles.articles
});

export default connect(mapStateToProps, { loadArticles })(Feed);