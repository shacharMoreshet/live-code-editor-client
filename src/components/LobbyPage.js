import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../LobbyPage.css';
import { SocketContext } from '../context/SocketContext';
import { MainContext } from '../context/MainContext';

function LobbyPage({ items }) {
    const socket = useContext(SocketContext)
    const {setActiveUser} = useContext(MainContext)
    
    const handleClick = (id) => {
        socket.emit('login', {codeBlockId: id}, newUser => {
          setActiveUser(newUser)
        })
    }

    return (
        <div>
            <h1>Choose code block</h1>
            <ul className="list-group">
            {items.map(item => (
                <li className="list-group-item" key={item.id}>
                  <Link className="list-group-item list-group-item-action" onClick={() => handleClick(item.id)} to={`/code/${item.id}`}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
        </div>
    );
}

export default LobbyPage;