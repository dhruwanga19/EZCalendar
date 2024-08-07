import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarCheck, Clock, MapPin, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import TimeDateSelection from './TimeDateSelection';
import UserFormInfo from './UserFormInfo';
import { toast } from 'sonner';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import Plunk from '@plunk/node';
import { render } from '@react-email/components';
import Email from '@/emails';
import { useRouter } from 'next/navigation';


function MeetingSelectionUser({eventInfo, businessInfo}) {
    // console.log(eventInfo.eventInfo);
    const [date, setDate] = useState(new Date());
    const [enableTimeSlots, setEnableTimeSlots] = useState(false);
    const [selectedTime, setSelectedTime] = useState();
    const [timeSlots,setTimeSlots]= useState();

    const [step, setStep] = useState(1);
    
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userNotes, setUserNotes] = useState('');
    
    const [prevBooking, setPrevBooking] = useState([]);

    const db = getFirestore(app);
    const router = useRouter();
    const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);

    useEffect(()=>{
        eventInfo?.duration&&createTimeSlot(eventInfo?.duration)
    },[eventInfo])

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

    const handleDateChange=(date)=>{
        setDate(date);
        const day = format(date,'EEEE');
        if(businessInfo?.daysAvailable?.[day]){
            getPrevEventBooking(date);
            setEnableTimeSlots(true);
        }
        else{
            setEnableTimeSlots(false);
        }
    }

    const handleScheduleMeeting=async()=>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(regex.test(userEmail)==false)
        {

            toast.error('Enter valid email address')
            return ;
        }    

        const docId = Date.now().toString();
        await setDoc(doc(db, 'scheduledMeetings', docId), {
            businessName: businessInfo.businessName,
            businessEmail: businessInfo.email,
            selectedTime: selectedTime,
            selectedDate: date,
            formatedDate:format(date,'PPP'),
            formatedTimeStamp:format(date,'t'),
            duration: eventInfo.duration,
            locationURL: eventInfo.locationURL,
            eventId: eventInfo.id,
            id: docId,
            userName: userName,
            userEmail: userEmail,
            userNotes: userNotes,
        }).then(()=>{
            toast.success('Meeting Scheduled Successfully');
            sendEmail({user:userName});
            router.replace('/confirmation');
        })
    }

    const getPrevEventBooking=async(date_)=>{
        const q = query(collection(db, 'scheduledMeetings'), 
        where('selectedDate', '==', date_),
        where('eventId', '==', eventInfo.id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setPrevBooking(prev=>[...prev,doc.data()]);
        });
    }

    const sendEmail=({user})=>{
        const emailHtml = render(<Email
            userFirstName={user}
            duration={eventInfo?.duration}
            meetingTime={selectedTime}
            date={format(date,'PPP')}
            meetingUrl={eventInfo?.locationURL}
            businessName={businessInfo?.businessName}
        />);

        plunk.emails.send({
            to: userEmail,
            subject: "New Meeting Schedule Details",
            body: emailHtml,
        }).then((response)=>{
            console.log(response);
        });
    }
  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10' style={{borderTopColor:eventInfo?.theme}}>
        <Image src='/logo.svg' width={75} height={75} alt='logo'/>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
            {/* Meeting Info */}
            <div className='p-4 border-r'>
                <h2>{businessInfo?.businessName}</h2>
                <h2 className='font-bold text-2xl'>{eventInfo?.eventName?eventInfo?.eventName:'Meeting Name'}</h2>
            
            <div className='mt-5 flex flex-col gap-4'>
                <h2 className='flex gap-2'><Clock/>{eventInfo?.duration} Minutes</h2>
                <h2 className='flex gap-2'><MapPin/>{eventInfo?.location} Meeting</h2>
                <h2 className='flex gap-2'><CalendarCheck/> {format(date,'PPP')} </h2>
                {selectedTime&&<h2 className='flex gap-2'><Timer/> {selectedTime} </h2>}
                <h2><Link href={eventInfo?.locationURL?eventInfo?.locationURL:'#'} className='text-blue-600'>{eventInfo?.locationURL}</Link></h2>
            </div>
            </div>
        
            {/* Time and Date Selection */}
            {step==1? <TimeDateSelection date={date} 
            handleDateChange={handleDateChange} 
            timeSlots={timeSlots} 
            enableTimeSlots={enableTimeSlots} 
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
            prevBooking={prevBooking}/>
            
            :
            <UserFormInfo 
            setUserName={setUserName} 
            setUserEmail={setUserEmail} 
            setUserNotes={setUserNotes}
            />}
        </div>
        <div className='flex gap-3 justify-end'>
        {step==2&&<Button variant="outline" 
        onClick={()=>setStep(1)}>Back</Button>}
        {step===1? <Button className='mt-8 float-right' 
        disabled={!selectedTime||!date}
        onClick={()=>setStep(step+1)}> Next </Button>:
        <Button disabled={!userEmail||!userName}
        onClick={handleScheduleMeeting}>Schedule</Button>}
        

        </div>

    </div>
  )
}

export default MeetingSelectionUser