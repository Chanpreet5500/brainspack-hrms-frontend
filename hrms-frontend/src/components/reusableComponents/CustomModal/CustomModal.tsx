import { Button, Modal } from "@mantine/core";
import React, { ReactElement } from "react";

interface ModalProps {
  opened: any;
  onClose?: any;
  open: any;
  close: any;
  buttonlabel?: any;
  modalTitle: string;
  content: ReactElement;
  overlayProps?: any;
  styles?: any;
  bgcolor?: any;
  className?: string;
}
export const CustomModal = ({
  buttonlabel,
  modalTitle,
  content,
  opened,
  close,
  open,
  className,
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
        size={"md"}
        overlayProps={overlayProps}
        styles={styles}
        centered
        className={className}
      >
        {content}
      </Modal>
      <Button onClick={open} color={bgcolor}>
        {buttonlabel}
      </Button>
    </>
  );
};
