import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Feed />} />
            </Routes>
        </div>
    );
}

export default App;