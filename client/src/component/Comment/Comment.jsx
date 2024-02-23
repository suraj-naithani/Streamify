/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../context/auth';

const Comment = ({ comments }) => {
    const [userData, setUserData] = useState([]);
    const { API } = useAuth();


    const getUser = async () => {
        const response = await fetch(`${API}/api/auth/users/${comments.userId}`, { method: 'GET' });
        const data = await response.json();
        if (response.ok) {
            setUserData(data);
        }
    }

    useEffect(() => {
        getUser();
    }, [comments.videoId])

    return (
        <div className='allComment'>
            <div className='comment-img-icon'>
                <img src={userData?.img ? userData?.img : "/avatar.png"} alt="" />
            </div>
            <div className='SubChannelName'>
                <div className='commentName'>
                    <p className='commentChannelName'>{userData.username}</p>
                    <p className='commentTime'>• {formatDistanceToNow(new Date(comments.createdAt), { addSuffix: true })}</p>
                </div>
                <p className='comment'>{comments.comment}</p>
            </div>
        </div>
    )
}

export default Comment