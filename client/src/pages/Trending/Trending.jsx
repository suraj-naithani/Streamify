import { useEffect, useState } from 'react'
import Card from '../../component/Card/Card'
import { useAuth } from '../../context/auth';

const Trending = () => {
    const { API } = useAuth();
    const [trending, setTrending] = useState([]);

    const getTrendVideo = async () => {
        try {
            const response = await fetch(`${API}/api/video/trend`, { method: 'GET' });
            const data = await response.json();
            setTrending(data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getTrendVideo();
    }, []);
    return (
        <div className="home">
            <div className="cards">
                <Card data={trending} />
            </div>
        </div>
    )
}

export default Trending