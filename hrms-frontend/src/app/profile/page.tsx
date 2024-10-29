"use client";

const Profile = () => {
  return (
    <div className="h-[610px] flex items-center justify-center p-4">
      <div className=" h-[500px] p-6 rounded-lg  w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-3/5 mb-6 md:mb-0">
          <div className="flex justify-between border-b pb-2 mb-4">
            <div className="text-[35px] font-semibold text-black ">
              My Profile
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between mb-2 h-[60px] border-l-2 border-gray-300 pl-1.5">
              <div className="flex justify-between flex-col">
                <div className="text-sm text-blue-600 font-bold">
                  First Name
                </div>
                <span></span>
              </div>
            </div>
            <div className="mb-2 h-[60px] flex justify-between flex-col border-l-2 border-gray-300 pl-1.5">
              <div className="text-sm text-blue-600 font-bold">Last Name</div>
              <span></span>
            </div>
            <div className="mb-2 h-[60px] flex justify-between flex-col border-l-2 border-gray-300 pl-1.5">
              <div className="text-sm text-blue-600 font-bold">Email</div>
              <span></span>
            </div>
            <div className="mb-4 h-[60px] flex justify-between flex-col border-l-2 border-gray-300 pl-1.5">
              <div className="text-sm text-blue-600 font-bold">
                Mobile Number
              </div>
              <span></span>
            </div>
          </div>

          <button className="w-[30%] bg-blue-600  text-white py-2 rounded-lg ">
            Log Out
          </button>
        </div>
        <div className=" flex justify-center h-[300px] items-center w-full md:w-2/5  md:justify-end">
          <div className=" w-[200px] h-[200px] bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
