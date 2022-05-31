import { useQuery, useMutation, order_by } from "gql";
import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { ContactMail, Delete, Person } from "@mui/icons-material";

const columns: any[] = [
  { field: "name", headerName: "Invitation", width: 201 },
];

export default function InvitesList({ id }: { id: string }) {
  const query = useQuery();
  const node = query.node({ id });

  const [deleteInvite] = useMutation(
    (mutation, id: string) => {
      return mutation.deleteMember({ id })?.id;
    },
    {
      refetchQueries: [
        node?.members({ order_by: [{ node: { name: order_by.asc } }] }),
      ],
    }
  );

  return (
    <Card>
      <CardHeader title="Invitationer" />
      <Divider />
      <List>
        {node
          ?.members({
            order_by: [{ node: { name: order_by.asc } }],
            where: { accepted: { _eq: false } },
          })
          .map(({ id, user, email }) => (
            <ListItem
              key={id ?? 0}
              secondaryAction={
                <IconButton onClick={() => deleteInvite({ args: id })}>
                  <Delete />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>{email ? <ContactMail /> : <Person />}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user?.displayName ?? email} />
            </ListItem>
          ))}
      </List>
    </Card>
  );
}
