'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import LocationOptions from '@/app/_utils/LocationOptions'
import Image from 'next/image'
import Link from 'next/link'
import ThemeOptions from '@/app/_utils/ThemeOptions'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function MeetingForm({setFormValues}) {

    const [location, setLocation] = useState();
    const [theme, setTheme] = useState();
    const [eventName, setEventName] = useState();
    const [duration, setDuration] = useState(30);
    const [locationURL, setLocationURL] = useState();
    const {user} = useKindeBrowserClient();
    const db = getFirestore(app);
    const router = useRouter();

    useEffect(()=>{
        setFormValues({
            eventName: eventName,
            duration: duration,
            location: location,
            locationURL: locationURL,
            theme: theme
        })
    },[eventName, duration, location, locationURL, theme])

    const onCreateClick=async()=>{
        const id= Date.now().toString();
        await setDoc(doc(db, 'meetingEvents', id),{
            id: id,
            eventName: eventName,
            duration: duration,
            location: location,
            locationURL: locationURL,
            theme: theme,
            businessId: doc(db, 'businesses', user?.email),
            createdBy: user?.email
        })
        toast.success('New Meeting Created Successfully')
        router.replace('/dashboard/meeting-type')
    }
  return (
    <div className='p-4'>
        <Link href='/dashboard'>
        <h2 className='flex gap-2'><ChevronLeft/> Cancel</h2>
        </Link>
        <div className='mt-4'>
            <h2 className='font-bold text-2xl my-4'>Create New Event</h2>
            <hr></hr>
        </div>
        <div className='flex flex-col gap-3 my-4'>
            <h2 className='font-semibold'>Event Name*</h2>
            <Input placeholder='Meeting Name' onChange={(event)=>setEventName(event.target.value)}/>

            <h2 className='font-semibold'>Duration*</h2>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant='outline' className='max-w-40'>{duration} Minutes</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>setDuration(15)}>15 Minutes</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setDuration(30)}>30 Minutes</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setDuration(45)}>45 Minutes</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setDuration(60)}>60 Minutes</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            <h2 className='font-semibold'>Location*</h2>
            <div className='grid grid-cols-4 gap-3'>
                {LocationOptions.map((item, index) => (
                    <div key={index} className={`border flex flex-col
                        justify-center items-center 
                        p-3 rounded-lg cursor-pointer
                        hover:bg-blue-100 hover:border-blue-400
                        ${location==item.name&&'border-blue-400 bg-blue-100'}`}
                        onClick={()=>setLocation(item.name)}>
                        <Image src={item.icon} width={20} height={20} alt={item.name}/>
                        <h2>{item.name}</h2>
                    </div>
                ))}
            </div>
            {location&&
            <>
            <h2 className='font-semibold'>Add {location} URL*</h2>
            <Input placeholder='Add URL' onChange={(event)=>setLocationURL(event.target.value)}/>
            </>
            }
            <h2 className='font-semibold'>Select Theme Color*</h2>
            <div className='flex justify-evenly'>
                {ThemeOptions.map((color, index)=>(
                    <div key={index} className={`h-7 w-7 rounded-full
                        cursor-pointer ${theme==color&&'border-2 border-black'}`} 
                    style={{backgroundColor:color}}
                    onClick={()=>setTheme(color)}>
                        
                    </div>
                ))}
            </div>
        </div>
        <Button className='w-full' 
        disabled={(!eventName||!duration||!location||!locationURL||!theme)}
        onClick={()=>onCreateClick()}>Create Event</Button>
    </div>
  )
}

export default MeetingForm