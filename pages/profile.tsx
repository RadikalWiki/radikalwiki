import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CardContent,
} from "@material-ui/core";
import { HeaderCard, Link } from "comps";
import { useSession } from "hooks";
import { USER_GET_PROFILE } from "gql";
import { useQuery } from "@apollo/client";
import { AccountCircle, Group, Subject } from "@material-ui/icons";

export default function Login() {
  const [session] = useSession();
  const { loading, data, error } = useQuery(USER_GET_PROFILE, {
    variables: { id: session?.user.id },
  });

  const user = data?.user;
  const unknown = session?.user.email == session?.displayName;
  return (
    <>
      <HeaderCard title="Profil" avatar={<AccountCircle />}>
        <CardContent>
          <Typography>
            Navn: {unknown ? "Ukendt" : session?.displayName}{" "}
          </Typography>
          <Typography>E-Mail: {session?.user.email}</Typography>
        </CardContent>
      </HeaderCard>
      <HeaderCard title="Medlemskaber" avatar={<Group />}>
        <List>
          {user?.identity?.memberships?.map(
            ({
              group: { name, id },
            }: {
              group: { name: string; id: string };
            }) => (
              <ListItem key={id} button component={Link} href={`/group/${id}`}>
                <ListItemText primary={name} />
              </ListItem>
            )
          ) ?? (
            <ListItem>
              <ListItemText primary="Ingen medlemskaber" />
            </ListItem>
          )}
        </List>
      </HeaderCard>
      <HeaderCard title="Indhold" avatar={<Subject />}>
        <List>
          {data?.contents?.map(
            ({
              name,
              id,
              parent,
              folder,
            }: {
              name: string;
              id: string;
              parent: any;
              folder: any;
            }) => (
              <ListItem
                key={id}
                button
                component={Link}
                href={`/content/${id}`}
              >
                <ListItemText
                  primary={name}
                  secondary={parent ? parent.name : folder.name}
                />
              </ListItem>
            )
          ) ?? (
            <ListItem>
              <ListItemText primary="Intet indhold" />
            </ListItem>
          )}
        </List>
      </HeaderCard>
    </>
  );
}
