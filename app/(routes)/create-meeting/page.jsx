'use client'
import React, { useState } from 'react'
import MeetingForm from './_components/MeetingForm'
import PreviewMeeting from './_components/PreviewMeeting';

function CreateMeeting() {

    const [formValues, setFormValues] = useState();

  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
       {/* Meeting Form */}
        <div className='shadow-md border h-screen'>
            <MeetingForm setFormValues={(value)=>setFormValues(value)}/>
        </div>
        {/* Preview */}
        <div className='md:col-span-2'>
            <PreviewMeeting formValues={formValues}/>

        </div>
    </div>
  )
}

export default CreateMeeting