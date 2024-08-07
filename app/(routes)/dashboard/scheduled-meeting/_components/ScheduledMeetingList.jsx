import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CalendarCheck, Clock, Contact, Notebook, NotebookPen, PersonStanding, Timer } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function ScheduledMeetingList({meetingList, value, onDeleteMeetingEvent}) {
  return (
    <div>
      {meetingList&&meetingList.map((meeting, index) => (
      <Accordion type="single" collapsible key={index}>
        <AccordionItem value="item-1">
          <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
          <AccordionContent>
            <div>
            <div className='mt-5 flex flex-col gap-4'>
                <h2 className='flex gap-2 text-lg'><Contact/> {meeting?.userName}</h2>
                <h2 className='flex gap-2'><Clock/>{meeting?.duration} Minutes</h2>
                {/* <h2 className='flex gap-2'><MapPin/>{eventInfo?.location} Meeting</h2> */}
                <h2 className='flex gap-2'><Timer/> {meeting.selectedTime} </h2>
                <div className='flex gap-2'><NotebookPen/> <p className='text-gray-600'>{meeting?.userNotes}</p></div>
                
                {/* <h2><Link  className='text-blue-600'>{meeting?.locationURL}</Link></h2> */}
            </div>
            {value=='upcoming' &&
            <div className='flex gap-3'>
              <Link href={meeting?.locationURL?meeting?.locationURL:'#'}><Button variant="outline" className='mt-5 hover:bg-primary hover:text-white'>Join Now</Button> </Link>
            </div>}
            {value=='expired' &&
            <Button variant="destructive" className='mt-5' onClick={()=>onDeleteMeetingEvent(meeting)}>Delete Meeting</Button>
            }
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      ))}
    </div>
  )
}

export default ScheduledMeetingList