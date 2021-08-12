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
} from "@material-ui/core";
import { Cancel, HowToVote } from "@material-ui/icons";
import { useSession } from "hooks";
import { useMutation, useQuery } from "@apollo/client";
import { CONTENT_GET_POLLS, POLL_DEL } from "gql";
import { useRouter } from "next/router";

export default function PollList({ contentId }: { contentId: string }) {
  const [session] = useSession();
  const router = useRouter();
  const {
    data: { content } = {},
    loading,
    error,
  } = useQuery(CONTENT_GET_POLLS, {
    variables: { id: contentId },
  });
  const [deletePoll] = useMutation(POLL_DEL, {
    refetchQueries: [{ query: CONTENT_GET_POLLS, variables: { id: contentId } }],
  });

  const handleDeletePoll = (value: any) => async (_: any) => {
    await deletePoll({ variables: { id: value } });
  };

  if (content?.polls && content?.polls.length == 0) return null;

  return (
    <Fade in={!loading}>
      <HeaderCard title="Afstemningsresultater">
        <List>
          {content?.polls.map(
            (poll: { id: any; total: any; createdAt: any }) => (
              <ListItem
                key={poll.id}
                button
                component={NextLink}
                href={`/poll/${poll.id}`}
              >
                <Tooltip title="Antal stemmer">
                  <ListItemAvatar>
                    <Badge
                      color="secondary"
                      max={1000}
                      badgeContent={poll.total.aggregate.count}
                    >
                      <Avatar style={{ backgroundColor: "#ec407a" }}>
                        <HowToVote style={{ color: "#fff" }} />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                </Tooltip>
                <ListItemText
                  primary={`${new Date(poll.createdAt).toLocaleString(
                    "da-DK"
                  )}`}
                />
                {session.roles.includes("admin") && (
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={handleDeletePoll(poll.id)}
                      color="primary"
                      edge="end"
                    >
                      <Cancel />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            )
          )}
        </List>
      </HeaderCard>
    </Fade>
  );
}
