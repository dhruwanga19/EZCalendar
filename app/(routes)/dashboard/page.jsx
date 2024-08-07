"use client"
import { Button } from '@/components/ui/button';
import { app } from '@/config/FirebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { LogoutLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import MeetingType from './meeting-type/page';

function Dashboard() {
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();
  
  // const [loading, setLoading] = useState(true)

  
    const db = getFirestore(app)

    const router = useRouter();

    useEffect(() => {
        user&&isBusinessRegistered()
    
    }
    , [user])

    const isBusinessRegistered = async() => {
        const docRef = doc(db, 'businesses', user.email);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            // setLoading(false)
        } else {
            console.log("No such document!");
            // setLoading(false)
            router.replace('/create-business')
            
        }
    }

    if (isLoading) return <h2 className='flex items-center justify-center'>Loading...</h2>


  return isAuthenticated? (
    <div>
        {/* Dashboard <LogoutLink>Logout</LogoutLink> */}
        <MeetingType/>
    </div>
  ):(
    <div className='flex flex-col text-xl items-center justify-center '>
        You have to <LoginLink className='text-blue-500'> Log in </LoginLink> to see this page.
    </div>
  )
}

export default Dashboard