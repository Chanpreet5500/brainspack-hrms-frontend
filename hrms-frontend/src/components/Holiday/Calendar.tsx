"use client"
import { getAllholidayData } from '@/redux/holiday/holiday';
import { manageHolidaySelector } from '@/redux/holiday/holidaySelector';
import { useCreateHolidayMutation, useDeleteHolidayDataApiByNameMutation, useLazyGetAllHolidayDataApiByNameQuery, useUpdateHolidayDataApiByNameMutation } from '@/services/holiday/holidayApi';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Button, Group, MantineProvider, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomModal } from '../reusableComponents/CustomModal/CustomModal';
import { useForm } from '@mantine/form';
import TextInputField from '../Inputs/textInput/Input';
import SelectInputField from '../Inputs/selectInput/Select';
import { employeProfetion, holidayType } from '@/constants/constants';
import HolidayForm from './HolidayForm';
const Calendar = () => {
    const [postData, { data: addData, isSuccess: createSuccess, isError }] = useCreateHolidayMutation();
    const [allDataApi, { data, error, isLoading, isSuccess }] = useLazyGetAllHolidayDataApiByNameQuery();
    const [updateHolidayData, { data: holidayUpdatedData, isSuccess: updateSuccess }] = useUpdateHolidayDataApiByNameMutation()
    const [deleteHolidayData, { isSuccess: deleteSuccess }] = useDeleteHolidayDataApiByNameMutation()
    const dispatch = useDispatch();
    const { allData } = useSelector(manageHolidaySelector);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        onGetData()
    }, [createSuccess, updateSuccess, deleteSuccess])

    const onGetData = async () => {
        const response = await allDataApi("d")
        dispatch(getAllholidayData(response.data))
    }

    const handleOnClose = () => {
        close();
        form.reset()
    };
    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            type: "",
            title: "",
            description: "",
            date: ""
        },
        validate: {
            title: (value) => {
                if (!value) {
                    return "Field is required";
                }
                if (value.length < 5) {
                    return "title should be at least 5 letters";
                } else {
                    return value.length > 20 ? "title should not exceed 20 letters" : null;
                }
            },

            description: (value) => {
                if (!value) {
                    return "Field is required";
                }
                if (value.length < 5) {
                    return "description should be at least 5 letters";
                } else {
                    return value.length > 50 ? "Decription should not exceed 50 letters" : null;
                }
            },
            type: (value) => (value ? null : "Select field is required"),
        },
    });
    const handleEventClick = (eventInfo: any) => {
        const data = {
            holiday_id: eventInfo.event.id,
            title: eventInfo.event.title,
            description: eventInfo.event.extendedProps.description,
            type: eventInfo.event.extendedProps.type,
            date: eventInfo.event.startStr
        }
        form.setValues(data);
        open()

    }
    const handleDateSelect = async (selectInfo: any) => {
        form.setValues({ date: selectInfo.startStr });
        open()
    };

    const renderEventContent = (eventInfo: any) => {
        const data = {
            id: eventInfo.event.id,
            title: eventInfo.event.title,
            description: eventInfo.event.extendedProps.description,
            type: eventInfo.event.extendedProps.type
        }
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
                    <div className="flex  lg:justify-end max-sm:w-[30%] max-sm:justify-between ">
                        <CustomModal
                            opened={opened}
                            open={open}
                            close={handleOnClose}
                            buttonlabel={""}
                            modalTitle={"Add Holiday"}
                            showButton={false}
                            content={
                                <HolidayForm
                                    form={form}
                                    triggerUpdate={updateHolidayData}
                                    triggerCreate={postData}
                                    triggerDelete={deleteHolidayData}
                                    modalClose={close}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"

                events={allData?.map((holiday: any) => ({
                    id: holiday._id,
                    title: holiday.title,
                    start: new Date(holiday.date).toISOString().split('T')[0],
                    type: holiday.type,
                    description: holiday.description,

                }))}
                // eventBackgroundColor="transparent"
                eventTextColor="#000"
                selectable
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                height={600}
            />
        </>
    )
}
export default Calendar;