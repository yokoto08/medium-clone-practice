import React from 'react';
import { connect } from 'react-redux';
import { SignInUser, toggleClose } from '../redux/actions/actions';

const SignInWith = ({ modalMode, toggleClose, SignInUser }) => {
    const handleMockLogin = () => {
        let postData = {
            name: 'Alinur Sirazidinov',
            provider: 'local',
            email: 'alinur.dev@example.com',
            provider_id: 'dev_mock_id_123',
            token: 'dev_token_abc',
            provider_pic: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        };
        SignInUser(postData);
        toggleClose();
    };

    if (!modalMode) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div onClick={toggleClose} style={{ position: 'absolute', width: '100%', height: '100%' }}></div>
            <div style={{ backgroundColor: '#fff', padding: '50px', borderRadius: '8px', zIndex: 10, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <h2 style={{ marginBottom: '30px' }}>Вход в систему</h2>
                <button 
                    onClick={handleMockLogin}
                    style={{ padding: '12px 24px', backgroundColor: '#4285F4', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Войти как разработчик
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    modalMode: state.common.modalMode
});

export default connect(mapStateToProps, { toggleClose, SignInUser })(SignInWith);