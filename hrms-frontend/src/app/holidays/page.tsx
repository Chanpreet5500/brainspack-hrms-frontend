"use client";
import { getAllholidayData, trackChange } from "@/redux/holiday/holiday";
import { manageHolidaySelector } from "@/redux/holiday/holidaySelector";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllHolidayDataApiByNameQuery } from "@/services/holiday/holidayApi";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import "./holiday.css";
import { HolidayFormData } from "@/utils/interfaces/interfaces";
import {
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core/index.js";
import HolidayForm from "@/containers/Holiday/HolidayForm";

import { holidaySchema } from "./holidaySchema";
interface Holiday {
  _id: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

const Calendar = () => {
  const [allDataApi, { data, error, isLoading, isSuccess }] =
    useLazyGetAllHolidayDataApiByNameQuery();
  const dispatch = useDispatch();
  const { allData, change } = useSelector(manageHolidaySelector);
  const [opened, { open, close }] = useDisclosure(false);
  const { authToken } = useSelector(manageAuthUserSelector);

  useEffect(() => {
    if (authToken) {
      onGetData();
    }
  }, [authToken, change]);

  const onGetData = async () => {
    const response = await allDataApi({ token: authToken });
    dispatch(getAllholidayData(response.data));
    dispatch(trackChange(false));
  };

  const handleOnClose = () => {
    close();
    form.reset();
  };

  const form = useForm<HolidayFormData>({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      type: "",
      title: "",
      description: "",
      date: "",
    },
    validate: yupResolver(holidaySchema),
  });

  const handleEventClick = (eventInfo: EventClickArg) => {
    const data = {
      holiday_id: eventInfo.event.id,
      title: eventInfo.event.title,
      description: eventInfo.event.extendedProps.description,
      type: eventInfo.event.extendedProps.type,
      date: eventInfo.event.start
        ? eventInfo.event.start.toISOString()
        : undefined,
    };
    form.setValues(data);
    open();
  };

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    form.setValues({ date: selectInfo.start.toISOString() });
    open();
  };

  const renderEventContent = (eventInfo: { event: EventApi }) => {
    return (
      <Tooltip
        multiline
        withArrow
        position="bottom"
        label={eventInfo.event.extendedProps.description}
        offset={{ mainAxis: 5, crossAxis: 0 }}
      >
        <p>{eventInfo.event.title}</p>
      </Tooltip>
    );
  };

  return (
    <>
      <div className="flex justify-end items-center p-2 max-sm:flex-col-reverse max-sm:items-start">
        <div className="flex items-center gap-3 max-sm:w-full 2xl:w-[40%]">
          <div className="flex lg:justify-end max-sm:w-[30%] max-sm:justify-between">
            <CustomModal
              opened={opened}
              open={open}
              close={handleOnClose}
              buttonlabel={""}
              modalTitle={"Add Holiday"}
              showButton={false}
              content={<HolidayForm form={form} modalClose={close} />}
            />
          </div>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={allData?.map((holiday: Holiday) => ({
          id: holiday._id,
          title: holiday.title,
          start: new Date(holiday.date).toISOString().split("T")[0],
          type: holiday.type,
          description: holiday.description,
        }))}
        eventTextColor="#000"
        selectable
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        height={600}
      />
    </>
  );
};

export default Calendar;
