"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Loader, Button } from "@mantine/core";
import { IconMoodSad, IconChevronLeft } from "@tabler/icons-react";
import { StringDateFormatConvertor } from "@/utils/commonFunction";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { useSelector } from "react-redux";
import { useLazyGetAllProjectByNameQuery } from "@/services/project/projectApi";

const ProjectDetail = (props: any) => {
  const router = useRouter();
  const { id: paramsProjectId } = props.params;
  const { authUser, authToken } = useSelector(manageAuthUserSelector);

  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [getProjectById, { data, error, isLoading }] =
    useLazyGetAllProjectByNameQuery();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const id = props?.searchParams?._id;
      const params = {
        id: id as string,
        token: authToken,
      };

      getProjectById(params);
    }
  }, [isClient, authToken]);

  useEffect(() => {
    if (data) {
      setProjectData(data);
      setLoading(false);
    }
    if (error) {
      console.error("Error fetching project data:", error);
      setLoading(false);
    }
  }, [data, error]);

  if (isLoading || loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Loader color="blue" size="xl" />
      </Box>
    );
  }

  const viewIdData = projectData?.find(
    (value: any) => value._id === paramsProjectId
  );

  if (!viewIdData) {
    return (
      <Box className="flex flex-col justify-center items-center h-screen">
        <IconMoodSad size={36} strokeWidth={1.5} color="grey" />
        <span className="text-gray-600 text-lg mt-4">
          No project data found
        </span>
      </Box>
    );
  }

  const newData = viewIdData?.assigned_to.map((finalData: any) => {
    return <>{finalData?.fname ?? "N/A"}</>;
  });

  return (
    <>
      <div className="flex justify-between items-center h-[100px] pl-9">
        <Button
          variant="light"
          color="blue"
          onClick={() => router.back()}
          className="transition-transform hover:scale-105 flex items-center space-x-2 pl-4 md:pl-6"
        >
          <IconChevronLeft size={16} />
          <span className="hidden sm:inline">Go Back</span>{" "}
        </Button>
      </div>

      <div className="flex flex-col bg-gray-100 h-[400px] justify-evenly py-6">
        <div className="flex flex-col md:flex-row justify-evenly items-start space-y-6 md:space-y-0 ">
          <Box className="w-full md:w-[30%] bg-white p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h3 className="font-bold text-xl text-blue-600">Project</h3>
            <h2 className="text-2xl text-gray-800">{viewIdData.name}</h2>
          </Box>

          <Box className="w-full md:w-[30%] bg-white p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h3 className="font-bold text-xl text-blue-600">Description</h3>
            <p className="text-gray-600">{viewIdData?.description}</p>
          </Box>

          <Box className="w-full md:w-[30%] bg-white p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h3 className="font-bold text-xl text-blue-600">Assigned By</h3>
            <p className="text-gray-800">{viewIdData?.assigned_by?.fname}</p>
          </Box>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly items-start space-y-6 md:space-y-0 ">
          <Box className="w-full md:w-[30%] bg-white p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h3 className="text-blue-600 font-bold text-xl break-words">
              Assigned To
            </h3>
            <p className="text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap">
              {newData ?? "N/A"}
            </p>
          </Box>

          <Box className="w-full md:w-[30%] bg-white p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h3 className="font-bold text-xl text-blue-600">Start Date</h3>
            <p className="text-gray-800">
              {StringDateFormatConvertor(viewIdData?.start_date, "DD/MM/YYYY")}
            </p>
          </Box>

          <Box className="w-full md:w-[30%] bg-white p-6 rounded-lg shadow-md transition-all hover:scale-105">
            <h3 className="font-bold text-xl text-blue-600">End Date</h3>
            <p className="text-gray-800">
              {StringDateFormatConvertor(viewIdData?.end_date, "DD/MM/YYYY")}
            </p>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
