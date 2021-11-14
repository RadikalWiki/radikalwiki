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

export default function LoginForm({
  mode,
}: {
  mode: "login" | "register" | "reset" | "confirm";
}) {
  const router = useRouter();
  const [session, setSession] = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [ticket, setTicket] = useState("");
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

  const onTicketChange = (e: any) => {
    const ticket = e.target.value;
    setTicket(ticket);
  };

  const onLogin = async () => {
    try {
      const { session } = await auth.login({
        email: email.toLowerCase(),
        password,
      });
      const name =
        (await resolved(
          () =>
            query.users_by_pk({ id: session?.user?.id })?.identity?.displayName
        )) ?? session?.user?.email;
      const user = {
        id: session?.user?.id as string,
        name: name as string,
        email: session?.user?.email as string,
      };

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

  const onReset = async () => {
    if (["login", "register"].includes(mode)) {
      router.push("/user/reset");
    }
    else if (mode === "confirm") {
      try {
        await auth.confirmPasswordChange(password, ticket);
        router.push("/user/login");
      } catch (error: any) {
        setError(true);
        setErrorMsg(error?.response?.data?.message ?? String(error));
      }
    } else {
      try {
        await auth.requestPasswordChange(email.toLowerCase());
        router.push("/user/confirm");
      } catch (error: any) {
        setError(true);
        setErrorMsg(error?.response?.data?.message ?? String(error));
      }
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
              variant="outlined"
              onChange={onEmailChange}
            />
          </Grid>
          {mode !== "reset" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={errorPassword}
                helperText={errorPasswordMsg}
                label={mode == "confirm" ? "Nyt kodeord" : "Kodeord"}
                name="password"
                type="password"
                variant="outlined"
                onChange={onPasswordChange}
              />
            </Grid>
          )}
          {mode === "register" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={errorPassword}
                helperText={errorPasswordMsg}
                label="Gentag Kodeord"
                name="password"
                type="password"
                variant="outlined"
                onChange={onPasswordRepeatChange}
              />
            </Grid>
          )}
          {mode === "confirm" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={errorPassword}
                helperText={errorPasswordMsg}
                label="Kode fra e-mail"
                name="email-code"
                type="password"
                variant="outlined"
                onChange={onTicketChange}
              />
            </Grid>
          )}
          {mode === "login" && (
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
          )}
          {mode === "register" && (
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

          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={onReset}
            >
              Reset kodeord
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
