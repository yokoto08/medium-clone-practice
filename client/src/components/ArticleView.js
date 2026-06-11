 import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getArticle, clap, follow, deleteArticle, commentArticle } from '../redux/actions/actions';

const ArticleView = ({ article, getArticle, clap, follow, deleteArticle, commentArticle, user }) => {
    const { id } = useParams();
    const [comment, setComment] = useState('');

    useEffect(() => {
        getArticle(id);
    }, [getArticle, id]);

    const handleComment = () => {
        if (comment.trim() !== '' && user._id) {
            commentArticle(article._id, user._id, comment);
        }
    };

    if (!article || !article.title) return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка статьи...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>{article.title}</h1>
            <h3 style={{ color: '#666', marginBottom: '20px' }}>{article.description}</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={article.author?.provider_pic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="author" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} />
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{article.author?.name || 'Аноним'}</div>
                        {user && user._id !== article.author?._id && (
                            <button onClick={() => follow(article.author?._id, user._id)} style={{ cursor: 'pointer', color: '#03a87c', border: '1px solid #03a87c', borderRadius: '4px', padding: '2px 8px', background: 'none', fontSize: '12px', marginTop: '5px' }}>Подписаться</button>
                        )}
                    </div>
                </div>
                {user && user._id === article.author?._id && (
                    <button onClick={() => deleteArticle(article._id)} style={{ cursor: 'pointer', padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                        Удалить статью
                    </button>
                )}
            </div>

            {article.feature_img && (
                <img src={article.feature_img} alt="cover" style={{ width: '100%', marginBottom: '30px', borderRadius: '8px', objectFit: 'cover' }} />
            )}

            <div style={{ fontSize: '20px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: article.text }}></div>

            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button onClick={() => clap(article._id)} style={{ cursor: 'pointer', background: 'none', border: '1px solid #ccc', borderRadius: '50%', width: '60px', height: '60px', fontSize: '24px', transition: '0.2s' }}>
                    👏 {article.claps || 0}
                </button>
            </div>

            <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '2px solid #000' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Обсуждение</h3>
                
                {user && user._id && (
                    <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Написать комментарий..."
                            style={{ width: '100%', height: '100px', padding: '15px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '10px', fontSize: '16px', resize: 'vertical' }}
                        />
                        <button onClick={handleComment} style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#03a87c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}>
                            Отправить
                        </button>
                    </div>
                )}

                <div>
                    {article.comments && article.comments.length > 0 ? (
                        article.comments.map((c, index) => (
                            <div key={index} style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <img src={c.author?.provider_pic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                                    <span style={{ fontWeight: 'bold' }}>{c.author?.name || 'Пользователь'}</span>
                                </div>
                                <p style={{ fontSize: '16px', margin: 0, lineHeight: '1.5' }}>{c.text}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#666' }}>Пока нет комментариев. Будьте первым!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    article: state.articles.article,
    user: state.authUser.user
});

export default connect(mapStateToProps, { getArticle, clap, follow, deleteArticle, commentArticle })(ArticleView);