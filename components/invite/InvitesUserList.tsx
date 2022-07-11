import { useQuery, useMutation, members_set_input, useSubscription } from "gql";
import {
  Avatar,
  Box,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Add, ContactMail, DoNotDisturb } from "@mui/icons-material";
import { getIcon } from "mime";
import { HeaderCard } from "comps/common";
import { Suspense } from "react";
import { useUserEmail, useUserId } from "@nhost/react";
import { TransitionGroup } from "react-transition-group";

const ListSuspense = () => {
  const query = useQuery();
  const sub = useSubscription();
  const userId = useUserId();
  const email = useUserEmail();
  const invites = sub.members({
    where: {
      _and: [
        { accepted: { _eq: false } },
        {
          _or: [{ nodeId: { _eq: userId } }, { email: { _eq: email } }],
        },
      ],
    },
  });
  const events = query.nodes({
    where: {
      _and: [
        { mimeId: { _eq: "wiki/event" } },
        {
          members: {
            _and: [{ accepted: { _eq: true } }, { nodeId: { _eq: userId } }],
          },
        },
      ],
    },
  });

  const [updateMember] = useMutation(
    (mutation, args: { id?: string; set: members_set_input }) => {
      return mutation.updateMember({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries: [invites, events],
    }
  );

  const handleAcceptInvite = (id: string) => async () => {
    await updateMember({
      args: { id, set: { accepted: true, nodeId: userId } },
    });
  };

  return (
    <List>
      <TransitionGroup>
        {invites.map(({ id, parent }) => {
          return !id ? null :
            <Collapse
              key={id ?? 0}
            >
              <ListItem
                secondaryAction={
                  <IconButton onClick={handleAcceptInvite(id)}>
                    <Add />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: (t) => t.palette.primary.main,
                    }}
                  >
                    {getIcon(parent?.mimeId!)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={parent?.name} />
              </ListItem>
            </Collapse>
        })}
        {invites.length == 0 && (
          <Collapse key={-1}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: (t) => t.palette.secondary.main,
                  }}
                >
                  <DoNotDisturb />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Ingen invitationer" />
            </ListItem>
          </Collapse>
        )}
      </TransitionGroup>
    </List>
  );
};

export default function InvitesUserList() {
  return (
    <HeaderCard
      avatar={
        <Avatar
          sx={{
            bgcolor: (t) => t.palette.secondary.main,
          }}
        >
          <ContactMail />
        </Avatar>
      }
      title="Invitationer"
    >
      <Divider />
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <ListSuspense />
      </Suspense>
    </HeaderCard>
  );
}
