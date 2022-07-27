import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Avatar,
  Typography,
  Stack,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";
import { useSession } from "hooks";
import { auth } from "nhost";
import { HowToReg, LockReset, Login } from "@mui/icons-material";

export default function LoginForm({
  mode,
}: {
  mode: "login" | "register" | "reset" | "confirm";
}) {
  const router = useRouter();
  const [session, setSession] = useSession();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [ticket, setTicket] = useState("");
  const [errorName, setNameError] = useState(false);
  const [errorEmail, setEmailError] = useState(false);
  const [errorNameMsg, setNameErrorMsg] = useState("");
  const [errorEmailMsg, setEmailErrorMsg] = useState("");
  const [errorPassword, setPasswordError] = useState(false);
  const [errorPasswordMsg, setPasswordErrorMsg] = useState("");

  const onNameChange = (e: any) => {
    const name = e.target.value;
    setName(name);
    if (name) {
      setNameError(false);
      setNameErrorMsg("");
    } else {
      setNameError(true);
      setNameErrorMsg("Mangler navn");
    }
  };

  const onEmailChange = (e: any) => {
    const email = e.target.value;
    setEmail(email);
    if (email) {
      setEmailError(false);
      setEmailErrorMsg("");
    } else {
      setEmailError(true);
      setEmailErrorMsg("Mangler email");
    }
  };

  const onPasswordChange = (e: any) => {
    const password = e.target.value;
    setPassword(password);
    if (password === passwordRepeat || passwordRepeat === "") {
      setPasswordError(false);
      setPasswordErrorMsg("");
    } else {
      setPasswordError(true);
      setPasswordErrorMsg("Kodeord er ikke ens");
    }
  };

  const onPasswordRepeatChange = (e: any) => {
    const passwordRepeat = e.target.value;
    setPasswordRepeat(passwordRepeat);
    if (password === passwordRepeat || passwordRepeat === "") {
      setPasswordError(false);
      setPasswordErrorMsg("");
    } else {
      setPasswordError(true);
      setPasswordErrorMsg("Kodeord er ikke ens");
    }
  };

  const onTicketChange = (e: any) => {
    const ticket = e.target.value;
    setTicket(ticket);
  };

  const onLogin = async () => {
    setLoading(true);
    const timeFetch = fetch("/api/time");
    const { session, error } = await auth.signIn({
      email: email.toLowerCase(),
      password,
    });
    if (error) {
      // Already logged-in
      if ([100, 20].includes(error.status)) {
        router.push("/");
        return;
      }

      if (error.error === "unverified-user") {
        auth.sendVerificationEmail({ email });
        setEmailError(true);
        setEmailErrorMsg(
          "Email ikke verificeret. Tjek din indbakke. Evt. også spam."
        );
        return;
      }
      setEmailError(true);
      setEmailErrorMsg("Forkert email eller kode");
      setPasswordError(true);
      setPassword("Forkert email eller kode");
      setLoading(false);
      return;
    }
    setSession(null);

    const { time } = await (await timeFetch).json();
    setSession({
      timeDiff: new Date().getTime() - new Date(time).getTime(),
    });
    router.back();
  };

  const onRegister = async () => {
    if (["login"].includes(mode)) {
      router.push("/user/register");
      return;
    }
    const { error } = await auth.signUp({
      email: email.toLowerCase(),
      password,
      options: { displayName: name },
    });
    if (error) {
      setEmailError(true);
      setEmailErrorMsg(error?.message);
    } else {
      router.push("/user/unverified");
    }
  };

  const onReset = async () => {
    if (["login", "register"].includes(mode)) {
      router.push("/user/reset");
    } else if (mode === "confirm") {
      // TODO: add error handling
      await auth.changePassword({ newPassword: password });
      router.push("/user/login");
    } else {
      // TODO: add error handling
      await auth.resetPassword({ email: email.toLowerCase() });
      router.push("/user/confirm");
    }
  };

  return (
    <Container sx={{ padding: 3 }} maxWidth="xs">
      <form>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {mode === "login" ? (
              <Login />
            ) : mode === "register" ? (
              <HowToReg />
            ) : (
              <LockReset />
            )}
          </Avatar>
          <Typography variant="h5">
            {mode === "login"
              ? "Log Ind"
              : mode === "register"
              ? "Registrer"
              : mode === "reset"
              ? "Gendan Kodeord"
              : "Bekræft Gendannelse"}
          </Typography>
          {mode === "register" && (
            <TextField
              fullWidth
              error={errorName}
              helperText={errorNameMsg}
              label="Fulde navn"
              name="fullname"
              variant="outlined"
              onChange={onNameChange}
            />
          )}
          <TextField
            fullWidth
            error={errorEmail}
            helperText={errorEmailMsg}
            label="Email"
            name="email"
            variant="outlined"
            onChange={onEmailChange}
          />
          {mode !== "reset" && (
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
          )}
          {mode === "register" && (
            <TextField
              fullWidth
              error={errorPassword}
              label="Gentag Kodeord"
              name="password"
              type="password"
              variant="outlined"
              onChange={onPasswordRepeatChange}
            />
          )}
          {mode === "confirm" && (
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
          )}
          {mode === "login" && (
            <Box sx={{ position: "relative", width: "100%" }}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                startIcon={<Login />}
                disabled={loading}
                onClick={onLogin}
              >
                Log ind
              </Button>
              <Divider
                sx={{
                  mt: 1,
                  width: "100%",
                }}
              />
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          )}

          {!["reset", "confirm"].includes(mode) && (
            <Button
              disabled={
                mode !== "login" && (errorName || errorEmail || errorPassword)
              }
              color={mode === "login" ? "secondary" : "primary"}
              fullWidth
              variant="contained"
              startIcon={<HowToReg />}
              onClick={onRegister}
            >
              Registrer
            </Button>
          )}

          {!["register"].includes(mode) && (
            <Button
              color={mode === "login" ? "secondary" : "primary"}
              fullWidth
              variant="contained"
              startIcon={<LockReset />}
              onClick={onReset}
            >
              Gendan Kodeord
            </Button>
          )}
        </Stack>
      </form>
    </Container>
  );
}
