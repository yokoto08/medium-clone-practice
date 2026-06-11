import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleOpen } from '../redux/actions/actions';

const Header = ({ isAuth, user, toggleOpen }) => {
    const handleLogout = () => {
        localStorage.removeItem('Auth');
        window.location.reload();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
            <div>
                <Link to="/" style={{ textDecoration: 'none', color: '#000', fontSize: '24px', fontWeight: 'bold' }}>Medium Clone</Link>
            </div>
            <div>
                {!isAuth ? (
                    <button onClick={toggleOpen} style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#03a87c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px' }}>Sign In</button>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/editor" style={{ marginRight: '20px', color: '#03a87c', textDecoration: 'none', fontSize: '16px', border: '1px solid #03a87c', padding: '5px 10px', borderRadius: '4px' }}>Написать статью</Link>
                        <Link to={`/profile/${user._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000', marginRight: '20px' }}>
                            <span style={{ marginRight: '15px', fontWeight: 'bold' }}>{user.name}</span>
                            <img src={user.provider_pic} alt="avatar" style={{ width: '40px', borderRadius: '50%' }} />
                        </Link>
                        <button onClick={handleLogout} style={{ cursor: 'pointer', padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>Выйти</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuth: state.authUser.isAuth,
    user: state.authUser.user
});

export default connect(mapStateToProps, { toggleOpen })(Header);