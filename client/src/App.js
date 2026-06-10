import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import Header from './components/Header';
import SignInWith from './components/SignInWith';
import Editor from './components/Editor';
import ArticleView from './components/ArticleView';

function App() {
    return (
        <div>
            <Header />
            <SignInWith />
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/article/:id" element={<ArticleView />} />
            </Routes>
        </div>
    );
}

export default App;