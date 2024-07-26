'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { sidebarLinks } from '../../constants';
  import { cn } from '../../lib/utils';
  import { usePathname } from 'next/navigation';
import Footer from './Footer'
  
  

const MobileNav = ({user}:MobileNavProps) => {
    const pathname=usePathname();
  return (
    <section className='w-fulll  max-w-[264px]' >
        <Sheet>
          <SheetTrigger>  
            <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="MENU"
            className='cursor-pointer'
            >

            </Image>
          </SheetTrigger>
           <SheetContent side="left" className='border-none bg-white'>
           <a className='cursor-pointer items-center gap-1 px-4 flex' href="" >
     <Image
         src='/icons/logo.svg'
          width={34}
          height={34} 
          alt={'Bank logo'}    
              />
         <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>     
        </a>
        <div className="mobilenav-sheet">
            <SheetClose asChild>
                <nav className="flex text-white h-full flex-col gap-6 pt-16">
                {sidebarLinks.map((item)=> {
          const isActive = pathname===item.route || pathname.startsWith(`${item.route}`);
        return ( 
            <SheetClose asChild key={item.route}>
        <a href={item.route} key={item.label}
        className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}
        > 
          <Image
           src={item.imgURL}
           alt={item.label}
           width={20}
           height={20}
           className={cn({'brightness-[3] invert-0':isActive})}
          >
          </Image>
       
        <p className={cn('text-16 font-semibold text-black-2',{'text-white':isActive})}>
          {item.label}
        </p>
        </a>
            </SheetClose>
        
          );
      })}  

      USER

                </nav>
                
            </SheetClose>
        </div>

       
           </SheetContent>
         </Sheet>

         <Footer user={user} type="mobile" />

    </section>
  )
}

export default MobileNav
