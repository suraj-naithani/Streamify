import { Link } from 'react-router-dom';
import './recommendation.css';
import { FaEye } from "react-icons/fa";

const Recommendation = ({ data }) => {
    return (
        data &&
        data.map((curData) => (
            <Link key={curData._id} to={`/video/${curData._id}`}>
                <div className='recommendation'>

                    <div className='thumbnailImg'>
                        <img src={curData.imgUrl} alt="" />
                    </div>
                    <div className='details'>
                        <p>{curData.title.length > 30
                            ? curData.title.substring(0, 30) + "..."
                            : curData.title
                        }</p>
                        <p className='viewDetails'>{curData.user.username}</p>
                        <div className='viewDetails views'>
                            <FaEye />
                            <p> {curData.views} views</p>
                        </div>
                    </div>
                </div>
            </Link>
        ))
    )
}

export default Recommendation