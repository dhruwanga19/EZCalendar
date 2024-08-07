import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function PreviewMeeting({formValues}) { 

    const [date, setDate] = useState(new Date());

    const [timeSlots,setTimeSlots]= useState();
    useEffect(()=>{
        formValues?.duration&&createTimeSlot(formValues?.duration)
    },[formValues])

    const createTimeSlot=(interval)=>{
        const startTime = 8 * 60; // 8 AM in minutes
        const endTime = 22 * 60; // 10 PM in minutes
        const totalSlots = (endTime - startTime) / interval;
        const slots = Array.from({ length: totalSlots }, (_, i) => {
        const totalMinutes = startTime + i * interval;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
        const period = hours >= 12 ? 'PM' : 'AM';
        return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
    });
 
    setTimeSlots(slots); 
    }
  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8' style={{borderTopColor:formValues?.theme}}>
        <Image src='/logo.svg' width={75} height={75} alt='logo'/>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
            {/* Meeting Info */}
            <div className='p-4 border-r'>
                <h2>Event Name</h2>
                <h2 className='font-bold text-2xl'>{formValues?.eventName?formValues?.eventName:'Meeting Name'}</h2>
            
            <div className='mt-5 flex flex-col gap-4'>
                <h2 className='flex gap-2'><Clock/>{formValues?.duration} Minutes</h2>
                <h2 className='flex gap-2'><MapPin/>{formValues?.location} Meeting</h2>
                <h2><Link href={formValues?.locationURL?formValues?.locationURL:'#'} className='text-blue-600'>{formValues?.locationURL}</Link></h2>
            </div>
            </div>
        
            {/* Time and Date Selection */}
            <div className='md:col-span-2 flex px-4'>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-xl'>Select Date & Time</h2>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border mt-5"
                        disabled = {(date)=>date<=new Date()}
                    />
                </div>
                <div className='flex flex-col w-full overflow-auto gap-4 p-5' style={{maxHeight:'400px'}}>
                    {timeSlots?.map((time,index)=>(
                    <Button key={index} className="border-primary text-primary hover:text-blue-400" variant="outline">{time}</Button>
                    ))}
                </div>
            </div>
        </div>

    </div>
  )
}

export default PreviewMeeting