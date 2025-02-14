"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Divide, Loader2 } from 'lucide-react';
import CustomInput from './ui/CustomInput';
import { authformSchema }  from '../../lib/utils';
import { signIn,signUp }  from '../../lib/actions/user.actions';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import PlaidLink from './PlaidLink';


const AuthForm = ({type}:{type:string}) => {
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(false); 
    const formSchema = authformSchema(type);
    const router=useRouter();


    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit= async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {

     // Sign up with Appwrite & create plaid token
     if(type==='sign-up'){
      const userData={
        firstName:data.firstName!,
        lastName:data.lastName!,
        address1:data.address1!,
        state:data.state!,
        ssn: data.ssn!,
        email:data.email,
        password:data.password,
        postalCode:data.postalCode!,
        dateOfBirth:data.dateOfBirth!,

        
      }
      const newuser= await signUp(userData);
      setUser(newuser);

     }
     if(type==='sign-in'){

     const response = await signIn({
      email: data.email,
      password: data.password,
      })
       if(response)  router.push('/');

     }
     
    }
    catch (error){
      console.log(error);

    }
    finally {
      setIsLoading(false);
    }
   
  }


  return (
    <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
        <a className='cursor-pointer items-center gap-1  flex' href="" >
     <Image
         src='/icons/logo.svg'
          width={34}
          height={34} 
          alt={'Bank logo'}    
              />
         <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>     
        </a>
        <div className="flex flex-col gap-1 md:gap-3">
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                {user ? 'LinkAccount'
                : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'}
                <p className="text-16 font-normal text-gray-600">
                {user ? 'Link your Account o get started'
                : 'Please enter your details'
                }

                </p>
            </h1>
        </div>

        </header>
       { user ? ( 
            <div className="flex flex-col gap-4">
            
            <PlaidLink user={user} variant="primary"/>
            
            </div>
       )  : ( 

      <>
         
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      {type==='sign-up' && (
        <>
             <div className='flex gap-4'>
             <CustomInput control={form.control} name='firstName' label="FirstName" placeholder="Enter your First Name" />
             <CustomInput control={form.control} name='lastName' label="LastName" placeholder="Enter your Last Name" />
             </div>

             <CustomInput control={form.control} name='address1' label="Adress" placeholder="Enter your Adress" />
            
             <div className='flex gap-4'>
             <CustomInput control={form.control} name='dateOfBirth' label="dateOfBirth" placeholder="YYYY-MM-DD" />
             <CustomInput control={form.control} name='state' label="State" placeholder="Example: TN" />
             </div>
            
             <div className='flex gap-4'>
             <CustomInput control={form.control} name='postalCode' label="postalCode" placeholder="Example: 11101" />
             <CustomInput control={form.control} name='ssn' label="ssn" placeholder="Example: 1234" />
              </div>
             

        </>
      ) }



      <CustomInput control={form.control} name='email' label="Email" placeholder="Enter your email" />
     
      <CustomInput control={form.control} name='password' label="Password" placeholder="Enter your password" />

        <div className='flex flex-col gap-4'>

       
        <Button type="submit" disabled={isLoading}
        className='form-btn'>
          {isLoading ? (
         <>
         <Loader2 size={20}
         className='animate-spin'/>
         &nbsp; Loading...
         </>
          ): type==='sign-in' ? 'Sign In' : 'Sign Up'
          }
          
          </Button>
          </div>

      </form>
    </Form>
    <footer className='flex justify-center gap-1'>
      <p className='text-14 font-normal text-gray-600'> 
        {
          type === 'sign-in' ? 'Don\'t have an account?'
          : "Already have an accout?"
        }
      </p>
      <Link href={type==='sign-in' ? '/sign-up' : '/sign-in' } className='form-link'>
      {type==='sign-in' ? 'Sign Up' : 'Sign In' }
      
      </Link>
    </footer>

         </>
      ) } 
    </section>
  )
}

export default AuthForm
