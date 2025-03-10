import { Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const FetchError = () => {
  return (
    <Box >
      <WarningIcon sx={{ color: "red" }} />
    </Box>
  )
}

export default FetchError;