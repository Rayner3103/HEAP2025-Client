import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';

export default function Header() {
  return (
    <div className='flex bg-[#a9b5df] justify-between items-center'>
      <div className='flex items-center gap-4'>
        <h1 className='px-4 py-0 text-5xl font-extrabold'>
          ACADIVERSE
        </h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-4 font-bold">
              <NavigationMenuLink href='/home' className='text-xl'>Home</NavigationMenuLink>
              <NavigationMenuLink href='/about-us' className='text-xl'>About Us</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex items-center gap-4 p-4'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input type='text' placeholder='Search' />
      </div>
    </div>
  )
}