const DashboardComponent = () => {
  const dummy = [
    {
      title: "One",
      count: 1,
      icon: "A",
      color: "blue",
    },
    {
      title: "Two",
      count: 2,
      icon: "B",
      color: "green",
    },
    {
      title: "Three",
      count: 3,
      icon: "C",
      color: "orange",
    },
    {
      title: "Four",
      count: 4,
      icon: "D",
      color: "yellow",
    },
  ];

  return (
    <div class="flex h-[50vh]">
      <div class="w-full bg-white flex flex-wrap items-center justify-center content-center gap-5">
        {dummy.map((value, index) => {
          return (
            <div
              class="h-[20vh] w-[45%] rounded-lg flex flex-col items-center justify-center"
              key={index}
              style={{backgroundColor: value.color}}>
              <div class="w-[85%] flex flex-start flex-col gap-3">
                <div class="text-lg flex w-[10%] items-center justify-center bg-[grey] rounded-full">
                  {value.icon}
                </div>
                <div class="flex w-[85%]">
                  <div class="flex flex-col w-1/2 text-black">
                    <div>{value.title}</div>
                    <div>{value.count}</div>
                  </div>
                  <span class="text-black w-1/2 flex justify-end items-end">
                    TEXT
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div class="w-full bg-[red] items-center flex flex-col justify-ceneter">
        <div class='text-black text-lg'>Nov 11, 2024</div>
        <div class='w-[90%] flex flex-col items-center justify-center gap-3'>
            <div class='flex flex-col text-black w-full'>
                <label for='project' class=''>Project</label>
                <input name='project' class='border black h-[8vh] rounded' placeholder="Create a project"/>
            </div>

            <div class='flex w-full gap-3 '>

            <div class='flex text-black flex w-full flex-col' >
                <label for='task' class=''>Task</label>
                <input name='task' class='border black h-[8vh] rounded' placeholder="Create a project"/>
            </div>
            <div class='text-black flex w-full flex-col'>
                <label for='hours' class=''>Hours</label>
                <input name='hours' class='border black h-[8vh] rounded' placeholder="Create a project"/>
            </div>

            </div>
            <button class='bg-black w-full h-[8vh] rounded-full'>Save</button>
        </div>
      </div>
      <div class="w-full bg-[blue]"></div>
    </div>
  );
};
export default DashboardComponent;
