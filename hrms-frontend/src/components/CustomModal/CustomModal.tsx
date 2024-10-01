import { Button, ComboboxItem, Modal, Select, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { ReactElement, useState } from "react";
import EmployeeForm from "../employeeSection/employeeCreateForm/EmployeeForm";

interface ModalProps {
  opened?: any;
  onClose?: any;
  open: any;
  close: any;
  buttonlabel?: any;
  modalTitle: string;
  content: ReactElement;
  overlayProps?: any;
  styles?: any;
  bgcolor?: any;
}
export const CustomModal = ({
  buttonlabel,
  modalTitle,
  content,
  opened,
  close,
  open,
  overlayProps,
  styles,
  bgcolor,
}: ModalProps) => {
  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={true}
        onClose={close}
        title={modalTitle}
        withCloseButton={true}
        size={"lg"}
        overlayProps={overlayProps}
        styles={styles}
        centered
      >
        {content}
      </Modal>
      <Button onClick={open} color={bgcolor}>
        {buttonlabel}
      </Button>
    </>
  );
};
