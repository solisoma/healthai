'use client'

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl">🏥</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                HealthAI
                </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
                <SignedOut>
                    <SignInButton mode='modal'>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition cursor-pointer">
                            Sign In
                        </button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer transition">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

            <div className="md:hidden flex items-center space-x-4">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-600 dark:text-gray-300 p-2"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="md:hidden mt-6 py-6">
                <div className="flex flex-col space-y-4">
                    <SignedOut>
                        <div className="flex flex-col space-y-3 pt-4">
                            <SignInButton mode='modal'>
                                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition cursor-pointer text-left py-2">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode='modal'>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium py-3 px-6 cursor-pointer transition w-full">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                </div>
            </div>
        )}
    </nav>
  )
}