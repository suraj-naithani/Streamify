import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import Trending from './pages/Trending/Trending';
import Upload from './pages/Upload/Upload';
import Profile from './pages/Profile/Profile';
import Video from './pages/Video/Video';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import SignOut from './pages/SignOut/SignOut';
import Search from './component/Search/Search';

function App() {
  return (
    <div className='mainContainer'>
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={< Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<SignOut />} />
            <Route path="/video">
              <Route path=":id" element={<Video />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
