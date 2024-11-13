"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Loader } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
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
      <Box className="flex justify-center items-center p-4">
        <Loader color="blue" size="xl" />
      </Box>
    );
  }
  const viewIdData = projectData?.find(
    (value: any) => value._id === paramsProjectId
  );

  if (!viewIdData) {
    return (
      <Box className="flex flex-col justify-center items-center p-4">
        <IconMoodSad size={36} strokeWidth={1.5} color="grey" />
        <span>No project data found</span>
      </Box>
    );
  }
  const newData = viewIdData?.assigned_to.map((finalData: any) => {
    return <>{finalData?.fname ?? "N/A"}</>;
  });

  return (
    <div className="project-detail">
      <h1>Project: {viewIdData.name}</h1>
      <p>
        <strong>Assigned By:</strong> {viewIdData?.assigned_by?.fname}
      </p>
      <p>
        <strong>Assigned To:</strong> {newData ?? "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {viewIdData?.description}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {StringDateFormatConvertor(viewIdData?.start_date, "DD/MM/YYYY")}
      </p>
      <p>
        <strong>End Date:</strong>{" "}
        {StringDateFormatConvertor(viewIdData?.end_date, "DD/MM/YYYY")}
      </p>
    </div>
  );
};

export default ProjectDetail;
