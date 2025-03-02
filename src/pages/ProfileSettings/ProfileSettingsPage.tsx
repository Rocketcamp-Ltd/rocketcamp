import React from 'react';
import { UpdateProfile } from './ui/UpdateProfile';

const ProfileSettingsPage: React.FC = () => {
  return <div className='min-h-screen flex items-center justify-center'>
    <UpdateProfile />
  </div>;
};

export default ProfileSettingsPage;
