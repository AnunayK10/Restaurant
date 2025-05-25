import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dropdown, DropdownDivider, TextInput } from "flowbite-react";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../assets/res4.png";

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            // Get userId before clearing
            const userId = localStorage.getItem('userId');
    
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            
            if (!res.ok) {
                console.log(data.message);
            } else {
                // Clear cart data before clearing user data
                if (userId) {
                    localStorage.removeItem(`cart_${userId}`);
                }
                
                // Dispatch signout action and navigate
                dispatch(signoutSuccess());
                navigate(`/`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    return (
        <header className="bg-[#1a1a1a] shadow-lg relative border-b border-[#333333]">
            <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="logo" className="w-32 h-auto" />
                </Link>

                <ul className="flex items-center gap-8">
                    <Link to="/">
                        <li className="hidden sm:inline">
                            <button className="transform active:scale-95 active:translate-y-1 hover:-translate-y-0.5 transition-all duration-150 px-4 py-2 rounded-lg bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_6px_0_rgb(0,0,0)] border border-[#333333] hover:border-[#ffa726]">
                                <span className="text-[#e6e6e6] hover:text-[#ffa726] transition-colors duration-300 text-base font-medium">
                                    Home
                                </span>
                            </button>
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="hidden sm:inline">
                            <button className="transform active:scale-95 active:translate-y-1 hover:-translate-y-0.5 transition-all duration-150 px-4 py-2 rounded-lg bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_6px_0_rgb(0,0,0)] border border-[#333333] hover:border-[#ffa726]">
                                <span className="text-[#e6e6e6] hover:text-[#ffa726] transition-colors duration-300 text-base font-medium">
                                    About
                                </span>
                            </button>
                        </li>
                    </Link>
                    {!(currentUser?.role === "Manager" || currentUser?.isAdmin) && (
                        <Link to="/item">
                            <li className="hidden sm:inline">
                                <button className="transform active:scale-95 active:translate-y-1 hover:-translate-y-0.5 transition-all duration-150 px-4 py-2 rounded-lg bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_6px_0_rgb(0,0,0)] border border-[#333333] hover:border-[#ffa726]">
                                    <span className="text-[#e6e6e6] hover:text-[#ffa726] transition-colors duration-300 text-base font-medium">
                                        Item
                                    </span>
                                </button>
                            </li>
                        </Link>
                    )}
                </ul>

                <div className='flex gap-4'>
                    {currentUser ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt='user' img={currentUser.profilePicture} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block text-sm font-medium truncate'>
                                    {currentUser.email}
                                </span>
                            </Dropdown.Header>
                            <Link to={'/Dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <DropdownDivider />
                            <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/signin'>
                            <button className='px-6 py-2 text-white bg-[#ffa726] hover:bg-[#ff9800] rounded-full transition-colors duration-300 font-medium'>
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
