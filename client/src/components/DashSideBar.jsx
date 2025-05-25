import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HiArrowSmRight, HiOutlineUserGroup } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';

export default function DashSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate(`/`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-full md:w-56 border-r border-[#333333]">
      <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto bg-[#1a1a1a]">
        <div className="flex flex-col gap-1 p-4">
          <Link to='/dashboard?tab=profile'>
            <div className={`transform active:scale-95 active:translate-y-1 hover:-translate-y-0.5 transition-all duration-150 px-4 py-3 rounded-lg bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_6px_0_rgb(0,0,0)] border border-[#333333] hover:border-[#ffa726] ${tab === 'profile' ? 'border-[#ffa726]' : ''}`}>
              <span className="text-[#e6e6e6] hover:text-[#ffa726] transition-colors duration-300">
                Profile
                <span className="ml-2 text-sm text-[#707070]">
                  {currentUser ? (currentUser.isAdmin ? '(Admin)' : '(User)') : '(User)'}
                </span>
              </span>
            </div>
          </Link>

          {currentUser?.isAdmin && (
            <Link to='/dashboard?tab=users'>
              <div className={`transform active:scale-95 active:translate-y-1 hover:-translate-y-0.5 transition-all duration-150 px-4 py-3 rounded-lg bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_6px_0_rgb(0,0,0)] border border-[#333333] hover:border-[#ffa726] ${tab === 'users' ? 'border-[#ffa726]' : ''}`}>
              <span className="flex items-center text-[#e6e6e6] hover:text-[#ffa726] transition-colors duration-300">
                <HiOutlineUserGroup className="mr-2" />
                Users
              </span>
            </div>
          </Link>
          )}

          <div 
            onClick={handleSignout}
            className="transform active:scale-95 active:translate-y-1 hover:-translate-y-0.5 transition-all duration-150 px-4 py-3 rounded-lg bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_6px_0_rgb(0,0,0)] border border-[#333333] hover:border-red-600 cursor-pointer"
          >
            <span className="flex items-center text-[#e6e6e6] hover:text-red-500 transition-colors duration-300">
              <HiArrowSmRight className="mr-2" />
              Sign Out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
