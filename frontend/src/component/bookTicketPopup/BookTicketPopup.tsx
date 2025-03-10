import React from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import './BookTicketPopupStyle.css';
import { IBookTicketPopupProps } from '../../type';
/**
 * BookTicketPopup component displays a dialog for booking movie tickets. It shows the movie name, available languages, and formats.
 * The dialog is controlled by the `open` prop, and the dialog can be closed using the `onClose` callback.
 * 
 * @param {IBookTicketPopupProps} props - Component props
 * @param {boolean} props.open - Determines if the dialog is open or not
 * @param {() => void} props.onClose - Function to close the dialog when called
 * 
 * @returns {JSX.Element} The rendered component for booking tickets
 */
const BookTicketPopup: React.FC<IBookTicketPopupProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '8px',
            width: '360px',
            maxHeight: 'calc(100% - 200px)',
            overflowY: 'auto'
          }
        }
      }}
    >
      <Box className="ticket-popup-header">
        <Box>
          <Typography className="ticket-popup-title">Chhaava</Typography>
          <Typography className="ticket-popup-subtitle">Select language and format</Typography>
        </Box>
        <Close onClick={onClose} sx={{ fontSize: 20 }} className="ticket-popup-close" />
      </Box>

      <Box className="ticket-popup-content">
        <Typography className="language-section">Hindi</Typography>
        <Box className="format-container">
          <Box className="format-box">2D</Box>
          <Box className="format-box">4DX</Box>
          <Box className="format-box">IMAX 2D</Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default BookTicketPopup;