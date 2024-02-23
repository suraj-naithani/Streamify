import { useEffect, useState } from 'react';
import Card from '../../component/Card/Card';
import './home.css';
import Loader from '../../component/Loader/Loader'
import { useAuth } from '../../context/auth';

const Home = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { API } = useAuth();

    const getAllVideos = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/video/allVideos`, { method: 'GET' });
            const data = await response.json();
            setData(data);

            if (response.ok) {
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllVideos();
    }, []);

    return (
        <div className="home">
            <div className="cards">
                {
                    isLoading ? <Loader /> :
                        <Card data={data} />
                }
            </div>
        </div>
    )
}

export default Home