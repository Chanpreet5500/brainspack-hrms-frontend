"use client";
import { useEffect, useState } from "react";
import { tableDataLimit } from "@/constants/constants";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { IconEdit, IconEye, IconMoodSad, IconTrash } from "@tabler/icons-react";

import { DataTable } from "mantine-datatable";

import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { Box, Button, Group, Loader, Tooltip } from "@mantine/core";
import ProjectForm from "@/containers/Project/ProjectForm";
import {
  useCreateProjectApiMutation,
  useDeleteProjectApiMutation,
  useLazyGetAllProjectByNameQuery,
  useUpdateProjectApiMutation,
} from "@/services/project/projectApi";
import { manageProjectSelector } from "@/redux/project/projectSelector";
import {
  DateFormatConvertor,
  StringDateFormatConvertor,
} from "@/utils/commonFunction";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { setAllproject, settotalProjects } from "@/redux/project/project";
interface ProjectData {
  _id?: string;
  name?: string;
  assigned_by?: string;
  assigned_to?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  fname?: string;
}
const initialState = {
  allProjects: [],
  totalProjects: 0,
};
export default function Projects() {
  const [editopened, { open: editopen, close: editclose }] =
    useDisclosure(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(startDate);
  const [projectData, setProjectData] = useState<ProjectData>({});
  const [loading, setLoading] = useState(true);
  const [createProject, { data, isSuccess }] = useCreateProjectApiMutation();
  const [search, setSearch] = useState("");
  const { allProjects, totalProjects } = useSelector(manageProjectSelector);

  const [currentpage, setCurrentPage] = useState(1);
  const [
    allProject,
    { data: allProjectData, error, isLoading, isSuccess: projectSuccess },
  ] = useLazyGetAllProjectByNameQuery();
  const [
    updateUserData,
    { data: userUpdatedData, isSuccess: updateUserSuccess },
  ] = useUpdateProjectApiMutation();
  const [
    deleteProjectData,
    { data: projectDeletedData, isSuccess: projectDeleteSuccess },
  ] = useDeleteProjectApiMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { authUser, authToken } = useSelector(manageAuthUserSelector);
  const handleOnClose = () => {
    close();
    form.reset();
  };

  useEffect(() => {
    if (allProjectData?.length && projectSuccess) {
      dispatch(setAllproject(allProjectData?.assigned_to));
      dispatch(settotalProjects(allProjectData?.length));
    }
  }, [allProjectData, authToken]);
  useEffect(() => {
    const params = {
      page: currentpage,
      limit: tableDataLimit,
      token: authToken,
    };
    if (authToken) {
      allProject(params);
    }
  }, [authToken, updateUserSuccess, projectDeleteSuccess]);
  useEffect(() => {
    setLoading(false);
  }, [allProjects?.length > 0]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = {
      page: page,
      limit: 10,
      token: authToken,
    };

    allProject(params);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSearch = event.target.value;
    setSearch(updatedSearch);
  };
  const viewProjectData = (row: any) => {
    console.log(row);
    return (
      <>
        <Link href={`/projects/${row}`} />
      </>
    );
  };
  const openModal = async (row: any) => {
    editopen();
    setProjectData(row);
  };
  const deleteModal = async (row: any) => {
    console.log(row, "deleteROW");
    const mydata = {
      isDeleted: true,
    };
    const response = await deleteProjectData({
      id: row._id,
      token: authToken,
    });
    notifications.show({
      color: "red",
      title: "Delete Successful",
      message: "Employee data deleted successfully",
    });
  };
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      assigned_by: "",
      name: "",
      assigned_to: "",
      description: "",
      start_date: startDate,
      end_date: endDate,
    },
    validate: {
      name: (value) => (value ? null : "Please select an employee."),
      assigned_to: (value) => (value ? null : "Please select an employee."),
      start_date: (value) =>
        DateFormatConvertor(value) ? null : "Please select the start date.",
      end_date: (value) =>
        DateFormatConvertor(value) ? null : "Please select the end date.",
    },
  });

  const triggerUpdate = async (row: any) => {
    console.log(row, "ROW");
    const updateProjectData = {
      project_id: row?._id,
      assigned_to: [row?.assigned_to?.[0]?._id],
      start_date: DateFormatConvertor(row.start_date),
      end_date: DateFormatConvertor(row.end_date),
      description: row.description,
    };
    try {
      const result = await updateUserData({
        data: updateProjectData,
        updatedById: authUser.userId,
        token: authToken,
      });
    } catch (error) {
      throw error;
    }
  };
  type AssignedTo = {
    _id: string;
    fname: string;
    lname: string;
  };
  type TableRow = {
    _id: string;
    name?: string;
    assigned_to?: AssignedTo[];
    assigned_by?: AssignedTo[];
    description?: string;
    start_date?: any;
    end_date?: any;
  };

  const records: any[] = allProjects?.slice(
    (currentpage - 1) * tableDataLimit,
    currentpage * tableDataLimit
  );
  const columns = [
    {
      accessor: "id",
      title: "S.No.",
      width: "5%",
      render: (record: any, index: number) =>
        (currentpage - 1) * tableDataLimit + index + 1,
    },

    { accessor: "name", width: "12%" },
    {
      accessor: "assigned_by ",
      width: "12%",
      render: (data: any) => {
        return <>{data.assigned_by?.fname}</>;
      },
    },
    {
      accessor: "assigned_to ",
      width: "12%",
      render: (data: any) => {
        if (data?.assigned_to && data.assigned_to.length > 0) {
          const firstTwoNames = data.assigned_to
            .slice(0, 2)
            .map((finalData: any) => finalData?.fname ?? "N/A");
          const remainingCount = data.assigned_to.length - 2;
          const remainingNames = data.assigned_to.slice(
            2,
            data.assigned_to.length
          );

          let overallLength = remainingNames[remainingNames.length - 1];
          let stringForNames = "";
          remainingNames.map((ele: any) => {
            if (ele.fname === overallLength) {
              stringForNames += ele.fname;
            } else {
              stringForNames += ele.fname + " , ";
            }
          });

          return (
            <>
              {firstTwoNames.join(", ")}
              {remainingCount > 0 && (
                <Tooltip label={stringForNames}>
                  <span className="more-info" style={{ color: "gray" }}>
                    (+{remainingCount} more)
                  </span>
                </Tooltip>
              )}
            </>
          );
        }
        return "N/A";
      },
    },

    {
      accessor: "start_date",
      width: "20%",
      render: (data: any) => {
        const formattedDate = StringDateFormatConvertor(
          data.start_date,
          "DD/MM/YYYY"
        );
        return <>{formattedDate}</>;
      },
    },

    {
      accessor: "end_date ",
      width: "20%",
      render: (data: any) => {
        const formattedDate = StringDateFormatConvertor(
          data.end_date,
          "DD/MM/YYYY"
        );
        return <>{formattedDate}</>;
      },
    },

    {
      accessor: "Action",
      width: "20%",
      render: (data: TableRow) => {
        const editModal = (row: TableRow) => {
          console.log(data, row, "DATA");
          open();
          form.setValues({
            name: row?.name,
            description: row?.description,
            start_date: row?.start_date,
            end_date: row?.end_date,
            assigned_to: row?.assigned_to?.[0]?._id ?? "",
          });
        };
        return (
          <div className="flex justify-center gap-2">
            <button onClick={() => editModal(data)}>
              <IconEdit className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
            </button>
            <button onClick={() => openModal(data)}>
              <IconTrash className="h-[25px] w-[25px] text-red-500 cursor-pointer" />
            </button>
            <Link
              href={{
                pathname: `/projects/${data._id}`,
              }}
              passHref
            >
              <IconEye className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className=" customDiv flex justify-between items-center p-2 max-sm:flex-col-reverse max-sm:items-start">
        <div>My Projects ({totalProjects})</div>
        <div className="flex items-center gap-3 max-sm:w-full 2xl:w-[30%] parentDiv">
          <div className=" max-sm:w-full">
            <Searchbar
              value={search}
              handleSearch={handleSearchChange}
              placeholder="Search"
              iconcolor="#9ca3af"
            />
          </div>
          <div className="flex  lg:justify-end max-sm:w-[30%] max-sm:justify-between ">
            <CustomModal
              size={"md"}
              opened={opened}
              open={open}
              close={handleOnClose}
              buttonlabel={"Add Project"}
              modalTitle={"Apply for add Project"}
              showButton={true}
              content={
                <>
                  <ProjectForm
                    triggerUpdate={triggerUpdate}
                    authUser={authUser}
                    onClose={close}
                    form={form}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    token={authToken}
                    triggerCreate={createProject}
                    createSuccess={isSuccess}
                  />
                </>
              }
            />
          </div>
        </div>
      </div>

      {loading ? (
        <Box className="flex justify-center items-center p-4">
          <Loader color="blue" size="xl" />
        </Box>
      ) : allProjectData?.length > 0 ? (
        <DataTable
          height={300}
          records={allProjectData}
          withTableBorder
          highlightOnHover
          totalRecords={totalProjects}
          recordsPerPage={tableDataLimit}
          page={currentpage}
          onPageChange={(p) => handlePageChange(p)}
          emptyState={
            totalProjects ? (
              <></>
            ) : (
              <>
                <Box p={4} mb={4}>
                  <IconMoodSad size={36} strokeWidth={1.5} />
                  No data
                </Box>
              </>
            )
          }
          columns={columns}
        />
      ) : (
        <Box className="flex flex-col justify-center items-center p-4">
          <IconMoodSad size={36} strokeWidth={1.5} color="grey" />
          <span>No Data Available</span>
        </Box>
      )}
      <CustomModal
        opened={editopened}
        open={editopen}
        size={"lg"}
        showButton={false}
        close={editclose}
        modalTitle={`Are you sure you want to delete this project: ${projectData?.name}`}
        bgcolor={"transparent"}
        content={
          <div className="flex gap-3 flex-col">
            <h3>This will also delete projects!</h3>
            <Group justify="flex-end">
              <Button
                variant="filled"
                onClick={() => {
                  editclose();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                color="red"
                onClick={() => {
                  deleteModal(projectData);
                  editclose();
                }}
              >
                Delete
              </Button>
            </Group>
          </div>
        }
      ></CustomModal>
    </>
  );
}
