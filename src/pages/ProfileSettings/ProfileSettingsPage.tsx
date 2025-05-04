import React from 'react';
import { UpdateProfile } from './ui/UpdateProfile';

const ProfileSettingsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-0 sm:py-0">
      <UpdateProfile />
    </div>
  );
};

export default ProfileSettingsPage;
