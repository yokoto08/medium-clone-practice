import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadArticles } from '../redux/actions/actions';

const Feed = ({ articles, loadArticles }) => {
    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '20px' }}>Лента статей</h2>
            {articles && articles.map(article => (
                <div key={article._id} style={{ borderBottom: '1px solid #eee', padding: '30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                        <Link to={`/article/${article._id}`} style={{ textDecoration: 'none', color: '#000' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 'bold' }}>{article.title}</h3>
                        </Link>
                        <p style={{ color: '#666', fontSize: '16px', marginBottom: '15px' }}>{article.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#999' }}>
                            <span style={{ marginRight: '15px' }}>{article.author?.name || 'Аноним'}</span>
                            <span>👏 {article.claps || 0}</span>
                        </div>
                    </div>
                    {article.feature_img && (
                        <div style={{ width: '150px', height: '150px', backgroundImage: `url(${article.feature_img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px', flexShrink: 0 }}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = state => ({
    articles: state.articles.articles
});

export default connect(mapStateToProps, { loadArticles })(Feed);