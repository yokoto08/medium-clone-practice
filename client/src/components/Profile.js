import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUserProfile, follow } from '../redux/actions/actions';

const Profile = ({ profile, getUserProfile, follow, currentUser }) => {
    const { id } = useParams();

    useEffect(() => {
        getUserProfile(id);
    }, [getUserProfile, id]);

    if (!profile) return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка профиля...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <img src={profile.user?.provider_pic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '30px' }} />
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{profile.user?.name}</h1>
                    {currentUser && currentUser._id !== profile.user?._id && (
                        <button onClick={() => follow(profile.user?._id, currentUser._id)} style={{ cursor: 'pointer', padding: '8px 16px', backgroundColor: '#03a87c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px' }}>
                            Подписаться
                        </button>
                    )}
                </div>
            </div>
            <div>
                <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Статьи автора</h2>
                {profile.articles && profile.articles.length > 0 ? profile.articles.map(article => (
                    <div key={article._id} style={{ borderBottom: '1px solid #eee', padding: '20px 0' }}>
                        <Link to={`/article/${article._id}`} style={{ textDecoration: 'none', color: '#000' }}>
                            <h3 style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 'bold' }}>{article.title}</h3>
                        </Link>
                        <p style={{ color: '#666', marginBottom: '10px' }}>{article.description}</p>
                    </div>
                )) : <p style={{ color: '#999' }}>У этого автора пока нет статей.</p>}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    profile: state.authUser.profile,
    currentUser: state.authUser.user
});

export default connect(mapStateToProps, { getUserProfile, follow })(Profile);