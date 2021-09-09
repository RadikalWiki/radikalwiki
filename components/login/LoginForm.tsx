import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useSession, query } from "hooks";
import { auth } from "utils/nhost";
import { USER_GET_DISPLAY_NAME } from "gql";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export default function LoginForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const classes = useStyles();
  const [session, setSession] = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPassword, setPasswordError] = useState(false);
  const [errorPasswordMsg, setErrorPasswordMsg] = useState("");

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    const password = e.target.value;
    setPassword(password);
    if (password === passwordRepeat || passwordRepeat === "") {
      setPasswordError(false);
      setErrorPasswordMsg("");
    } else {
      setPasswordError(true);
      setErrorPasswordMsg("Kodeord er ikke ens");
    }
  };

  const onPasswordRepeatChange = (e: any) => {
    const passwordRepeat = e.target.value;
    setPasswordRepeat(passwordRepeat);
    if (password === passwordRepeat || passwordRepeat === "") {
      setPasswordError(false);
      setErrorPasswordMsg("");
    } else {
      setPasswordError(true);
      setErrorPasswordMsg("Kodeord er ikke ens");
    }
  };

  const onLogin = async () => {
    try {
      const { session } = await auth.login({
        email: email.toLowerCase(),
        password,
      });
      const { data } = await query(USER_GET_DISPLAY_NAME, {
        id: session?.user.id,
      });
      const displayName =
        data?.user.identity?.displayName || session?.user.email;

      const res = await fetch("/api/time");
      const { time } = await res.json();
      setSession({
        ...session,
        event: null,
        displayName,
        roles: [],
        timeDiff: new Date().getTime() - new Date(time).getTime(),
      });
      router.push("/");
    } catch (error: any) {
      setError(true);
      setErrorMsg(error?.response?.data?.message ?? String(error));
    }
  };

  const onRegister = async () => {
    try {
      await auth.register({ email: email.toLowerCase(), password });
      router.push("/unverified");
    } catch (error: any) {
      setError(true);
      setErrorMsg(error?.response?.data?.message ?? String(error));
    }
  };

  return (
    <Container className={classes.container} maxWidth="xs">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              error={error}
              helperText={errorMsg}
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
              error={errorPassword}
              helperText={errorPasswordMsg}
              label="Kodeord"
              name="password"
              size="small"
              type="password"
              variant="outlined"
              onChange={onPasswordChange}
            />
          </Grid>

          {mode === "register" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={errorPassword}
                helperText={errorPasswordMsg}
                label="Gentag Kodeord"
                name="password"
                size="small"
                type="password"
                variant="outlined"
                onChange={onPasswordRepeatChange}
              />
            </Grid>
          )}
          {mode === "login" ? (
            <Grid item xs={12}>
              <Button
                disabled={errorPassword}
                color="primary"
                fullWidth
                variant="contained"
                onClick={onLogin}
              >
                Log ind
              </Button>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Button
                disabled={errorPassword}
                color="primary"
                fullWidth
                variant="contained"
                onClick={onRegister}
              >
                Registrer
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
}
