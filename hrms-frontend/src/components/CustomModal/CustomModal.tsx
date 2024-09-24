import {Button, ComboboxItem, Modal, Select, Textarea} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import React, { ReactElement, useState} from "react";

interface ModalProp {
  buttonlabel: string;
  modalTitle: string;
  content: ReactElement
}
export const CustomModal = ({buttonlabel, modalTitle , content}: ModalProp) => {
  const [opened, {open, close}] = useDisclosure(false);
  const [value, setValue] = useState<ComboboxItem | null>(null);


  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={modalTitle}
        withCloseButton={true}
        size={'lg'}
        centered>
            {content}
         
      </Modal>
      <Button onClick={open}>{buttonlabel}</Button>
    </>
  );
};
