import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SignInUser, toggleClose } from '../redux/actions/actions';

const SignInWith = ({ modalMode, toggleClose, SignInUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) return;

        let postData = {
            name: email.split('@')[0],
            provider: 'local',
            email: email,
            provider_id: password,
            token: 'local_token_' + Date.now(),
            provider_pic: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        };
        SignInUser(postData);
        toggleClose();
    };

    if (!modalMode) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div onClick={toggleClose} style={{ position: 'absolute', width: '100%', height: '100%' }}></div>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', zIndex: 10, width: '100%', maxWidth: '400px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Вход в систему</h2>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{ padding: '12px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Пароль" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ padding: '12px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
                        required
                    />
                    <button 
                        type="submit" 
                        style={{ padding: '12px', backgroundColor: '#03a87c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    modalMode: state.common.modalMode
});

export default connect(mapStateToProps, { toggleClose, SignInUser })(SignInWith);