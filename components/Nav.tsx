'use client'
import Link from "next/link"
import Image from "next/image"
import { signIn,signOut, useSession, getProviders } from "next-auth/react"
import { useState, useEffect } from "react"

const Nav = () => {
    const isUserLoggedIn = false;

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setProviders();
    }, []);
  return (
    <nav className="w-full flex-between mb-16 pt-3">
        <Link href='/' className="flex gap-2 flex-center">
            <Image 
            src="/assets/images/logo.svg" 
            alt="Promptopia logo"
            width={30}
            height={30}
            className="object-contain"/>
            <p className="logo_text">Promptopia</p>
        </Link>

        <div className="sm:flex hidden">
            {isUserLoggedIn ? 
            (<div className="flex gap-3 md:gap-5">
                <Link className="black_btn" href='/create-prompt'>Create Post</Link>
                <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button>

                <Link href='/profile'>
                    <Image 
                    src="assets/images/logo.svg"
                    alt="user profile pic"
                    width={37}
                    height={37}
                    className="rounded-full"></Image>
                </Link>
            </div>) 
            :
            (<></>)}
        </div>
      
    </nav>
  )
}

export default Nav
