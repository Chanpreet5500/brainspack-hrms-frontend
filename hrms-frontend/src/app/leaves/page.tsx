"use client";
import {ReactElement, useState} from "react";
import {Button, ComboboxItem, Select, Textarea, keys} from "@mantine/core";
import Searchbar from "@/components/Searchbar/Searchbar";
import {TableHeadiingForLeaves, employeedata} from "@/constants/constants";
import CustomTable from "@/components/CustomTable/CustomTable";
import {CustomModal} from "@/components/CustomModal/CustomModal";
import {DatePickerComponent} from "@/components/CustomDatePicker/CustomDatePicker";

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

export default function LeaveComponent() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState<ComboboxItem | null>(null);

  const [filteredData, setFilteredData] = useState(employeedata);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.currentTarget;
    setSearch(value);
    setFilteredData(filterData(employeedata, value));
  };
  return (
    <>
      <div className="flex justify-between p-2 max-sm:flex-col-reverse">
        <div>My Team ({employeedata.length})</div>
        <div className="flex gap-1 items-center w-[32%] max-sm:w-full">
          {/* <Button>Add Leave</Button> */}
          <CustomModal
            buttonlabel={"Add Leave"}
            modalTitle={"Apply for Leave"}
            content={
              <div className="flex flex-col gap-4">
                <Select
                  label="Reason"
                  data={[{value: "react", label: "React library"}]}
                  placeholder="Click to Select"
                  value={value ? value.value : null}
                  onChange={(_value, option) => setValue(option)}
                />

                <div className="flex gap-4">
                  <DatePickerComponent datePickerLabel={"Start Date"} />
                  <DatePickerComponent datePickerLabel={"End Date"} />
                </div>

                <Textarea
                  resize="vertical"
                  placeholder="Leave Reason*"
                />
              </div>
            }
          />

          <Searchbar
            value={search}
            handleSearch={handleSearchChange}
            placeholder="Search"
            iconcolor="#9ca3af"
            classname=""
          />
        </div>
      </div>
      <CustomTable
        data={filteredData}
        headingdata={TableHeadiingForLeaves}
        showConfirmRejectButton={true}
        showDotIcon={false}
      />
    </>
  );
}
