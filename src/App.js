import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LobbyPage from './components/LobbyPage';
import CodeBlock from './components/CodeBlock';
import { SocketProvider } from './context/SocketContext'
import { MainProvider } from './context/MainContext'


const items = [
  { id: 0, title: "Async-Await example"},
  { id: 1, title: "For Loop"}
];

function App() {
  return (
    <MainProvider>
      <SocketProvider>
        <Router>
          <div className="App">
          <Routes>
            <Route exact path="/" element={<LobbyPage items={items}/>}/>
            <Route path="/code/:id" element={<CodeBlock items={items}/>}/>
          </Routes>
          </div>
        </Router>
      </SocketProvider>
    </MainProvider>
  );
}

export default App;
