/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Comment from "../Comment/Comment"
import { IoSend } from "react-icons/io5";
import { useAuth } from "../../context/auth";
import { useNavigate } from 'react-router-dom';

const AllComments = ({ videoId }) => {
    const { authorizationToken, isLoggedIn, API } = useAuth();
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();

    const handleInput = (e) => {
        setNewComment(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate("/login");
        }
        try {
            const uploadComments = await fetch(`${API}/api/comment/addComment/${videoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationToken
                },
                body: JSON.stringify({ comment: newComment })
            });
            // eslint-disable-next-line no-unused-vars
            const data = await uploadComments.json();
            allComments();
            setNewComment('');
        } catch (error) {
            console.log(error);
        }
    }

    const allComments = async () => {
        try {
            const allComment = await fetch(`${API}/api/comment/getComment/${videoId}`, { method: 'GET' });
            const data = await allComment.json();
            setComments(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allComments();
    }, []);

    return (
        <div className='comments'>
            <div className='commentBox'>
                <p className='totalComments'>Comments</p>
                <div className='commentInputs'>
                    <input type="text" className='commentInput' name="comment" value={newComment} onChange={handleInput} autoComplete='off' placeholder='Enter your comment here' required />
                    <IoSend className='icon' onClick={handleSubmit} />
                </div>
            </div>
            {
                comments && comments.length ?
                    comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((curData) => (
                            <Comment key={curData._id} comments={curData} />
                        ))
                    : <p>No comments</p>
            }
        </div>
    )
}

export default AllComments