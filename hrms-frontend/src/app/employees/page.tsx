"use client";
import { manageUserSelector } from "@/redux/user/userSelector";
import { getAllUserData, setUserDataLength } from "@/redux/user/user";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useForm, yupResolver } from "@mantine/form";
import { DataTable } from "mantine-datatable";
import { Box, Button, Group, Loader } from "@mantine/core";
import { tableDataLimit } from "@/constants/constants";
import Searchbar from "@/components/Searchbar/Searchbar";
import {
  IconEdit,
  IconLock,
  IconLockOpen,
  IconMoodSad,
  IconTrash,
} from "@tabler/icons-react";

import {
  useCreateUserMutation,
  useDeleteDataApiByNameMutation,
  useLazyGetAllDataApiByNameQuery,
  useUpdateDataApiByNameMutation,
} from "@/services/user/usersApi";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import EmployeeForm from "@/containers/Employee/EmployeeForm";
import { employeeValidationSchema } from "./validationSchema";

// Define Types for Employee Data and API Responses
interface Employee {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  role: string;
  department: string;
  phoneNumber: string;
  isActive: boolean;
}

interface UserDataResponse {
  users: Employee[];
  totalusers: number;
}

interface FormValues {
  fname: string;
  lname: string;
  email: string;
  role: string;
  department: string;
  phoneNumber: string;
}

export default function Employees() {
  const [editopened, { open: editopen, close: editclose }] =
    useDisclosure(false);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [postData, { data: addData, isSuccess: createSuccess, isError }] =
    useCreateUserMutation();
  const [search, setSearch] = useState<string>("");

  const [currentpage, setCurrentPage] = useState<number>(1);
  const [allDataApi, { data, error, isLoading, isSuccess }] =
    useLazyGetAllDataApiByNameQuery();
  const [
    updateUserData,
    { data: userUpdatedData, isSuccess: updateUserSuccess },
  ] = useUpdateDataApiByNameMutation();
  const [deleteUserData, { data: userDeletedData, isSuccess: deleteSuccess }] =
    useDeleteDataApiByNameMutation();
  const { allUserDataLength, allUserData } = useSelector(manageUserSelector);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { authUser, authToken } = useSelector(manageAuthUserSelector);

  const handleOnClose = () => {
    close();
    form.reset();
  };

  useEffect(() => {
    if (data?.users.length > 0 && isSuccess) {
      dispatch(getAllUserData(data?.users));
      dispatch(setUserDataLength(data.totalusers));
    }
  }, [data, isSuccess, authToken, authUser]);

  const renderData = async (
    currpage: number,
    limit: number,
    search: string
  ) => {
    if (authToken) {
      const response = await allDataApi({
        page: currpage,
        limit: limit,
        search: search,
        token: authToken,
      });
    }
  };

  // Update User Data
  const onHandelUpdate = async (row: Employee) => {
    const mydata = {
      fname: row?.fname,
      lname: row?.lname,
      email: row?.email,
      phoneNumber: row?.phoneNumber,
      role: row?.role,
      department: row?.department,
    };
    try {
      const result = await updateUserData({
        user_id: row._id,
        data: mydata,
        owner_id: authUser?.userId,
        token: authToken,
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [allUserData.length > 0]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = {
      page: page,
      limit: 10,
      token: authToken,
    };

    allDataApi(params);
    renderData(page, tableDataLimit, search);
  };

  useEffect(() => {
    renderData(currentpage, tableDataLimit, search);
  }, [currentpage, updateUserSuccess, deleteSuccess, createSuccess, authToken]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSearch = event.target.value;
    setSearch(updatedSearch);
    renderData(currentpage, tableDataLimit, updatedSearch);
  };

  const openModal = async (row: Employee) => {
    editopen();
    setEmployeeData(row);
  };

  const deleteModal = async (row: Employee) => {
    const mydata = {
      isDeleted: true,
    };
    const response = await deleteUserData({
      owner_id: authUser?.userId,
      user_id: row._id,
      token: authToken,
    });
    notifications.show({
      color: "red",
      title: "Delete Successful",
      message: "Employee data deleted successfully",
    });
  };

  const updateStatus = async (row: Employee) => {
    const mydata = {
      isActive: !row.isActive,
    };

    const result = await updateUserData({
      user_id: row._id,
      data: mydata,
      owner_id: authUser?.userId,
      token: authToken,
    });
  };

  const form = useForm<FormValues>({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      role: "",
      department: "",
      phoneNumber: "",
    },

    validate: yupResolver(employeeValidationSchema),
  });

  const records: Employee[] = allUserData?.slice(
    (currentpage - 1) * tableDataLimit,
    currentpage * tableDataLimit
  );

  const columns = [
    {
      accessor: "id",
      title: "S.No.",
      width: "5%",
      render: (record: Employee, index: number) =>
        (currentpage - 1) * tableDataLimit + index + 1,
    },

    { accessor: "fname", width: "12%" },
    { accessor: "lname", width: "12%" },
    { accessor: "email", width: "12%" },
    { accessor: "phoneNumber", width: "12%" },
    { accessor: "role", width: "12%" },
    { accessor: "department", width: "12%" },
    {
      accessor: "status",
      width: "12%",
      render: (data: Employee) => {
        return <div>{data.isActive ? "Active" : "Inactive"}</div>;
      },
    },
    {
      accessor: "Action",
      width: "20%",
      render: (data: Employee) => {
        const editModal = (row: Employee) => {
          open();
          form.setValues(row);
        };
        return (
          <div className="flex gap-2">
            <button onClick={() => editModal(data)}>
              <IconEdit className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
            </button>
            <button onClick={() => openModal(data)}>
              <IconTrash className="h-[25px] w-[25px] text-red-500 cursor-pointer" />
            </button>
            {data.isActive ? (
              <button onClick={() => updateStatus(data)}>
                <IconLockOpen className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
              </button>
            ) : (
              <button onClick={() => updateStatus(data)}>
                <IconLock className="h-[25px] w-[25px] text-red-500 cursor-pointer" />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className=" customDiv flex justify-between items-center p-2 max-sm:flex-col-reverse max-sm:items-start">
        <div>My Team ({allUserDataLength})</div>
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
              buttonlabel={"Add User"}
              modalTitle={"Apply for add user"}
              showButton={true}
              content={
                <EmployeeForm
                  onClose={handleOnClose}
                  form={form}
                  onHandelUpdate={onHandelUpdate}
                  createTrigger={postData}
                  token={authToken}
                  createSuccess={createSuccess}
                />
              }
            />
          </div>
        </div>
      </div>
      {loading ? (
        <Box className="flex justify-center items-center p-4">
          <Loader color="blue" size="xl" />
        </Box>
      ) : allUserData.length > 0 ? (
        <DataTable
          height={300}
          records={[...allUserData]}
          withTableBorder
          highlightOnHover
          totalRecords={allUserDataLength}
          recordsPerPage={tableDataLimit}
          page={currentpage}
          onPageChange={(p) => handlePageChange(p)}
          emptyState={allUserDataLength ? <></> : <></>}
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
        modalTitle={
          <>
            Are you sure you want to delete employee:
            <span className="font-medium text-[20px]">
              {employeeData?.fname}
            </span>
          </>
        }
        bgcolor={"transparent"}
        content={
          <div className="flex gap-3 flex-col">
            <h3>This will also delete leave balance!</h3>
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
                  deleteModal(employeeData!);
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
