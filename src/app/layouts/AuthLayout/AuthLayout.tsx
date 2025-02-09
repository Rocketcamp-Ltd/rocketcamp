import React from 'react';
import asideImg from '@/assets/images/aside.png';

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid h-screen w-full grid-cols-3">
      <aside className="h-full w-full">
        <img
          src={asideImg}
          alt=""
          className="h-full max-h-screen w-full max-w-screen object-cover"
        />
      </aside>
      <main className="col-span-2 flex items-center justify-center">{children}</main>
    </div>
  );
};
