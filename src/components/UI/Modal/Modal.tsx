import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { memo, PropsWithChildren, useContext } from 'react';

import { AuthContext } from '../../../Auth/Auth';
import { OverlayContext } from '../../../context/Overlay';
import { Theme, ThemeColor } from '../../../enums';

interface BasicModalProps {
  openModal: boolean;
  handleClose: () => void;
}

export const BasicModal = memo(
  ({ openModal, children, handleClose }: PropsWithChildren<BasicModalProps>) => {
    const { userData } = useContext(AuthContext);
    const { overlay } = useContext(OverlayContext);

    return (
      <div className={overlay ? `overlayOpenPending overlay` : `overlay`}>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          disableAutoFocus={true}
        >
          <Box
            sx={{
              position: 'absolute',
              width: 320,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor:
                userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            }}
          >
            {children}
          </Box>
        </Modal>
      </div>
    );
  },
);
