'use client';

import { Button, Navbar, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark, light } from '@clerk/themes';

export default function Header() {
  const path = usePathname();
  const {theme, setTheme } = useTheme()

  return (
    <Navbar className='border-b-2'>
      {/* Logo Section */}
      <Link
        href='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          PROGRESS
        </span>
        Blog
      </Link>
      
      {/* Search Form - Hidden on small screens, shown on large screens */}
      <form className="hidden lg:flex items-center">
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='w-full lg:w-64' // Adjust width on larger screens if needed
        />
      </form>
      
      {/* Search Button - Shown only on small screens */}
      <div className="flex items-center md:order-2">
        <Button className='w-10 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
        
        {/* Theme Toggle Button */}
        <Button
          className='w-10 h-10 mx-1' // Consistent size and spacing
          color='gray'
          pill
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <FaSun/> : <FaMoon/>}
        </Button>

        {/* Authentication Buttons/User Menu */}
        <SignedOut>
          <Link href='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline className='hidden md:inline-flex'>Sign In</Button>
          </Link>   
        </SignedOut>
        
        <SignedIn>
          <UserButton appearance={{baseTheme: theme === 'light' ? light : dark}}/>
        </SignedIn>
        
        {/* Mobile Menu Toggle */}
        <Navbar.Toggle className="ml-2 md:hidden" /> {/* Add margin on the left for spacing */}
      </div>
      
      {/* Mobile Menu Content */}
      <Navbar.Collapse>
        <Link href='/'>
          <Navbar.Link active={path === '/'} as={'div'}>
            Home
          </Navbar.Link>
        </Link>
        <Link href='/about'>
          <Navbar.Link active={path === '/about'} as={'div'}>
            About
          </Navbar.Link>
        </Link>
        <Link href='/projects'>
          <Navbar.Link active={path === '/projects'} as={'div'}>
            Projects
          </Navbar.Link>
        </Link>
        {/* Add more links as needed */}
      </Navbar.Collapse>
    </Navbar>
  );
}