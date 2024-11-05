"use client";
import { countAllData } from "@/constants/constants";
import { IconChevronDown, IconCircleArrowRight } from "@tabler/icons-react";
import { StringDateFormatConvertor } from "@/utils/commonFunction";
import { useLazyGetAllDataApiByNameQuery } from "@/services/user/usersApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllLeaveDataApiByNameQuery } from "@/services/leave/getLeaves";
import { getAllUserData, setUserDataLength } from "@/redux/user/user";
import { useLazyGetAllHolidayDataApiByNameQuery } from "@/services/holiday/holidayApi";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { manageUserSelector } from "@/redux/user/userSelector";
const todayDate = StringDateFormatConvertor(
  new Date().toISOString(),
  "DD/MMM/YYYY",
  "-"
);

const Dashboard = () => {
  const [dummyData, setDummyData] = useState(countAllData);

  const [getLeaves, { data: leavesData, isSuccess: getLeavesSuccess }] =
    useLazyGetAllLeaveDataApiByNameQuery();
  const [getHolidays, { data: holidaysData, isSuccess: getHolidaySuccess }] =
    useLazyGetAllHolidayDataApiByNameQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [
    getEmployees,
    { data: employeeData, error, isLoading, isSuccess: getEmployeeSuccess },
  ] = useLazyGetAllDataApiByNameQuery();
  const dispatch = useDispatch();
  const { allUserDataLength, allUserData } = useSelector(manageUserSelector);
  const { authUser, authToken } = useSelector(manageAuthUserSelector);
  const fetchUserData = async (
    currPage: number,
    limit: number,
    search: string
  ) => {
    await getEmployees({
      page: currPage,
      limit: limit,
      search: search,
      token: authToken,
    });
  };
  const fetchLeaveData = async (
    currPage: number,
    limit: number,
    search: string
  ) => {
    await getLeaves({
      page: currPage,
      limit: limit,
      search: search,
      token: authToken,
    });
  };
  const fetchHolidayData = async (
    currPage: number,
    limit: number,
    search: string
  ) => {
    await getHolidays({
      page: currPage,
      limit: limit,
      search: search,
      token: authToken,
    });
  };

  useEffect(() => {
    if (employeeData?.users.length > 0 && getEmployeeSuccess) {
      dispatch(getAllUserData(employeeData?.users));
      dispatch(setUserDataLength(employeeData.totalusers));
    }
  }, [employeeData, getEmployeeSuccess]);
  useEffect(() => {
    if ((authToken && employeeData) || leavesData || holidaysData) {
      setDummyData((prevDummy: any) =>
        prevDummy.map((item: any) => {
          switch (item.title) {
            case "Number of Employee":
              return { ...item, count: employeeData?.users?.length || 0 };
            case "On Leave":
              return { ...item, count: leavesData?.leaves?.length || 0 };
            case "Upcoming Holiday":
              return { ...item, count: holidaysData?.count || 0 };
            default:
              return item;
          }
        })
      );
    }
  }, [employeeData, leavesData, authToken]);
  useEffect(() => {}, [authToken]);
  // useEffect(() => {
  //   if (employeeData?.users.length > 0 && isSuccess) {
  //     dispatch(getAllUserData(employeeData?.users));
  //     dispatch(setUserDataLength(employeeData.totalusers));
  //   }
  // }, [employeeData, isSuccess, authToken, authUser]);
  // useEffect(() => {}, [authToken]);
  useEffect(() => {
    if (employeeData?.users.length > 0 && getEmployeeSuccess) {
      dispatch(getAllUserData(employeeData?.users));
      dispatch(setUserDataLength(employeeData.totalusers));
    }
  }, [employeeData, getEmployeeSuccess, authToken, authUser]);

  useEffect(() => {
    if (authToken) {
      fetchUserData(currentPage, limit, search);
      fetchLeaveData(currentPage, limit, search);
      fetchHolidayData(currentPage, limit, search);
    }
  }, [currentPage, limit, search, authToken]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col gap-8 max-sm:gap-6 p-4">
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-bold">Hello User!</span>
        {/* <div className="flex justify-between">
          <span className="text-xl font-medium">Good Morning</span>
          <span className="text-xl font-medium ">Latest Member's</span>
        </div> */}
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
          <span className="text-2xl font-medium lg:h-[75px]  md:h-[50px] max-sm:h-[45px]">
            Time Sheet
          </span>
          <div className=" bg-slate-200 h-auto items-center flex flex-col rounded-xl py-4">
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
                <div className=" text-black gap-2 flex w-[48%] flex-col">
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
          <span className="text-2xl font-medium lg:h-[75px]  md:h-[50px] max-sm:h-[45px]">
            Latest Member
          </span>
          <div className="bg-slate-200 h-auto rounded-xl">
            {/* <div className="w-full flex flex-col justify-center items-center">
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
            </div> */}
            <div className="w-full flex flex-col justify-center items-center">
              {employeeData?.users
                ?.slice(0, 4)
                .map((value: any, index: number) => {
                  return (
                    <div
                      className="flex w-full lg:h-[88px] max-lg:h-[8.7vh] max-md:h-[88px] h-[12vh] max-sm:h-[88px] sm:h-[91px] items-center justify-center gap-2 border-b-[1px] border-[#dedede] last:border-none"
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
      <div className="flex flex-wrap justify-between items-start w-full md:gap-6 h-full lg:gap-0 max-sm:gap-6">
        {/* <div className="lg:w-[30%] w-full flex flex-col h-auto">
          <div className="flex justify-between w-full items-start lg:h-[75px]  md:h-[50px] max-sm:h-[45px]">
            <h1 className="text-2xl">Attendance</h1>
            <div className="rounded-full w-[35px] h-[35px] flex justify-center items-center border border-stone-950">
              <IconArrowUpRight />
            </div>
          </div>
          <div className="bg-slate-200 w-full rounded-2xl border border-black-500 flex items-center justify-center py-4">
            <div className="flex flex-col  lg:w-[90%] justify-between gap-3 md:w-[95%] max-sm:w-[90%]">
              <div className=" w-full flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="text-sm">Friday, 17th November</div>
                  <div className="text-2xl"> Clock in</div>
                </div>
                <div>
                  <div className="text-2xl">10:00 AM</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-5">
                {attendancedata.map((ele) => {
                  return (
                    <div
                      className="border border-black-500 rounded-3xl w-[45%] h-[130px] bg-green-300 flex grow items-center justify-center "
                      key={ele.id}
                      style={{ backgroundColor: ele.color }}
                    >
                      {ele.icon}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="lg:w-[37%] md:w-[48%] w-full flex flex-col">
          <div className="flex justify-between w-full items-start lg:h-[75px]  md:h-[50px] max-sm:h-[45px]">
            <h1 className="text-2xl">Members Leave</h1>
            <div className="rounded-full w-[35px] h-[35px] flex justify-center items-center border border-stone-950">
              <IconArrowUpRight />
            </div>
          </div>
          <div className="border border-black-500 rounded-2xl bg-slate-200 py-4 flex items-center justify-center">
            <div className="flex flex-col w-[92%] justify-between gap-3">
              <div className="flex gap-2 items-center ">
                <div className="rounded-full w-[60px] h-[60px] overflow-hidden">
                  <img
                    src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                    alt="demo"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">Max Johan</div>
                  <div className="text-xs text-neutral-500">
                    Type : Sick and casual leave
                  </div>
                </div>
              </div>
              <div className=" flex flex-col gap-3">
                {[17, 19].map((ele) => {
                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <div className=" w-[22%] lg:min-h-[108px] md:h-[104px] max-sm:h-[80px] rounded-3xl flex flex-col items-center justify-center bg-rose-200">
                          <p className="text-2xl max-sm:text-xl">{ele}</p>
                          <p className="text-2xl max-sm:text-xl">NOV</p>
                        </div>
                        <div className="w-[74%] lg:min-h-[108px] bg-white md:h-[100px] max-sm:h-[80px] rounded-3xl flex justify-center items-center">
                          <div className="w-[90%] min-h-[70%]">
                            <p className="text-sm">Note:</p>
                            <p className="text-sm">
                              I want to take a day off on 17nov
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="lg:w-[30%] md:w-[48%] w-full flex flex-col">
          <div className="flex justify-between w-full items-start lg:h-[75px] bg-white md:h-[50px] max-sm:h-[45px]">
            <h1 className="text-2xl">Leaves</h1>
            <div className="rounded-full w-[35px] h-[35px] flex justify-center items-center border border-stone-950">
              <IconArrowUpRight />
            </div>
          </div>
          <div className="border border-black-500 rounded-3xl bg-slate-200 rounded-xl flex justiy-center items-center flex-col max-md:pt-1 max-md:pb-2 max-sm:pb-0 max-sm:pt-0 lg:py-1">
            {[1, 1, 1, 1].map((ele) => {
              return (
                <>
                  <div className="border-b border-black-500 w-full flex items-center justify-center last:border-none">
                    <div className="w-[90%] flex justify-between lg:h-[80px] md:h-[80px] max-sm:h-[70px] items-center">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full w-[45px] h-[45px] flex justify-center items-center border border-black-300 bg-purple-300">
                          <IconPlus className="text-purple-500" />
                        </div>
                        <p className="text-sm font-medium">Sick Leave</p>
                      </div>
                      <div className="flex gap-4 text-gray-500">
                        <div className="flex flex-col items-center text-sm">
                          <p>Used</p>
                          <p>00</p>
                        </div>
                        <div className="flex flex-col items-center text-sm text-gray-500">
                          <p>Available</p>
                          <p>09</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
