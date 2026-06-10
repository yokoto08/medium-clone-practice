import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getArticle, clap, follow } from '../redux/actions/actions';

const ArticleView = ({ article, getArticle, clap, follow, user }) => {
    const { id } = useParams();

    useEffect(() => {
        getArticle(id);
    }, [getArticle, id]);

    if (!article || !article.title) return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка статьи...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>{article.title}</h1>
            <h3 style={{ color: '#666', marginBottom: '20px' }}>{article.description}</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <img src={article.author?.provider_pic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="author" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} />
                <div>
                    <div style={{ fontWeight: 'bold' }}>{article.author?.name || 'Аноним'}</div>
                    <button onClick={() => follow(article.author?._id, user._id)} style={{ cursor: 'pointer', color: '#03a87c', border: '1px solid #03a87c', borderRadius: '4px', padding: '2px 8px', background: 'none', fontSize: '12px', marginTop: '5px' }}>Подписаться</button>
                </div>
            </div>

            {article.feature_img && (
                <img src={article.feature_img} alt="cover" style={{ width: '100%', marginBottom: '30px', borderRadius: '8px', objectFit: 'cover' }} />
            )}

            <div style={{ fontSize: '20px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: article.text }}></div>

            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                <button onClick={() => clap(article._id)} style={{ cursor: 'pointer', background: 'none', border: '1px solid #ccc', borderRadius: '50%', width: '60px', height: '60px', fontSize: '24px', transition: '0.2s' }}>
                    👏 {article.claps || 0}
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    article: state.articles.article,
    user: state.authUser.user
});

export default connect(mapStateToProps, { getArticle, clap, follow })(ArticleView);