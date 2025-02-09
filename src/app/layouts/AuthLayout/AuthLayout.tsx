import React from 'react';
import asideImg from '@/assets/images/aside.png';

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='grid grid-cols-3 w-full h-screen'>
      <aside className='w-full h-full'>
        <img
          src={asideImg}
          alt=""
          className='w-full h-full max-w-screen max-h-screen object-cover'
        />
      </aside>
      <main className='col-span-2 flex items-center justify-center'>
        {children}
      </main>
    </div>
  );
};
