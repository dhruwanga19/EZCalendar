"use client"
import DaysList from '@/app/_utils/DaysList'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { set } from 'date-fns'
import { collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function Availability() {

    const [daysAvailable, setDaysAvailable] = useState(
        {
            Sunday: false,
        },
        {
            Monday: false,
        },
        {
            Tuesday: false,
        },
        {
            Wednesday: false,
        },
        {
            Thursday: false,
        },
        {
            Friday: false,
        },
        {
            Saturday: false,
        },
    );
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();

    useEffect(() => {
        user && getBusinessInfo();
    }, [user])

    const getBusinessInfo=async()=>{
        const docRef=doc(db, 'businesses', user?.email);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            setDaysAvailable(docSnap.data().daysAvailable);
            setStartTime(docSnap.data().startTime);
            setEndTime(docSnap.data().endTime);
        }
    }

    const onHandleChange=(day, value)=>{
        setDaysAvailable({...daysAvailable,[day]:value})
    }

    const handleSave=async()=>{
        console.log(daysAvailable,startTime,endTime);
        const docRef=doc(db, 'businesses', user?.email);
        await updateDoc(docRef,{
            daysAvailable:daysAvailable,
            startTime:startTime,
            endTime:endTime,
        }).then(resp=>{
            toast.success('Availability Updated!');
        })
    }
  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl'>Availability</h2>
        <hr className='my-7'></hr>
        <div>
            <h2 className='font-bold'>Availability Days</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 my-3'>
                {DaysList.map((day,index)=>(
                    <div key={index}>
                        <h2> <Checkbox 
                        checked={daysAvailable[day.day]?daysAvailable[day.day]:false}
                        onCheckedChange={(e)=>onHandleChange(day.day,e)} /> 
                        {day.day}</h2>

                    </div>
                ))}
            </div>
        </div>
        <div className='mt-10'>
            <h2 className='font-bold'>Availability Time</h2>
            <div className='flex flex-row gap-10'>
                <div>
                    <h2 className='mt-3'>Start Time</h2>
                    <Input type='time' 
                    defaultValue={startTime}
                    onChange={(e)=>setStartTime(e.target.value)} />
                </div>
                <div>
                    <h2 className='mt-3'>End Time</h2>
                    <Input type='time' 
                    defaultValue={endTime}
                    onChange={(e)=>setEndTime(e.target.value)} />
                </div>
            </div>
        </div>
        <Button className='mt-5' onClick={handleSave}>Save</Button>
        
    </div>
  )
}

export default Availability