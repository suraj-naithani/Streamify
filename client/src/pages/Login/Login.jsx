import { Link, useNavigate } from 'react-router-dom'
import { IoLogoGoogle } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [user, setUser] = useState({
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
            const response = await fetch(`${API}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                storeTokenInLS(data.token);
                setUser({
                    email: '',
                    password: '',
                })
                toast.success("Login successful")
                navigate('/');
            } else {
                toast.error("Login failed")
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
                    toast.success("Login successful")
                    navigate('/');
                } else {
                    toast.error("Login failed")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="registerContainer">
            <div className='registerForms'>
                <p className='heading'>Sign In</p>
                <div className='registerForm'>
                    <form className='registerFormInput' onSubmit={handleSubmit}>
                        <input type="email" name='email' value={user.email} onChange={handleInput} placeholder='Email' className='input' autoComplete='off' required />
                        <div className='passwordFiled'>
                            <input type={showPassword ? "text" : "password"} name='password' value={user.password} onChange={handleInput} placeholder='Password' autoComplete='off' className='input password' required />
                            {showPassword ? (
                                <FaRegEyeSlash className='eyeIcon' onClick={togglePasswordVisibility} />
                            ) : (
                                <FaRegEye className='eyeIcon' onClick={togglePasswordVisibility} />
                            )}
                        </div>
                        <button className='button'>Login</button>
                    </form>

                    <p className='text'>Don’t have an account? <Link to='/register'>Signup</Link></p>
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
                            <p>Login with google</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;