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
    <div className='flex bg-[#91ABFF] justify-between items-center'>
      <div className='flex items-center gap-4'>
        <h1 className='px-4 py-0 text-[64px] font-[600]'>
          ACADIVERSE
        </h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-4 font-bold">
              <NavigationMenuLink onClick={() => {navigate('/')}} className='text-xl'>Home</NavigationMenuLink>
              <NavigationMenuLink onClick={() => {navigate('/about-us')}} className='text-xl'>About Us</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex items-center gap-4 p-4'>
        <Input type='text' placeholder='Search' />
        <AvatarIcon width='56' height='56' onClick={handleAvatarClick}/>
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