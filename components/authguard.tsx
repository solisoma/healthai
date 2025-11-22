import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {

    const { isSignedIn } = useUser()

    useEffect(() => {
        if (!isSignedIn) {
            redirect('/')
        }
    }, [isSignedIn])

    return children
}