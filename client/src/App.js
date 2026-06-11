import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Feed from './components/Feed';
import Header from './components/Header';
import SignInWith from './components/SignInWith';
import Editor from './components/Editor';
import ArticleView from './components/ArticleView';
import Profile from './components/Profile';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = localStorage.getItem('Auth');
        if (auth) {
            const user = JSON.parse(auth);
            dispatch({ type: 'SET_USER', user });
        }
    }, [dispatch]);

    return (
        <div>
            <Header />
            <SignInWith />
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/article/:id" element={<ArticleView />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;