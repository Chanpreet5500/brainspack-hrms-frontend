import { Button, Modal } from "@mantine/core";
import React, { ReactElement } from "react";

interface ModalProps {
  opened: any,
  onClose?: any,
  open: any,
  close: any
  buttonlabel?: any;
  modalTitle: string;
  content: ReactElement
  overlayProps?: any
  styles?: any
  bgcolor?: any
}
export const CustomModal = ({ buttonlabel, modalTitle, content, opened, close, open, overlayProps, styles, bgcolor }: ModalProps) => {



  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={modalTitle}
        withCloseButton={true}
        size={'lg'}
        overlayProps={overlayProps}
        styles={styles}
        centered>
        {content}

      </Modal>
      <Button onClick={open} color={bgcolor} >{buttonlabel}</Button>
    </>
  );
};