import React from 'react';
import { UpdateProfile } from './ui/UpdateProfile';

const ProfileSettingsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <UpdateProfile />
    </div>
  );
};

export default ProfileSettingsPage;
