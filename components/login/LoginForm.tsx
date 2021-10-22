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
} from "@mui/material";
import { useSession } from "hooks";
import { auth } from "utils/nhost";
import { query, resolved } from "gql";

export default function LoginForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [session, setSession] = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPassword, setPasswordError] = useState(false);
  const [errorPasswordMsg, setErrorPasswordMsg] = useState("");
  //const query = useQuery();

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
      const name = (await resolved(() => query.users_by_pk({ id: session?.user?.id })?.identity?.displayName)) ?? session?.user?.email;
      const user = {
        id: session?.user?.id as string,
        name: name as string,
        email: session?.user?.email as string,
      }

      const res = await fetch("/api/time");
      const { time } = await res.json();
      setSession({
        ...session,
        event: undefined,
        user,
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
    <Container sx={{ padding: 3 }} maxWidth="xs">
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
