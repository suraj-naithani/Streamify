import './profile.css'
import { useAuth } from '../../context/auth';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Loader from '../../component/Loader/Loader';
import { MdDeleteOutline } from "react-icons/md";
import { RxAvatar } from 'react-icons/rx';

const Profile = () => {
    const { user, authorizationToken, isLoggedIn, API } = useAuth();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const allMyVideos = async () => {
        try {
            setIsLoading(true);
            if (user && user._id) {
                const userId = user._id;
                const videos = await fetch(`${API}/api/video/allMyVideos/${userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: authorizationToken,
                    },
                });

                const data = await videos.json();
                setData(data);
                if (videos.ok) {
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API}/api/video/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const res_data = await response.json();
            setData(res_data);
            if (response.ok) {
                allMyVideos();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allMyVideos();
    }, [user]);

    return (
        isLoggedIn ?
            <div className='profileContainer'>
                {
                    isLoading ? <Loader /> :
                        <>
                            <div className='profile'>
                                <div className='profileImage'>
                                    <img src={user.img ? user.img : "/avatar.png"} alt="" />
                                </div>
                                <div className='profileDetails'>
                                    <h1>{user.username}</h1>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <hr className='line' />
                            <div className="home">
                                <div className="cards">
                                    {
                                        data &&
                                        [...data].reverse().map((curData) => {
                                            return (
                                                <div key={curData._id} className='profileCard'>
                                                    <div className='updateIcons'>
                                                        <MdDeleteOutline className='icons' onClick={() => handleDelete(curData._id)} />
                                                    </div>
                                                    <Link to={`/video/${curData._id}`}>
                                                        <div className='card'>
                                                            <div className='thumbnail'>
                                                                <img src={curData.imgUrl} alt="" />
                                                            </div>
                                                            <div className='description'>
                                                                <p className='title'>{curData.title.length > 50
                                                                    ? curData.title.substring(0, 50) + "..."
                                                                    : curData.title
                                                                }</p>
                                                                <div className='channel'>
                                                                    <div className='img-icon'>
                                                                        <RxAvatar className="icons" />
                                                                    </div>
                                                                    <p className='channelName'>{curData.user.username}</p>
                                                                </div>
                                                            </div>
                                                        </div >
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
            : <Navigate to="/login" />
    )
}

export default Profile