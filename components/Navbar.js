"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false); // for hydration safety
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => setMounted(true), []); // ensures client-only rendering

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (!mounted) return null; // prevent SSR/client mismatch

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-2 sm:px-8 bg-slate-800 text-white w-full space-y-2 sm:space-y-0">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/tree.png" alt="Logo" width={38} height={38} />
          <span className="text-base sm:text-lg font-bold whitespace-nowrap">Plant Me a Tree!</span>
        </div>
      </Link>

      <div className="relative flex items-center gap-4">
        {session ? (
          <>
            {/* Dropdown toggle */}
            <button onClick={() => setShowDropdown((prev) => !prev)}
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-1.5 inline-flex items-center">
              Welcome {session.user.email}
              <svg className="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {showDropdown && (
              <div ref={dropdownRef}
                className="absolute right-0 top-12 z-10 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setShowDropdown(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setShowDropdown(false)}>
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => { setShowDropdown(false); handleSignOut(); }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link href="/login">
            <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-1.5">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
