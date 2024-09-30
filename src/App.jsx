// import UserProfileCard from "./components/UserProfileCard.jsx";
// import UseAuth from "./components/useAuth.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Start from './pages/Start.jsx';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import Home from "./pages/Home";


function App() {
  return (
      <div>
          <Router>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/home" element={<Home />} />
            </Routes>
         </Router>
      </div>
  );
}

export default App;
