import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
    const loggedIn={firstName:'Oumeima', lastName:'Limeme',email:'oumalim@gmail.com'};
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
               <HeaderBox
                 type="greeting"
                 title="Welcome"
                 user={loggedIn?.firstName || 'Guest'}
                 subtext='Access and manage your account and transactions efficiently.'
               />
            
            <TotalBalanceBox
             accounts={[]}
             totalBanks={1}
             totalCurrentBalance={3003.76}
            
            />
            </header>
            RECENT Transaction
        </div>
        <RightSidebar
         user={loggedIn}
         transaction={[]}
         banks={[]}
        ></RightSidebar>
    </section>
  )
}

export default Home
