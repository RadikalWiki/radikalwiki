import React, { Suspense } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CardContent,
} from "@mui/material";
import { HeaderCard, Link } from "comps";
import { useSession } from "hooks";
import { useQuery } from "gql";
import { AccountCircle, Group, Subject } from "@mui/icons-material";

function RawProfile() {
  const [session] = useSession();
  const query = useQuery();
  const id = session?.user?.id;
  const user = query.users_by_pk({ id });
  const contents = query.contents({
    where: {
      _or: [
        { authors: { identity: { user: { id: { _eq: id } } } } },
        { creatorId: { _eq: id } },
      ],
    },
  });
  const unknown = session?.user?.email == session?.user?.name;
  return (
    <>
      <HeaderCard title="Profil" avatar={<AccountCircle />}>
        <CardContent>
          <Typography>
            Navn: {unknown ? "Ukendt" : session?.user?.name}{" "}
          </Typography>
          <Typography>E-Mail: {session?.user?.email}</Typography>
        </CardContent>
      </HeaderCard>
      <HeaderCard title="Medlemskaber" avatar={<Group />}>
        <List>
          {user?.identity?.memberships().map(({ group }) => (
            <ListItem
              key={group?.id}
              button
              component={Link}
              href={`/group/${group?.id}`}
            >
              <ListItemText primary={group?.name} />
            </ListItem>
          )) ?? (
            <ListItem>
              <ListItemText primary="Ingen medlemskaber" />
            </ListItem>
          )}
        </List>
      </HeaderCard>
      <HeaderCard title="Indhold" avatar={<Subject />}>
        <List>
          {contents?.map(({ name, id, parent, folder }) => (
            <ListItem key={id} button component={Link} href={`/content/${id}`}>
              <ListItemText
                primary={name}
                secondary={parent ? parent.name : folder?.name}
              />
            </ListItem>
          )) ?? (
            <ListItem>
              <ListItemText primary="Intet indhold" />
            </ListItem>
          )}
        </List>
      </HeaderCard>
    </>
  );
}

export default function Profile() {
  return (
    <Suspense fallback={null}>
      <RawProfile />
    </Suspense>
  );
}

