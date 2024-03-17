import React from "react";
import ProfilePage from "../../../Common/settings/ProfilePage";
import PasswordChange from "../../../Common/settings/PasswordChange";

const Settings = () => {
  return (
    <div className="p-5 w-full overflow-auto">
      <h1 className="font-bold text-2xl">Settings</h1>
      <ProfilePage />
      <PasswordChange />
    </div>
  );
};

export default Settings;
