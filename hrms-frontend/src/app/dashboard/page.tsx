"use client";
import { countAllData } from "@/constants/constants";
import { IconChevronDown, IconCircleArrowRight } from "@tabler/icons-react";

import { StringDateFormatConvertor } from "@/constants/commonFunction";
import { useLazyGetAllDataApiByNameQuery } from "@/services/user/usersApi";
import { manageUserSelector } from "@/redux/user/userSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllLeaveDataApiByNameQuery } from "@/services/leave/getLeaves";
import { getAllUserData, setUserDataLength } from "@/redux/user/user";

const todayDate = StringDateFormatConvertor(
  new Date().toISOString(),
  "DD/MMM/YYYY",
  "-"
);

const Dashboard = () => {
  const [dummyData, setDummyData] = useState(countAllData);

  const [getLeaves, { data: leavesData }] =
    useLazyGetAllLeaveDataApiByNameQuery();
  // const [getHolidays, { data: holidaysData }] = useLazyGetHolidaysQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [getEmployees, { data: employeeData, error, isLoading, isSuccess }] =
    useLazyGetAllDataApiByNameQuery();
  const dispatch = useDispatch();
  const { allUserDataLength, allUserData } = useSelector(manageUserSelector);

  const fetchUserData = async (
    currPage: number,
    limit: number,
    search: string
  ) => {
    await getEmployees({
      page: currPage,
      limit: limit,
      search: search,
    });
  };

  // useEffect(() => {
  //   if (employeeData?.users.length > 0 && isSuccess) {
  //     dispatch(getAllUserData(employeeData?.users));
  //     dispatch(setUserDataLength(employeeData.totalusers));
  //   }
  // }, [employeeData, isSuccess]);
  useEffect(() => {
    getEmployees("");
    getLeaves("");
    // getHolidays();
  }, []);
  useEffect(() => {
    if (employeeData || leavesData) {
      setDummyData((prevDummy: any) =>
        prevDummy.map((item: any) => {
          console.log(item, "item");
          switch (item.title) {
            case "Number of Employee":
              return { ...item, count: employeeData?.users?.length || 0 };
            case "On Leave":
              return { ...item, count: leavesData?.leaves?.length || 0 };
            // case "Upcoming Holiday":
            //   return { ...item, count: holidaysData?.count || 0 };
            default:
              return item;
          }
        })
      );
    }
  }, [employeeData, leavesData]);
  useEffect(() => {
    fetchUserData(currentPage, limit, search);
  }, [currentPage, limit, search]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col gap-8 max-sm:gap-6 p-4">
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-bold">Hello User!</span>
        <div className="flex justify-between">
          <span className="text-xl font-medium">Good Morning</span>
          <span className="text-xl font-medium ">Latest Member's</span>
        </div>
      </div>
      <div className="flex w-full justify-between flex-wrap sm:gap-5 md:gap-5 lg:gap-0 max-sm:gap-6">
        <div className="flex flex-col lg:w-[40%] md:w-full">
          <div className="w-full h-full flex flex-wrap justify-center gap-5">
            {dummyData.map((value, index) => (
              <div
                className="w-[47%] rounded-xl flex flex-col items-center justify-center grow py-2 max-sm:w-full max-sm:py-4"
                key={index}
                style={{ backgroundColor: value.color }}
              >
                <div className="w-[85%] flex flex-start flex-col gap-3">
                  <div
                    className="text-lg flex w-[40px] h-[40px] items-center justify-center rounded-full"
                    style={{ backgroundColor: `${value.iconBgColor}` }}
                  >
                    {value.icon}
                  </div>
                  <div className="flex w-full">
                    <div className="flex flex-col w-full text-black">
                      <div>{value.title}</div>
                      <div className="text-lg w-full flex justify-between">
                        <div className="font-bold">{value?.count}</div>
                        <span className="text-black">
                          <IconCircleArrowRight size={30} stroke={1} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:w-[30%] md:w-[48%] w-full">
          <div className=" bg-white h-auto items-center flex flex-col rounded-xl py-4">
            <div className="text-black text-lg h-[50px] flex w-[90%] font-bold items-start">
              {todayDate}
            </div>
            <div className="w-[90%] flex flex-col items-center  justify-center gap-4">
              <div className="flex flex-col gap-2 text-black w-full  lg:h-[70px] md:h-[70px] max-sm:h-[70px]  ">
                <label htmlFor="project" className="text-sm">
                  Project
                </label>

                <input
                  name="project"
                  className="border black h-full rounded pl-[10px]"
                  placeholder="Create a project"
                />
              </div>
              <div className="flex w-full justify-between lg:h-[70px] md:h-[70px] max-sm:h-[70px]">
                <div className="flex text-black gap-2 flex w-[48%] flex-col">
                  <label htmlFor="task" className="text-sm">
                    Task
                  </label>
                  <input
                    name="task"
                    className="border black h-full rounded pl-[10px]"
                    placeholder="Create a project"
                  />
                </div>
                <div className="text-black gap-2 flex w-[48%] flex-col ">
                  <label htmlFor="hours" className="text-sm">
                    Hours
                  </label>
                  <input
                    name="hours"
                    className="border black h-full rounded pl-[10px]"
                    placeholder="Create a project"
                  />
                </div>
              </div>
              <div className="flex justify-between w-full md:h-[34px] max-sm:h-[40px] lg:h-[34px]  items-start">
                <span className="text-sm">Notes</span>
                <div>
                  <IconChevronDown stroke={1.5} />
                </div>
              </div>
              <button className="bg-black w-full md:h-[60px] max-sm:h-[50px] lg:h-[40px] text-white rounded-full lg:mb-[8px]">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:w-[27%] md:w-[49%] w-full">
          <div className=" bg-white h-auto rounded-xl">
            <div className="w-full flex flex-col justify-center items-center">
              {employeeData?.users?.map((value: any, index: number) => {
                return (
                  <div
                    className="flex w-full lg:h-[88px]  max-lg:h-[8.7vh] max-md:h-[88px] h-[12vh] max-sm:h-[88px] sm:h-[91px] items-center justify-center gap-2 border-b-[1px] border-#dedede last:border-none"
                    key={index}
                  >
                    <div className="w-[90%] flex gap-2 items-center">
                      <div className="h-[60px] w-[60px] bg-[green] rounded-full overflow-hidden">
                        <img
                          src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                          alt="demo"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex gap-1">
                          <span className="text-lg font-bold">
                            {value?.fname}
                          </span>
                          <span className="text-lg font-bold">
                            {value?.lname}
                          </span>
                        </div>
                        <span className="text-sm">{value?.role}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
