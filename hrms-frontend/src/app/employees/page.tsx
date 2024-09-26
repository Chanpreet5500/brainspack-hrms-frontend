"use client";
import { useState } from "react";
import { keys, Button, Modal } from "@mantine/core";
import CustomTable from "@/components/CustomTable/CustomTable";
import { TableHeadiingForEmployee, employeedata } from "@/constants/constants";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useDisclosure } from "@mantine/hooks";
import UserForm from "@/components/modal/page";

interface RowData {
  name: string;
  email: string;
  designation: string;
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

export default function Employees() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(employeedata);

  const [opened, { open, close }] = useDisclosure(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setFilteredData(filterData(employeedata, value));
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 max-sm:flex-col-reverse max-sm:items-start">
        <div>My Team ({employeedata.length})</div>
        <div className="flex items-center gap-3 max-sm:w-full 2xl:w-[40%]">
          <div className="flex  lg:justify-end max-sm:w-[30%] max-sm:justify-between ">
            <Button onClick={open} className="max-sm:!w-full !rounded-full">
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
          <UserForm onClose={close} />
        </Modal>
      </div>
      <CustomTable
        data={filteredData}
        headingdata={TableHeadiingForEmployee}
        showConfirmRejectButton={false}
        showDotIcon={true}
      />
    </>
  );
}
