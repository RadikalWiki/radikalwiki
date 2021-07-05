import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { useStyles, useSession, query } from "hooks";
import { auth } from "utils/nhost";
import { USER_GET_DISPLAY_NAME } from "gql";

export default function EventDialog({
  mode,
  open,
  setOpen,
}: {
  mode: "login" | "register";
  open: boolean;
  setOpen: any;
}) {
  const router = useRouter();
  const classes = useStyles();
  const [session, setSession] = useSession();
  const [email, setEmail] = useState();
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
      const { session } = await auth.login({ email, password });
      const { data } = await query(USER_GET_DISPLAY_NAME, {
        id: session?.user.id,
      });
      const displayName =
        data?.user.identity?.displayName || session?.user.email;
      setSession({
        ...session,
        event: null,
        displayName,
        roles: [],
      });
      setOpen(false);
      router.push("/");
    } catch (error: any) {
      setError(true);
      setErrorMsg(error.response.data.message);
    }
  };

  const onRegister = async () => {
    try {
      const { session } = await auth.register({ email, password });
      const { data } = await query(USER_GET_DISPLAY_NAME, {
        id: session?.user.id,
      });
      const displayName =
        data?.user.identity?.displayName || session?.user.email;
      setSession({
        ...session,
        event: null,
        displayName,
        roles: [],
      });
      setOpen(false);
      router.push("/");
    } catch (error: any) {
      setError(true);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown open={open}>
      <DialogTitle>{mode == "login" ? "Log ind" : "Register"}</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
