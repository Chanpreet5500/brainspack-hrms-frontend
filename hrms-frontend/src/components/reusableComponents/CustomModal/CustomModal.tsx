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
  showButton?: boolean
  size: string;
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
  size,
}: ModalProps) => {
  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={true}
        onClose={close}
        title={modalTitle}
        withCloseButton={true}
        size={size}
        overlayProps={overlayProps}
        styles={styles}
        centered
        className={className}
      >
        {content}
      </Modal>
      {showButton ? <Button onClick={open} color={bgcolor}>
        {buttonlabel}
      </Button> :
        <p onClick={open} color={bgcolor}> {buttonlabel}</p>
      }

    </>
  );
};
