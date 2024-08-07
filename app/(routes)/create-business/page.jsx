"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CreateBusiness() {

    const [businesName, setBusinessName] = useState();
    const db = getFirestore(app);
    const { user, isLoading } = useKindeBrowserClient();
    const router = useRouter();
    
    const onCreateBusiness = async() => {
        console.log(businesName)
        await setDoc(doc(db, 'businesses', user.email), { 
            businessName: businesName.replace(" ", "_"),
            email: user.email,
            userName:user.given_name+' '+user.family_name}).then(resp=>{
                console.log('Document written successfully!');
                toast('Business created successfully!');
                router.replace('/dashboard');
            })
    }

    if (isLoading) return <h2 className='flex items-center justify-center'>Loading...</h2>

  return user ? (
    <div className='p-14 items-center flex flex-col gap-20 my-10'>
        <Image src='/logo.svg' width={200} height={200} alt='logo'/>
        <div className='flex flex-col items-center gap-4 max-w-3xl'>
            <h2 className='text-4xl font-bold'>What should we call your business?</h2>
            <p className='text-slate-600'>You can always change this later in the settings</p>
            <div className='w-full'>
                <label className='text-slate-400'>Team Name</label>
                <Input placeholder='Enter your team name' className='mt-2'
                onChange={(event)=>setBusinessName(event.target.value)} />
            </div>
            <Button className='w-full mt-4' onClick={onCreateBusiness} disabled={!businesName}>Create Business</Button>
        </div>
    </div>
  ):(
    <div className='flex flex-col text-xl items-center justify-center '>
        You have to <LoginLink className='text-blue-500'> Log in </LoginLink> to see this page.
    </div>
  )
}

export default CreateBusiness