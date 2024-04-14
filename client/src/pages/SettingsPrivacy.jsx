import React, { useState } from "react";
import axios from "axios";

const SettingsPrivacy = () => {
  const [formData, setFormdata] = useState();
  return (
    <div className="px-20 py-10 w-full">
      <form className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-1/2 gap-1 font-semibold">
          <label className="pt-2">Profile Picture</label>
          <input type="file" />
          <label className="pt-2">Username</label>
          <input type="text" className="border p-2 rounded-lg" />
          <label className="pt-2">Email</label>
          <input type="text" className="border p-2 rounded-lg" />
        </div>
        <div className="flex flex-col w-1/2 gap-1 font-semibold">
          <label className="pt-2">Phone Number</label>
          <input type="text" className="border p-2 rounded-lg " />
          <label className="pt-2">Password</label>
          <input type="text" className="border p-2 rounded-lg" />
        </div>
        <button className="border p-2 w-1/4 m-5 rounded-lg bg-[#DC143C] hover:bg-[#f05473] text-white font-bold text-xl">
          Update
        </button>
      </form>
    </div>
  );
};

export default SettingsPrivacy;
