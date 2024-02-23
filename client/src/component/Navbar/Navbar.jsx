import { Link, useNavigate } from "react-router-dom";
import './navbar.css'
import { IoMdTrendingUp, IoMdSearch } from 'react-icons/io';
import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import { MdOutlineAddBox, MdLogout } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { TbLogin } from "react-icons/tb";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useAuth } from "../../context/auth";
import { useState } from "react";

const Navbar = () => {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [q, setQ] = useState("");
    const [isVisible, setVisibility] = useState(false);

    const toggleVisibility = () => {
        setVisibility(!isVisible);
    };


    const handleSearch = () => {
        navigate(`/search?q=${q}`);
    };

    const handleChange = (e) => {
        setQ(e.target.value);
        handleSearch();
    };
    return (
        <nav className="navContainer">
            <div className="logo">
                <Link to='/'>
                    <img src="/logo.png" alt="" />
                </Link>
                <h1 className="username">Streamify</h1>
            </div>
            <div className="search">
                <input type="text" placeholder="Search" value={q} className="searchField" onChange={handleChange} />
                <IoMdSearch className="icons searchIcon" onClick={handleSearch} />
            </div>
            <div className="social">
                <p className="username">
                    {
                        isLoggedIn ? user.username : "Hi, User"
                    }
                </p>
                <div className={`burgerSection ${isVisible ? '' : ' burgerSectionHidden'}`}>
                    <Link to="/" className='link' onClick={toggleVisibility}>
                        <GoHome className="icons" />
                        <p>Home</p>
                    </Link>
                    <Link to="/trending" className='link' onClick={toggleVisibility}>
                        <IoMdTrendingUp className="icons" />
                        <p>Trending</p>
                    </Link >
                    <Link to="/upload" className='link' onClick={toggleVisibility}>
                        <MdOutlineAddBox className="icons" />
                        <p>Upload</p>
                    </Link >
                    <Link to="/profile" className='link' onClick={toggleVisibility}>
                        <RxAvatar className="icons" />
                        <p>Profile</p>
                    </Link>
                    {
                        isLoggedIn ?
                            <Link to="/logout" className='link' onClick={toggleVisibility}>
                                <MdLogout className="icons" />
                                <p>Logout</p>
                            </Link>
                            :
                            <>
                                <Link to="/login" className='link' onClick={toggleVisibility}>
                                    <TbLogin className="icons" />
                                    <p>Login</p>
                                </Link>
                                <Link to="/register" className='link' onClick={toggleVisibility}>
                                    <HiOutlineUserAdd className="icons" />
                                    <p>Register</p>
                                </Link>
                            </>
                    }
                </div>
                {
                    isVisible ?
                        <IoClose onClick={toggleVisibility} className="icons burgerIcon" />
                        :
                        <RxHamburgerMenu onClick={toggleVisibility} className="icons burgerIcon" />
                }
            </div>
        </nav>
    )
}

export default Navbar