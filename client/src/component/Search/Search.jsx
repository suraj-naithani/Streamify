import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import { useAuth } from '../../context/auth';

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    const { API } = useAuth();

    const getSearchVideos = async () => {
        const response = await fetch(`${API}/api/video/search${query}`);
        const data = await response.json();
        setVideos(data);
    }

    useEffect(() => {
        getSearchVideos();
    }, [query]);

    return (
        videos && videos.length ?
            <div className="home">
                <div className="cards">
                    <Card data={videos} />
                </div>
            </div>
            : <div className="noResult">
                <h1>No result found</h1>
            </div>
    )
}

export default Search