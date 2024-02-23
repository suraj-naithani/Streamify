import './card.css';
import { RxAvatar } from 'react-icons/rx';
import { Link } from 'react-router-dom'

const Card = ({ data }) => {
    return (
        data &&
        data.map((curData) => {
            return (
                <Link key={curData._id} to={`/video/${curData._id}`} className='cardLink'>
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
            )
        })
    )
}

export default Card