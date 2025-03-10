import React, { JSX } from 'react';
import { 
  Dialog, 
  DialogTitle,
  Box, 
  Typography, 
  Divider 
} from '@mui/material';
import { Close, Facebook, Twitter, Link } from '@mui/icons-material';
import './SharePopupStyle.css';
import { ISharePopupProps } from '../../type';
/**
 * SharePopup Component
 * 
 * This component renders a modal dialog that allows the user to share a link via various platforms 
 * ( Twitter/X, and Copy Link). It includes a close button to dismiss the dialog.
 *
 * @param {ISharePopupProps} props - The properties for the SharePopup component.
 * @param {boolean} props.open - A boolean flag that determines whether the dialog is open or closed.
 * @param {Function} props.onClose - A function that is called when the dialog is closed.
 * 
 * @returns {JSX.Element} The SharePopup component.
 */
const SharePopup: React.FC<ISharePopupProps> = ({ open, onClose}: ISharePopupProps): JSX.Element => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '8px',
            width: '360px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box className="dilog-header-container">
          <Typography variant="h6" className="share-title">
            Share
          </Typography>
          <Close 
            onClick={onClose} 
            sx={{ fontSize: 25 }}
            className="close-button" 
          />
        </Box>
      </DialogTitle>

      <Box className="share-options">
        <Box className="share-option">
          <Typography variant="body1">Facebook</Typography>
          <Facebook sx={{ fontSize: 25 }} />
        </Box>
        <Divider />
        
        <Box className="share-option">
          <Typography variant="body1">X (Formerly Twitter)</Typography>
          <Twitter sx={{ fontSize: 25 }} />
        </Box>
        <Divider />
        
        <Box className="share-option">
          <Typography variant="body1" >Copy Link</Typography>
          <Link sx={{ fontSize: 25 }} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default SharePopup;