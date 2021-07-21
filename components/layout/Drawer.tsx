import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  Airplay,
  Group,
  Event,
  SupervisorAccount,
  Settings,
} from "@material-ui/icons";
import { Link } from "comps";
import { useSession } from "hooks";

export default function Drawer({
  open,
  onClick,
}: {
  open: boolean;
  onClick: any;
}) {
  const [session] = useSession();

  return (
    <MuiDrawer open={open} onClick={onClick}>
      <List>
        {session?.roles?.includes("admin") && (
          <>
            <ListItem button component={Link} href="/group">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Grupper" />
            </ListItem>
            <ListItem button component={Link} href="/event">
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary="Begivenheder" />
            </ListItem>
            <Divider />
          </>
        )}
        <ListItem button component={Link} href="/screen" target="_blank">
          <ListItemIcon>
            <Airplay />
          </ListItemIcon>
          <ListItemText primary="Skærm" />
        </ListItem>
        <Divider />
        {session?.roles?.includes("admin") && (
          <>
            <ListItem
              button
              component={Link}
              href={`/event/${session?.event?.id}/admin`}
            >
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
            <ListItem button component={Link} href="/admin/users">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="RadikalWiki" />
            </ListItem>
          </>
        )}
      </List>
    </MuiDrawer>
  );
}
