import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext'
import { MainContext } from '../context/MainContext';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../CodeBlock.css';

function CodeBlock({items}) {
    const socket = useContext(SocketContext)
    const { activeUser } = useContext(MainContext)
    const { id } = useParams();
    const item = items.find(item => item.id.toString() === id);

    const [code, setCode] = useState('');

    const updateCode = (data) => {
        setCode(data.text)
    }

    useEffect(() => {
        socket.on('Response', (data) => updateCode(data));
      }, [socket]);

    const handleCodeChange = (e) => {
        const newCodeValue = e.target.value
        setCode(newCodeValue);
        socket.emit('code', {
            text: newCodeValue,
            codeBlockId: item.id,
        });
    };

    const getMentorCodeComponent = () => {
        if (code !== '') {
            return (<SyntaxHighlighter language="javascript" style={docco}>{code}</SyntaxHighlighter>)
        } else {
            return (<div class="alert alert-info" role="alert">Waiting for students to start writing code...</div>);
        }
    }

    if (!item) {
        return <div>Code not found!</div>;
    }

    return (
        <div>
            <h4>{item.title} for {activeUser.isMentor ? "Mentor" : "Student"}</h4>
            <div className='code'>
            {
                activeUser.isMentor ? 
                getMentorCodeComponent()
                : <textarea className='code' value={code} onChange={handleCodeChange} spellCheck="false"/>
            }
            </div>
        </div>
    );
}

export default CodeBlock;