import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { set } from 'date-fns'
import React from 'react'

function TimeDateSelection({date, handleDateChange, timeSlots, enableTimeSlots, setSelectedTime, selectedTime, prevBooking}) {

    const checkTimeSlot=(time)=>{
        return (prevBooking.filter(item=>item.selectedTime==time)).length>0
    }
  return (
    <div className='md:col-span-2 flex px-4'>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-xl'>Select Date & Time</h2>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d)=>handleDateChange(d)}
                        className="rounded-md border mt-5"
                        disabled = {(date)=>date<=new Date()}
                    />
                </div>
                <div className='flex flex-col w-full overflow-auto gap-4 p-5' style={{maxHeight:'400px'}}>
                    {timeSlots?.map((time,index)=>(
                    <Button key={index} disabled={!enableTimeSlots||checkTimeSlot(time)}
                    onClick={()=>setSelectedTime(time)}
                    className={`border-primary text-primary hover:bg-primary hover:text-white ${time==selectedTime&&'bg-primary text-white'}`} variant="outline">{time}</Button>
                    ))}
                </div>
            </div>
  )
}

export default TimeDateSelection