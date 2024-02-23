import './video.css';
import AllComments from '../../component/AllComments/AllComments';
import Recommendation from '../../component/Recommendation/Recommendation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate, useParams } from "react-router-dom"
import { formatDistanceToNow } from 'date-fns';
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import Loader from '../../component/Loader/Loader';

const Video = () => {
    const [singleVideo, setSingleVideo] = useState([]);
    const [randomVideo, setRandomVideo] = useState([]);
    const [subscribe, setSubscribe] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { authorizationToken, isLoggedIn, user, API } = useAuth();
    const params = useParams();

    const navigate = useNavigate();

    const videoRef = useRef(null);

    const getSingleVideo = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/video/singleVideo/${params.id}`, {
                method: 'GET'
            })

            const video = await response.json();
            setSingleVideo(video);

            if (response.ok) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const totalSubs = async (id) => {
        try {
            const response = await fetch(`${API}/api/auth/users/${id}`, { method: 'GET' })
            if (response.ok) {
                const data = await response.json();
                setSubscribe(data.subscribedUsers);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const toggleSubs = async () => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        try {

            const endPoint = subscribe.includes(user._id) ? 'unsubs' : 'subs';
            const sub = await fetch(`${API}/api/video/${endPoint}/${singleVideo.user.userID}`, {
                method: 'PUT',
                headers: {
                    Authorization: authorizationToken
                }
            })
            const subs = await sub.json();

            if (sub.ok) {
                // setSubscribe(subs);
                totalSubs(singleVideo.user.userID);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getRandomVideo = async () => {
        try {
            const response = await fetch(`${API}/api/video/random`, { method: 'GET' });
            const data = await response.json();
            setRandomVideo(data);
            setSingleVideo(data);
        } catch (error) {
            console.log(error);
        }
    }

    const increaseView = async () => {
        try {
            const response = await fetch(`${API}/api/video/views/${params.id}`, { method: 'PUT' });
            // eslint-disable-next-line no-unused-vars
            const data = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    const handleLike = async () => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        try {
            const response = await fetch(`${API}/api/video/like/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authorizationToken
                }
            });
            // eslint-disable-next-line no-unused-vars
            const data = await response.json();
            setIsLiked(!isLiked);
            if (isDisliked) {
                setIsDisliked(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDislike = async () => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        try {
            const response = await fetch(`${API}/api/video/dislike/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authorizationToken
                }
            });
            // eslint-disable-next-line no-unused-vars
            const data = await response.json();
            setIsDisliked(!isDisliked);
            if (isLiked) {
                setIsLiked(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (singleVideo.user && singleVideo.user.userID) {
            totalSubs(singleVideo.user.userID);
        }
    }, [singleVideo.user]);


    useEffect(() => {
        getSingleVideo();
    }, []);

    useEffect(() => {
        getRandomVideo();
        getSingleVideo();
    }, [params.id]);

    return (
        isLoading ? <Loader /> :
            <div className="video">
                {singleVideo && singleVideo.user && (
                    <div className='videoContainer'>
                        <div className='player'>
                            <video width="320" height="190" controls ref={videoRef} onPlay={increaseView}>
                                <source src={singleVideo.videoUrl} type="video/webm" />
                                <source src={singleVideo.videoUrl} type="video/mp4" />
                            </video>
                            <div className='descriptionTag'>
                                <div className='descriptionTagContainer'>
                                    <p className='descTitle'>{singleVideo.title}</p>

                                </div>
                                <div className='channelDetails'>
                                    <div className='channelName'>
                                        <div className='desc-img-icon'>
                                            <img src="/avatar.png" alt="" />
                                        </div>
                                        <div className='SubChannelName'>
                                            <p className='descChannelName'>{singleVideo.user.username}</p>
                                            <p className='subCount'>{subscribe.length} Subscriber</p>
                                        </div>

                                        <button className='subButton' onClick={toggleSubs}>
                                            {subscribe.includes(user._id) ? 'Subscribed' : 'Subscribe'}
                                        </button>
                                    </div>
                                    <div className="icons">
                                        <div className='likeContainer' onClick={handleLike}>
                                            <BiSolidLike />
                                            <p className='likeCount'>{isLiked ? singleVideo.likes.length + 1 : singleVideo.likes.length}</p>
                                        </div>
                                        <div className='likeContainer' onClick={handleDislike}>
                                            <BiSolidDislike />
                                            <p className='likeCount'>{isDisliked ? singleVideo.dislikes.length + 1 : singleVideo.dislikes.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='descriptionContainer'>
                                    <div className='descriptionViews'>
                                        <p className='descriptionText'>{singleVideo.views} views</p>
                                        <p className='descriptionText'>{formatDistanceToNow(new Date(singleVideo.createdAt), { addSuffix: true })}</p>
                                    </div>
                                    <p className='descriptionText'>{singleVideo.description}</p>
                                </div>
                            </div>
                            <AllComments videoId={singleVideo._id} />
                        </div>
                    </div>
                )
                }
                <div className='recommendationContainer'>
                    {
                        singleVideo && !isLoading ?
                            <>
                                <p> You may like</p>
                                <Recommendation data={randomVideo} />
                            </>
                            : null
                    }
                </div>
            </div >
    )
}

export default Video