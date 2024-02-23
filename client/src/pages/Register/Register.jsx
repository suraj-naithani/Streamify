import './register.css';
import { Link, useNavigate } from 'react-router-dom'
import { IoLogoGoogle } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { storeTokenInLS, API } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const data = await response.json();

            if (response.ok) {
                storeTokenInLS(data.token);
                setUser({
                    username: "",
                    email: "",
                    password: ""
                })
                toast.success("Registration successful")
                navigate('/');
            } else {
                toast.error("Registration failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            if (result.user) {
                const response = await fetch(`${API}/api/auth/google`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: result.user.displayName,
                        email: result.user.email,
                        img: result.user.photoURL,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    storeTokenInLS(data.token);
                    toast.success("Registration successful")
                    navigate('/');
                } else {
                    toast.error("Registration failed")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="registerContainer">
            <div className='registerForms'>
                <p className='heading'>Sign Up</p>
                <div className='registerForm'>
                    <form className='registerFormInput' onSubmit={handleSubmit}>
                        <input type="text" name='username' value={user.username} onChange={handleInput} placeholder='Username' autoComplete='off' className='input' required />
                        <input type="email" name='email' value={user.email} onChange={handleInput} placeholder='Email' autoComplete='off' className='input' required />
                        <div className='passwordFiled'>
                            <input type={showPassword ? "text" : "password"} name='password' value={user.password} onChange={handleInput} autoComplete='off' placeholder='Password' className='input password' required />
                            {showPassword ? (
                                <FaRegEyeSlash className='eyeIcon' onClick={togglePasswordVisibility} />
                            ) : (
                                <FaRegEye className='eyeIcon' onClick={togglePasswordVisibility} />
                            )}
                        </div>
                        <button className='button'>Register</button>
                    </form>
                    <p className='text'>Already have an account? <Link to='/login'>Sign in</Link></p>
                </div>
                <div className='orOption'>
                    <span />
                    <p>or</p>
                    <span />
                </div>
                <div>
                    <button onClick={signInWithGoogle} className='googleButtons'>
                        <div className='button googleButton'>
                            <IoLogoGoogle className='icon' />
                            <p>Register with google</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register