import { Input } from '@/components/ui/input'
import React from 'react'

function UserFormInfo({setUserName, setUserEmail, setUserNotes}) {

  return (
    <div className='p-4 px-8 flex flex-col gap-3'>
        <h2 className='font-bold text-xl'>Enter Details</h2>
        <div>
            <h2 className='font-semibold'>Name*</h2>
            <Input placeholder='Enter your name' 
            onChange={(event)=>setUserName(event.target.value)}/>
        </div>

        <div>
            <h2 className='font-semibold'>Email*</h2>
            <Input placeholder='Enter your email'
            onChange={(event)=>setUserEmail(event.target.value)}/>
        </div>

        <div>
            <h2 className='font-semibold'>Share notes for meeting</h2>
            <Input placeholder='Enter your notes...'
            onChange={(event)=>setUserNotes(event.target.value)}/>
        </div>

    </div>
  )
}

export default UserFormInfo