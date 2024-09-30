"use client";
import { useState } from "react";
import { keys, Button, Modal } from "@mantine/core";
import CustomTable from "@/components/CustomTable/CustomTable";
import { TableHeadiingForEmployee, employeedata } from "@/constants/constants";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useDisclosure } from "@mantine/hooks";
import UserForm from "@/components/modal/page";
import { useForm } from "@mantine/form";
import { updateSelectedMode } from "@/services/user/slices/allUser/user";
import { useDispatch } from "react-redux";
import { IconBan, IconCheck } from "@tabler/icons-react";

interface RowData {
  id?: number;
  fname: string;
  lname: string;
  email: string;
  role: string;
  department: string;
}

export default function Employees() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(employeedata);

  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const handleOpenModal = () => {
    open();
    form.reset();
    dispatch(updateSelectedMode("add"));
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

  console.log(form.getValues(), "JJ");
  const editModal = (row) => {
    console.log('this is the edit')
    open();
    form.setValues(row);
  };
  const ActionContent = ({ row, editModal }: { row: any; editModal: (row: any) => void }) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => editModal(row)}
          className=" flex items-center justify-center h-[35px] w-[35px] bg-[green] text-white cursor-pointer">
          <IconCheck />
        </button>
        <button className=" flex items-center justify-center h-[35px] w-[35px] bg-[red] text-white cursor-pointer">
          <IconBan />
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center p-2 max-sm:flex-col-reverse max-sm:items-start">
        <div>My Team ({employeedata.length})</div>
        <div className="flex items-center gap-3 max-sm:w-full 2xl:w-[40%]">
          <div className="flex  lg:justify-end max-sm:w-[30%] max-sm:justify-between ">
            <Button
              onClick={handleOpenModal}
              className="max-sm:!w-full !rounded-full"
            >
              Add
            </Button>
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

        <Modal
          opened={opened}
          onClose={close}
          className="flex justify-center"
          title="User Form"
        >
          <UserForm onClose={close} form={form} />
        </Modal>
      </div>
      <CustomTable
        data={filteredData}
        headingdata={TableHeadiingForEmployee}
        showConfirmRejectButton={true}
        showDotIcon={false}
        opened={open}
        form={form}
        editModal={editModal}
        ActionContent={ActionContent}
      />
    </>
  );
}
