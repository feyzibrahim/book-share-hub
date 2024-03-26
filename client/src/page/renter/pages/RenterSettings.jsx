import React from "react";
import ProfilePage from "../../../Common/settings/ProfilePage";
import PasswordChange from "../../../Common/settings/PasswordChange";

const RenterSettings = () => {
  return (
    <div className="p-5 w-full h-screen overflow-auto">
      <h1 className="font-bold text-2xl">Settings</h1>
      <ProfilePage />
      <PasswordChange />
    </div>
  );
};

export default RenterSettings;
