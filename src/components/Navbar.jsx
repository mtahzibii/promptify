"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  return (
    <nav className="w-full py-4 px-6 ">
      <div className="flex justify-between items-center">
        <Link className="flex justify-center items-center gap-2" href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="font-semibold text-lg -tracking-wide text-black">
            Promptify
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-5 md:gap-5 justify-center items-center">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  alt="profile"
                  width={35}
                  height={35}
                  className="ml-3 rounded-full"
                />
              </Link>
            </div>
          ) : (
            <div>
              {providers &&
                Object.values(providers).map((provider, index) => {
                  return (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className="black_btn">
                      Sign in
                    </button>
                  );
                })}
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex justify-center items-center relative ">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                alt="profile"
                width={35}
                height={35}
                className="ml-3 rounded-full"
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
              />
              {isMenuOpen && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setIsMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setIsMenuOpen(false)}>
                    Create Prompt
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="black_btn w-full mt-4 text-sm font-semibold">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {providers &&
                Object.values(providers).map((provider, index) => {
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className="black_btn">
                      Sign In
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
