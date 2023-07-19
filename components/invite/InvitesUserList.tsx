import {
  useQuery,
  useMutation,
  members_set_input,
  client,
  order_by,
  resolved,
} from 'gql';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Add, ContactMail, DoNotDisturb } from '@mui/icons-material';
import { HeaderCard, MimeAvatarId } from 'comps';
import { useUserEmail, useUserId } from '@nhost/nextjs';

const ListSuspense = () => {
  const query = useQuery();
  const userId = useUserId();
  const email = useUserEmail();
  const invites = query
    .members({
      where: {
        _and: [
          { accepted: { _eq: false } },
          {
            _or: [{ nodeId: { _eq: userId } }, { email: { _eq: email } }],
          },
        ],
      },
    })
    .filter((invite) => invite.parent?.id);
  const events = !userId
    ? []
    : query.nodes({
        order_by: [{ createdAt: order_by.desc }],
        where: {
          _and: [
            { mimeId: { _eq: 'wiki/event' } },
            {
              _or: [
                { ownerId: { _eq: userId } },
                {
                  members: {
                    _and: [
                      { accepted: { _eq: true } },
                      { nodeId: { _eq: userId } },
                    ],
                  },
                },
              ],
            },
          ],
        },
      });
  const groups = !userId
    ? []
    : query.nodes({
        order_by: [{ createdAt: order_by.desc }],
        where: {
          _and: [
            { mimeId: { _eq: 'wiki/group' } },
            {
              _or: [
                { ownerId: { _eq: userId } },
                {
                  members: {
                    _and: [
                      { accepted: { _eq: true } },
                      { nodeId: { _eq: userId } },
                    ],
                  },
                },
              ],
            },
          ],
        },
      });

  const [updateMember] = useMutation(
    (mutation, args: { id?: string; set: members_set_input }) => {
      if (!args.id) return;
      mutation.updateMember({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries: [invites, events, groups],
      awaitRefetchQueries: true,
    }
  );

  const [deleteMember] = useMutation(
    (mutation, args: { id?: string }) => {
      if (args.id === undefined) return;
      mutation.deleteMember({ id: args.id })?.id;
    },
    {
      refetchQueries: [invites, events, groups],
      awaitRefetchQueries: true,
    }
  );

  const handleAcceptInvite = (id?: string) => async () => {
    try {
      await updateMember({
        args: { id, set: { accepted: true, nodeId: userId } },
      });
    } catch (e) {
      await deleteMember({ args: { id } });
    }

    // Delete cache
    // eslint-disable-next-line functional/immutable-data
    client.cache.query = {};
    await resolved(
      () =>
        query
          .membersAggregate({
            where: {
              _and: [
                { accepted: { _eq: false } },
                {
                  _or: [{ nodeId: { _eq: userId } }, { email: { _eq: email } }],
                },
              ],
            },
          })
          .aggregate?.count(),
      { noCache: true }
    );
  };

  return (
    <List>
      {invites.map(({ id, parent }) => {
        const item = (
          <ListItem
            key={id ?? 0}
            secondaryAction={
              <IconButton onClick={handleAcceptInvite(id)}>
                <Add />
              </IconButton>
            }
          >
            {parent?.id && (
              <ListItemAvatar>
                <MimeAvatarId id={parent?.id} />
              </ListItemAvatar>
            )}
            <ListItemText primary={parent?.name} />
          </ListItem>
        );

        return parent?.id ? item : null;
      })}
      {!invites?.[0]?.id && (
        <ListItem>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
              }}
            >
              <DoNotDisturb />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ingen invitationer" />
        </ListItem>
      )}
    </List>
  );
};

const InvitesUserList = () => (
  <HeaderCard
    avatar={
      <Avatar
        sx={{
          bgcolor: 'secondary.main',
        }}
      >
        <ContactMail />
      </Avatar>
    }
    title="Invitationer"
  >
    <ListSuspense />
  </HeaderCard>
);

export default InvitesUserList;
