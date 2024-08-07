'use client'
import React, { useEffect, useState } from 'react'
import MeetingSelectionUser from '../_components/MeetingSelectionUser'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'

function SharedMeetingEvent({params}) {

    const db = getFirestore(app);
    const [businessInfo, setBusinessInfo] = useState();
    const [eventInfo, setEventInfo] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        params&&getMeetingDetails()
    }, [params])

    const getMeetingDetails = async () => {
        setLoading(true);
        const q = query(collection(db, 'businesses'), where('businessName', '==', params.business));
        const docSnap = await getDocs(q);
        docSnap.forEach(doc => {
            setBusinessInfo(doc.data())
        });

        const docRef = doc(db, 'meetingEvents', params?.meetingEventId);
        const result = await getDoc(docRef);
        // console.log(result.data());
        setEventInfo(result.data());
        setLoading(false);
    }   

  return (
    <div>
        <MeetingSelectionUser eventInfo = {eventInfo} businessInfo={businessInfo}/>
    </div>
  )
}

export default SharedMeetingEvent