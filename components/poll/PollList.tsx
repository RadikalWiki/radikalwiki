import { HeaderCard, Link as NextLink } from "comps";
import {
  List,
  ListItem,
  ListItemText,
  Tooltip,
  ListItemAvatar,
  Badge,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Fade,
} from "@mui/material";
import { Cancel, HowToVote } from "@mui/icons-material";
import { useSession } from "hooks";
import { useMutation, useQuery } from "gql";

export default function PollList({ contentId }: { contentId: string }) {
  const [session] = useSession();
  const query = useQuery();
  const polls = query.contents_by_pk({ id: contentId })?.polls();
  const [deletePoll] = useMutation(
    (mutation, id: string) => {
      return mutation.delete_polls_by_pk({ id });
    }
  );

  const handleDeletePoll = (id: string) => async () => {
    await deletePoll({ args: id });
  };

  if (polls && polls.length == 0) return null;

  return (
    <HeaderCard title="Afstemningsresultater">
      <List>
        {polls?.map(({ id, votes_aggregate, createdAt, }) => (
          <ListItem
            key={id}
            button
            component={NextLink}
            href={`/poll/${id}`}
          >
            <Tooltip title="Antal stemmer">
              <ListItemAvatar>
                <Badge
                  color="secondary"
                  max={1000}
                  badgeContent={votes_aggregate().aggregate?.count}
                >
                  <Avatar style={{ backgroundColor: "#ec407a" }}>
                    <HowToVote style={{ color: "#fff" }} />
                  </Avatar>
                </Badge>
              </ListItemAvatar>
            </Tooltip>
            <ListItemText
              primary={`${new Date(createdAt).toLocaleString("da-DK")}`}
            />
            {session?.roles?.includes("admin") && (
              <ListItemSecondaryAction>
                <IconButton
                  onClick={handleDeletePoll(id)}
                  color="primary"
                  edge="end"
                  size="large"
                >
                  <Cancel />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </HeaderCard>
  );
}
