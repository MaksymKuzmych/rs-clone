import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { memo, PropsWithChildren } from 'react';

const style = {
  position: 'absolute',
  width: 320,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#2a3139',
};

interface BasicModalProps {
  openModal: boolean;
  handleClose: () => void;
}

export const BasicModal = memo(
  ({ openModal, children, handleClose }: PropsWithChildren<BasicModalProps>) => {
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
  },
);
