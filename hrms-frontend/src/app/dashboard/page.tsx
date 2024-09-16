const DashboardComponent = () => {
  const dummy = [
    {
      title: "One",
      count: 1,
      icon: "A",
      color: "#c9b7eb",
      iconBgColor: "#b4a4d6",
    },
    {
      title: "Two",
      count: 2,
      icon: "B",
      color: "#efd9ce",
      iconBgColor: "#e9ccbd",
    },
    {
      title: "Three",
      count: 3,
      icon: "C",
      color: "#c9e4ca",
      iconBgColor: "#a8dbaa",
    },
    {
      title: "Four",
      count: 4,
      icon: "D",
      color: "#cfdee7",
      iconBgColor: "#afccdd",
    },
  ];

  const memberData = [
    {
      name: "A",
      designation: "Assosiate Software Developer",
    },
    {
      name: "A",
      designation: "Sr. Software Developer",
    },
    {
      name: "A",
      designation: "Flutter Developer",
    },
    {
      name: "A",
      designation: "UI/UX Developer",
    },
  ];

  return (
    <div className="flex w-full h-[60vh] gap-5">
      <div className="flex flex-col w-[40%] gap-2">
        <div className="flex flex-col gap-2 h-[13%]">
          <span>Hello User!</span>
          <span className="text-2xl font-medium">Good Morning</span>
        </div>

        <div className="w-full h-full flex flex-wrap justify-center gap-5">
          {dummy.map((value, index) => {
            return (
              <div
                className="w-[47%] rounded-xl flex flex-col items-center justify-center"
                key={index}
                style={{backgroundColor: value.color}}>
                <div className="w-[85%] flex flex-start flex-col gap-3">
                  <div
                    className="text-lg flex w-[40px] h-[40px] items-center justify-center rounded-full"
                    style={{backgroundColor: `${value.iconBgColor}`}}>
                    {value.icon}
                  </div>
                  <div className="flex w-full">
                    <div className="flex flex-col w-full text-black">
                      <div>{value.title}</div>
                      <div className="text-lg w-full flex justify-between">
                        <div className="font-bold">{value.count}</div>
                        <span className="text-black">TEXT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col w-[30%] gap-3">
        <span className="text-2xl font-medium h-[14%]">Time Sheet</span>
        <div className=" bg-white h-full items-center flex flex-col rounded-xl">
          <div className="text-black text-lg h-[50px] flex w-[90%] font-bold items-center">
            Nov 11, 2024
          </div>
          <div className="w-[90%] flex flex-col items-center h-full justify-center gap-3">
            <div className="flex flex-col gap-2 text-black w-full h-[10vh]">
              <label for="project" className="text-sm">
                Project
              </label>
              <input
                name="project"
                className="border black h-full rounded pl-[10px]"
                placeholder="Create a project"
              />
            </div>

            <div className="flex w-full justify-between h-[10vh]">
              <div className="flex text-black gap-2 flex w-[48%] flex-col">
                <label for="task" className="text-sm">
                  Task
                </label>
                <input
                  name="task"
                  className="border black h-full rounded pl-[10px]"
                  placeholder="Create a project"
                />
              </div>
              <div className="text-black gap-2 flex w-[48%] flex-col ">
                <label for="hours" className="text-sm">
                  Hours
                </label>
                <input
                  name="hours"
                  className="border black h-full rounded pl-[10px]"
                  placeholder="Create a project"
                />
              </div>
            </div>

            <div className="flex justify-between w-full h-[7vh] items-center">
              <span className="text-sm">Text</span>
              <div>icon</div>
            </div>

            <button className="bg-black w-full h-[7vh] text-white rounded-full">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="w-[30%] flex flex-col">
        <span className="text-2xl font-medium h-[16%]">Latest Member</span>

        <div className=" bg-white rounded-xl h-full">
          <div className="w-full h-full flex flex-col justify-center items-center">
            {memberData.map((value, index) => {
              return (
                <div className="flex w-full h-full items-center pl-[20px] gap-2 border-b-[1px] border-#dedede">
                  <div className="h-[60px] w-[60px] bg-[green] rounded-full"></div>

                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{value.name}</span>
                    <span className="text-sm">{value.designation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardComponent;
