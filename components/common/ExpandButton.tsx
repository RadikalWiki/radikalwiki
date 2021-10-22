import { ExpandMore } from "@mui/icons-material";
import {
  IconButton,
  Tooltip,
  styled,
} from "@mui/material";

const ExpandButton = styled(({ expand, ...other }: any) => (
  <IconButton color="inherit" size="large" {...other}>
    <Tooltip title={expand ? "Skjul" : "Vis"}>
      <ExpandMore />
    </Tooltip>
  </IconButton>
))(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default ExpandButton;