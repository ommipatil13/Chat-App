import './App.css';
import { Routes, Route } from 'react-router-dom';
import Join from "./component/join/join";
import Chat from "./component/chat/chat";



function App() {




  return (
    
    <div className="App">
      <Routes>

        <Route path="/"     element={<Join />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>



    </div>
  );

}


export default App;

