import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropsWithChildren } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: '#2a3139',
  p: 1,
};

interface BasicModalProps {
  openModal: boolean;
  handleClose: () => void;
}

export const BasicModal = ({
  openModal,
  children,
  handleClose,
}: PropsWithChildren<BasicModalProps>) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
