import Image from 'next/image'
import logo from '../../../public/images/navbar-icon.svg'
import './NavBar.css'
import SearchBar from './searchbar-component/SearchBar'
import SigninButton from '../botonSignin/signinButton'
import Link from 'next/link'
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import TestEmailButton from '@/components/TestEmailButton';



async function NavBar() {
    const session = await getServerSession(authOptions);
    //para q no vaya al login sin el navbar
    // const isUserPostPage = typeof window !== 'undefined' && window.location.pathname === '/';
    return <nav className='navbar-container'>
         <Image src={logo} alt='Recipify - logo' className='navbar-logo'/>
        <SearchBar/>
        <Link href='/protected/dashboard'>Dashboard</Link>

        {/*Ojo por que estoy para cambiar el login*/}
        {session && session.user?.email ? (
                <>
                    <Link href='/auth/signout'>Sign out</Link>
                    <p>
                        <b>Signed in as {session.user?.email}</b>
                    </p>
                </>
            ) : (
                <>
                    <Link href='/auth/signin'>Sign in</Link>
                    <Link href='/auth/signup'>Sign up</Link>
                </>
            )}

            {/* <TestEmailButton /> */}
        {/* <SigninButton /> */}
    </nav>
}

export default NavBar