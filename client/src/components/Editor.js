import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditorJS from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

const Editor = ({ user }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const editorRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const editor = new EditorJS(editorRef.current, {
            toolbar: {
                buttons: ['bold', 'italic', 'quote', 'anchor', 'h2', 'h3']
            },
            placeholder: {
                text: 'Напишите вашу историю...'
            }
        });
        editor.subscribe('editableInput', (e, editable) => {
            setText(editable.innerHTML);
        });
        return () => editor.destroy();
    }, []);

    const publishStory = () => {
        if (!title || !text || !user._id) return;

        const formdata = new FormData();
        formdata.append('text', text);
        formdata.append('image', image);
        formdata.append('title', title);
        formdata.append('author_id', user._id);
        formdata.append('description', description);
        formdata.append('claps', 0);

        const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5001/api/";

        axios.post(`${url}article`, formdata).then((res) => {
            navigate('/');
        }).catch((err) => console.log(err));
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <input 
                type="text" 
                placeholder="Заголовок" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                style={{ width: '100%', fontSize: '32px', border: 'none', borderBottom: '1px solid #ccc', marginBottom: '20px', outline: 'none', padding: '10px 0' }}
            />
            <input 
                type="text" 
                placeholder="Краткое описание" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                style={{ width: '100%', fontSize: '18px', border: 'none', borderBottom: '1px solid #eee', marginBottom: '20px', outline: 'none', padding: '10px 0' }}
            />
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px', color: '#666', fontWeight: 'bold' }}>Обложка статьи:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div 
                ref={editorRef} 
                style={{ minHeight: '300px', fontSize: '20px', outline: 'none', marginTop: '20px' }}
            ></div>
            <button 
                onClick={publishStory} 
                style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#03a87c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}
            >
                Опубликовать
            </button>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.authUser.user
});

export default connect(mapStateToProps)(Editor);