"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScheduledMeetingList from './_components/ScheduledMeetingList'
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { format } from 'date-fns'
import { toast } from 'sonner'

function ScheduledMeeting() {

    const db = getFirestore(app);
    const {user} = useKindeBrowserClient();

    const [meetingList, setMeetingList] = useState([]);

    useEffect(() => {
        user&&getScheduledMeetings();
    }, [user]);

    /**
     * Get all the scheduled meetings for the business
     */
    const getScheduledMeetings = async () => {
        setMeetingList([]);
        const q = query(collection(db, 'scheduledMeetings'), where('businessEmail', '==', user.email));
        const meetings = await getDocs(q);
        meetings.forEach((doc) => {
            console.log(doc.data());
            setMeetingList(prev=>[...prev, doc.data()]);
        });
        console.log(meetingList);
    }

    /**
     * Filter the meeting list based on the type == upcoming or expired 
     */
    const filterMeetingList = (type) => {
        if (type == 'upcoming') {
            return meetingList.filter(item=>item.formatedTimeStamp>=format(new Date(),'t'));
        } else {    
            return meetingList.filter(item=>item.formatedTimeStamp<format(new Date(),'t'));
        }
    }

    const onDeleteMeetingEvent=async(event)=>{
        await deleteDoc(doc(db, "scheduledMeetings", event?.id)).then(resp=>{
          toast.success('Meeting Event Deleted!');
          getScheduledMeetings();
        })
      }
  return (
    <div className='p-10'>
        <h1 className='font-semibold text-2xl'>Scheduled Meetings</h1>
        <hr className='my-5'></hr>

        <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming"> <ScheduledMeetingList meetingList={filterMeetingList('upcoming')} value={'upcoming'} onDeleteMeetingEvent={onDeleteMeetingEvent}/> </TabsContent>
        <TabsContent value="expired"><ScheduledMeetingList meetingList={filterMeetingList('expired')} value={'expired'} onDeleteMeetingEvent={onDeleteMeetingEvent}/></TabsContent>
        </Tabs>


    </div>

  )
}

export default ScheduledMeeting