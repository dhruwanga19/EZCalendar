import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center my-20'>
        <div className='text-center max-w-3xl'>
        <h2 className='font-bold text-[60px] text-slate-800'>Ease of Scheduling!</h2>
        <h2 className='text-xl mt-5 text-slate-500'>Calendar is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time - and so much more</h2>
        <div className='flex gap-4 flex-col mt-5'>
          <h3 className='text-sm'>Sign Up free with Google and Facebook</h3>
          <div className='flex justify-center gap-8'>
            <Button className='gap-2 p-6'><Image src='/google.svg' alt='google' width={30} height={30} />Sign Up with Google</Button>
            <Button className='gap-2 p-6'><Image src='/facebook.svg' alt='facebook' width={30} height={30}/>Sign Up with Facebook</Button>
          </div>
          <hr></hr>
          <h2><Link href='' className='text-blue-700'>Sign Up with Free with Email.</Link> No Credit Card required.</h2>
        </div>
        </div>
    </div>
  )
}

export default Hero