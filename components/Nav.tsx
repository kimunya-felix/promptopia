'use client'
import Link from "next/link"
import Image from "next/image"
import { signIn,signOut, useSession, getProviders } from "next-auth/react"
import { useState, useEffect } from "react"

const Nav = () => {
    const isUserLoggedIn = true;

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

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
            (<>
                {providers && Object.values(providers).map(provider => (
                    <button key={provider.name} className="black_btn" onClick={() => signIn(provider.id)}>
                        Sign in
                    </button>
                ))}
            </>)
            }
        </div>
        <div className="flex sm:hidden relative">
            {isUserLoggedIn ? (
            <div className="flex">
                <Image 
                src="/assets/images/logo.svg" 
                alt="Promptopia logo"
                width={30}
                height={30}
                className="object-contain"
                onClick={()=> {setToggleDropdown(prev => !prev)}}/>

                {toggleDropdown && 
                (
                    <div className="dropdown">
                        <Link className="dropdown_link"
                        href='/profile'
                        onClick={()=>setToggleDropdown(false)}>
                            My Profile
                        </Link>

                        <Link className="dropdown_link"
                        href='/creat-prompt'
                        onClick={()=>setToggleDropdown(false)}>
                            Create Prompt
                        </Link>

                        <button className="mt-5 w-full black_btn"
                        type="button"
                        onClick={()=>{setToggleDropdown(false);
                        signOut()}}>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
            ) : (
            <>
                {providers && Object.values(providers).map(provider => (
                    <button key={provider.name} className="black_btn" onClick={() => signIn(provider.id)}>
                        Sign in
                    </button>
                )
            )}
            </>
        )}
        </div>
    </nav>
  )
}

export default Nav
