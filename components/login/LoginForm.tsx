import React from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { auth } from "utils/nhost";
import { useState } from "react";
import { useRouter } from "next/router";
import { USER_GET_DISPLAY_NAME } from "gql";
import { useSession, query } from "hooks";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export default function LoginForm() {
  const router = useRouter();
  const classes = useStyles();
  const [session, setSession] = useSession();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onLogin = async () => {
    const { session } = await auth.login({ email, password });
    const { data } = await query(USER_GET_DISPLAY_NAME, {
      id: session?.user.id,
    });
    const displayName = data?.user.identity?.displayName || session?.user.email;
    setSession({
      ...session,
      event: null,
      displayName,
      roles: [],
    });
    router.push("/");
  };

  const onRegister = async () => {
    try {
      const { session } = await auth.register({ email, password });
      const { data } = await query(USER_GET_DISPLAY_NAME, {
        id: session?.user.id,
      });
      const displayName = data?.identity?.displayName || session?.user.email;
      setSession({
        ...session,
        event: null,
        displayName,
      });
      router.push("/");
    } catch (error) {
      alert("error logging in");
      console.error(error);
      return;
    }
  };

  return (
    <Container className={classes.container} maxWidth="xs">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  onChange={onEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Kodeord"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  onChange={onPasswordChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={onLogin}
                >
                  Log in
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={onRegister}
                >
                  Registrer
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
