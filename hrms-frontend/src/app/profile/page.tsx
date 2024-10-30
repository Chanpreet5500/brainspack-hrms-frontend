"use client";
import { useState } from "react";

const Profile = () => {
  const [firstName, setFirstName] = useState("Emery");
  const [lastName, setLastName] = useState("Kenter");
  const [contactInfoPublic, setContactInfoPublic] = useState(false);

  return (
    <div className="h-[610px] bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="bg-white h-[500px] p-6 rounded-lg shadow-md w-full max-w-4xl flex justify-between">
        <div className="w-[50%] flex flex-col gap-[20px] justify-center ">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>

          <div className="mb-4 h-[30px]">
            <label className="block text-gray-700">First Name</label>
            <span className="w-full border-b border-gray-400 block h-full"></span>
          </div>
          <div className="mb-4 h-[30px]">
            <label className="block text-gray-700">Last Name</label>
            <span className="w-full border-b border-gray-400 block h-full"></span>
          </div>
          <div className="mb-4 h-[30px]">
            <label className="block text-gray-700">Email</label>
            <span className="w-full border-b border-gray-400 block h-full"></span>
          </div>
          <div className="mb-4 h-[30px]">
            <label className="block text-gray-700">Mobile Number</label>
            <span className="w-full border-b border-gray-400 block h-full"></span>
          </div>

          <div>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Log Out
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center w-[50%]">
          <div className="w-[200px] h-[200px] bg-gray-700 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14c2.5 0 4.5-2 4.5-4.5S14.5 5 12 5 7.5 7 7.5 9.5 9.5 14 12 14zm0 2c-4.5 0-8 2-8 6v1h16v-1c0-4-3.5-6-8-6z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
