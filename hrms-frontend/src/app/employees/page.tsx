"use client";
import { useEffect, useState } from "react";
import { tableDataLimit } from "@/constants/constants";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import {
  IconEdit,
  IconLock,
  IconLockOpen,
  IconTrash,
} from "@tabler/icons-react";
import EmployeeForm from "@/components/employeeSection/employeeCreateForm/EmployeeForm";
import { DataTable } from "mantine-datatable";
import {
  useCreateUserMutation,
  useDeleteDataApiByNameMutation,
  useLazyGetAllDataApiByNameQuery,
  useUpdateDataApiByNameMutation,
} from "@/services/user/usersApi";
import { manageUserSelector } from "@/redux/user/userSelector";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import { getAllUserData, setUserDataLength } from "@/redux/user/user";

export default function Employees() {
  const [postData, { data: addData, isSuccess: createSuccess, isError }] =
    useCreateUserMutation();
  const [search, setSearch] = useState("");

  const [currentpage, setCurrentPage] = useState(1);
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
  const handleOnClose = () => {
    close();
    form.reset();
  };
  useEffect(() => {
    console.log("hello");
    if (data?.users.length > 0 && isSuccess) {
      dispatch(getAllUserData(data?.users));
      dispatch(setUserDataLength(data.totalusers));
    }
  }, [data, isSuccess]);
  const renderData = async (
    currpage: number,
    limit: number,
    search: string
  ) => {
    const response = await allDataApi({
      page: currpage,
      limit: limit,
      search: search,
    });
  };
  useEffect(() => {
    renderData(currentpage, tableDataLimit, search);
  }, [currentpage, updateUserSuccess, deleteSuccess, createSuccess]);
  const onHandelUpdate = async (row: any) => {
    const mydata = {
      department: row.department,
      role: row.role,
      fname: row.fname,
      lname: row.lname,
      email: row.email,
    };
    const result = await updateUserData({
      user_id: row._id,
      data: mydata,
      owner_id: "66fa989f82603080b4a64da9",
    });

    const params = {
      page: 1,
      limit: 5,
    };
    await allDataApi(params);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page, "page");
    const params = {
      page: page,
      limit: 5,
    };
    allDataApi(params);
    renderData(page, tableDataLimit, search);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };
  const deleteModal = async (row: any) => {
    const mydata = {
      isDeleted: true,
    };
    const response = await deleteUserData({
      owner_id: "66fa989f82603080b4a64da9",
      user_id: row._id,
    });
  };
  const updateStatus = async (row: any) => {
    const mydata = {
      isActive: !row.isActive,
    };

    const result = await updateUserData({
      user_id: row._id,
      data: mydata,
      owner_id: "66fa989f82603080b4a64da9",
    });
  };

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      role: "",
      department: "",
    },
    validate: {
      fname: (value) => {
        if (!value) {
          return "Field is required";
        }
        if (value.length < 3) {
          return "Name should be at least 3 letters";
        } else {
          return value.length > 50 ? "Name should not exceed 50 letters" : null;
        }
      },

      lname: (value) => {
        if (!value) {
          return "Field is required";
        }
        if (value.length < 3) {
          return "Name should be at least 3 letters";
        } else {
          return value.length > 50 ? "Name should not exceed 50 letters" : null;
        }
      },
      email: (value) => {
        if (!value) {
          return "Field is required";
        } else {
          return /^\S+@\S+$/.test(value) ? null : "Invalid email";
        }
      },
      role: (value) => (value ? null : "Select field is required"),
      department: (value) => (value ? null : "Select field is required"),
    },
  });

  type TableRow = {
    id: number;
    fname: string;
    lname: string;
    email: string;
    role: string;
    department: string;
    status: string;
    isActive: boolean;
    columns?: [];
  };
  const records: any[] = allUserData?.slice(
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

    { accessor: "fname", width: "15%" },
    { accessor: "lname", width: "15%" },
    { accessor: "email", width: "22%" },
    { accessor: "role", width: "12%" },
    { accessor: "department", width: "12%" },
    {
      accessor: "status",
      width: "15%",
      render: (data: TableRow) => {
        return <div>{data.isActive ? "Active" : "Inactive"}</div>;
      },
    },
    {
      accessor: "Action",
      width: "20%",
      render: (data: TableRow) => {
        const editModal = (row: TableRow) => {
          open();
          form.setValues(row);
        };
        return (
          <div className="flex gap-2">
            <button onClick={() => editModal(data)}>
              <IconEdit className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
            </button>
            <button onClick={() => deleteModal(data)}>
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
      <div className="flex justify-between items-center p-2 max-sm:flex-col-reverse max-sm:items-start">
        <div>My Team ({allUserDataLength})</div>
        <div className="flex items-center gap-3 max-sm:w-full 2xl:w-[40%]">
          <div className="flex  lg:justify-end max-sm:w-[30%] max-sm:justify-between ">
            <CustomModal
              opened={opened}
              open={open}
              close={handleOnClose}
              buttonlabel={"Add User"}
              modalTitle={"Apply for add user"}
              content={
                <>
                  <EmployeeForm
                    onClose={handleOnClose}
                    form={form}
                    onHandelUpdate={onHandelUpdate}
                    createTrigger={postData}
                  />
                </>
              }
            />
          </div>
          <div className=" max-sm:w-full">
            <Searchbar
              value={search}
              handleSearch={handleSearchChange}
              placeholder="Search"
              iconcolor="#9ca3af"
              classname=""
            />
          </div>
        </div>
      </div>
      <DataTable
        height={300}
        records={[...allUserData]}
        withTableBorder
        highlightOnHover
        totalRecords={allUserDataLength}
        recordsPerPage={tableDataLimit}
        page={currentpage}
        onPageChange={(p) => handlePageChange(p)}
        emptyState={allUserData.length ? <></> : <>no data</>}
        columns={columns}
      />
    </>
  );
}
