'use client'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/')
        }
    }, [isSignedIn, isLoaded, router])

    if (!isLoaded) {
        return (
            <div className='flex items-center justify-center min-h-[100dvh] w-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
             <span className='text-2xl font-bold'>Loading...</span>
            </div>
        )
    }

    if (!isSignedIn) {
        return null
    }

    return <>{children}</>
}