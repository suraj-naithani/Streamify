import { useEffect, useState } from 'react';
import './upload.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import app from '../../../firebase'
import { useAuth } from '../../context/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Upload = () => {
    const [input, setInputs] = useState({});
    const [image, setImage] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);

    const { user, authorizationToken, isLoggedIn, API } = useAuth();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev,
                user: {
                    userID: user._id,
                    username: user.username,
                },
                [e.target.name]: e.target.value
            }
        })
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        // console.log("Upload is paused");
                        break;
                    case "running":
                        // console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );
    };


    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        image && uploadFile(image, "imgUrl");
    }, [image]);

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API}/api/video/uploadVideo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": authorizationToken
                },
                body: JSON.stringify(input)
            })

            const data = await res.json();

            if (res.ok) {
                toast.success("Upload successful")
            } else {
                toast.error("Upload Failed")
            }
            res.status === 200 && navigate(`/video/${data._id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        isLoggedIn ?
            <div className="uploadContainer" >
                <div className='formContainer'>
                    <form className='form' onSubmit={handleUpload}>
                        <h1>Upload a New Video</h1>
                        <div className='inputs'>
                            <input type="text" name="title" onChange={handleChange} placeholder='Title' className='input' autoComplete='off' required />
                            <textarea type="text" name="description" onChange={handleChange} placeholder="Description" className='input' autoComplete='off' required></textarea>
                            <div className='inputField'>
                                <label className='label'>Image:</label>
                                {
                                    imgPerc > 0 ? (
                                        "Uploading:" + imgPerc + "%"
                                    ) : (
                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" id="imageInput" className='fileInput' required />
                                    )
                                }
                            </div>
                            <div className='inputField'>
                                <label className='label'>Video:</label>
                                {
                                    videoPerc > 0 ? (
                                        "Uploading:" + videoPerc + "%"
                                    ) : (
                                        <input type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/*" id="videoInput" className='fileInput' required />
                                    )
                                }
                            </div>
                        </div>
                        <button className='button'>Upload</button>
                    </form>
                </div>
            </div>
            : <Navigate to="/login" />
    )
}

export default Upload