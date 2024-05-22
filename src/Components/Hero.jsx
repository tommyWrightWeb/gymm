import React from 'react';
import Button from './Button';

function Hero() {
  return (
    <div className='p-4 min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto'>
        <div className='flex flex-col gap-4'>
        <p> IT'S TIME TO GET</p>
        <h1 className='upper-case font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>SWOLE <span className='text-blue-400 font-medium'>NORMOUS</span></h1>
        </div>
        <p className='text-sm md:text-base font-light'>I hereby acknowledge that I may become <span>unbelievably swolenormous</span> 
        and accept all the risks of becoming a <span className='text-blue-400 font-medium'>mass monstrosity </span>
        affiliated with severe body dysmorphia, unable to fit through doors.
        </p>
        <Button func={() => {
                window.location.href = '#generate'
            }} text={"Accept & Begin"}></Button>
    </div>
  );
}

export default Hero;
