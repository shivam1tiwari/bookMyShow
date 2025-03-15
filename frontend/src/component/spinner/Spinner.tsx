import { CircularProgress } from "@mui/material"
import Box from "@mui/material/Box";
import './Spinner.css'

const Spinner = () => {
  return(
    <Box className = "spinner">
      <CircularProgress/>
    </Box>
  )
}

export default Spinner;