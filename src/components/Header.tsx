import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Input } from './ui/input';
import { AvatarIcon } from "@radix-ui/react-icons";
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const {token, userEmail} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (token === '') {
      return navigate('login');
    }
    navigate('profile')
  }

  return (
    <div className='flex justify-between items-center bg-[#91ABFF] w-screen'>
      <div className='flex items-center gap-4'>
        <h1 className='px-4 py-0 text-[64px] font-[600]'>
          ACADIVERSE
        </h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-4 font-bold">
              <NavigationMenuLink onClick={() => {navigate('/')}} className='text-xl hover:scale-110 transition-transform duration-200 focus:outline-none cursor-pointer'>Home</NavigationMenuLink>
              <NavigationMenuLink onClick={() => {navigate('/about-us')}} className='text-xl hover:scale-110 transition-transform duration-200 focus:outline-none cursor-pointer'>About Us</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex items-center gap-4 mr-4'>
        <Input type='text' placeholder='Search' />
        <AvatarIcon width='56' height='56' className="hover:scale-110 transition-transform duration-200 focus:outline-none cursor-pointer" onClick={handleAvatarClick}/>
        {
          userEmail.length > 1 && (
            <span>
              Logged in as <em>{userEmail}</em>
            </span>
          )
        }
      </div>
    </div>
  )
}