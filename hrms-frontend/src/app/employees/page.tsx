"use client";
import { useEffect, useState } from "react";
import CustomTable from "@/components/CustomTable/CustomTable";
import { TableHeadiingForEmployee, employeedata } from "@/constants/constants";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { getAllUserData } from "@/services/user/slices/allUser/user";
import { useDispatch, useSelector } from "react-redux";
import { IconBan, IconCheck } from "@tabler/icons-react";
import EmployeeForm from "@/components/employeeSection/employeeCreateForm/EmployeeForm";
import { CustomModal } from "@/components/CustomModal/CustomModal";
import { useLazyGetAllDataApiByNameQuery } from "@/services/user/allApis/getUser";
import { manageUserSelector } from "@/services/user/slices/allUser/userSelector";
import { useUpdateDataApiByNameMutation } from "@/services/user/allApis/updateUser";
import { useDeleteDataApiByNameMutation } from "@/services/user/allApis/deleteUser";

export default function Employees() {
  const [search, setSearch] = useState("");
  const [allDataApi, { data, error, isLoading }] =
    useLazyGetAllDataApiByNameQuery();
  const [updateUserData, { data: userUpdatedData }] =
    useUpdateDataApiByNameMutation();
  const [deleteUserData, { data: userDeletedData }] =
    useDeleteDataApiByNameMutation();
  const { allUserData } = useSelector(manageUserSelector);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      page: 1,
      limit: 5,
    };
    allDataApi(params);
  }, []);
  useEffect(() => {
    if (data?.users.length > 0) {
      dispatch(getAllUserData(data?.users));
    }
  }, [data]);
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
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };
  const deleteModal = (row: any, data: any) => {
    const delete_id = row._id;
    console.log(delete_id, "userDeletedData");
    deleteUserData({
      owner_id: "66fa989f82603080b4a64da9",
      user_id: delete_id,
    });
  };
  const ActionContent = ({
    data,
    row,
  }: {
    data?: any;
    row?: any;
    editModal: (row: any) => void;
  }) => {
    const editModal = (row: any) => {
      open();
      form.setValues(row);
    };
    return (
      <div className="flex gap-2">
        <button
          onClick={() => editModal(row)}
          className=" flex items-center justify-center h-[35px] w-[35px] bg-[green] text-white cursor-pointer"
        >
          <IconCheck />
        </button>
        <button
          onClick={() => deleteModal(row, data)}
          className=" flex items-center justify-center h-[35px] w-[35px] bg-[red] text-white cursor-pointer"
        >
          <IconBan />
        </button>
      </div>
    );
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
  // const filterData = (data: any) => {
  //   return data.map((user: any) => ({
  //     fname: `${user.fname}`,
  //     lname: ` ${user.lname}`,
  //     email: user.email,
  //     role: user.role,
  //     department: user.department,

  //   }));
  // };
  return (
    <>
      <div className="flex justify-between items-center p-2 max-sm:flex-col-reverse max-sm:items-start">
        <div>My Team ({employeedata.length})</div>
        <div className="flex items-center gap-3 max-sm:w-full 2xl:w-[40%]">
          <div className="flex  lg:justify-end max-sm:w-[30%] max-sm:justify-between ">
            <CustomModal
              opened={opened}
              onClose={close}
              open={open}
              close={close}
              buttonlabel={"Add User"}
              modalTitle={"Apply for add user"}
              content={
                <>
                  <EmployeeForm
                    onClose={close}
                    form={form}
                    onHandelUpdate={onHandelUpdate}
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
      <CustomTable
        data={allUserData}
        headingdata={TableHeadiingForEmployee}
        showConfirmRejectButton={true}
        showDotIcon={false}
        opened={open}
        ActionContent={ActionContent}
        form={form}
      />
    </>
  );
}
