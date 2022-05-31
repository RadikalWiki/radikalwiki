import React, { useState } from "react";
import { Button, ButtonGroup, Divider, TextField } from "@mui/material";
import { AdminCard } from "components";
import { nodes, nodes_set_input, useMutation } from "gql";
import { Clear, LockOpen, Lock, PlayArrow, Stop } from "@mui/icons-material";

export default function SpeakAdmin({
  speakerlist,
  time,
}: {
  speakerlist?: nodes;
  time: number;
}) {
  const [timeBox, setTimeBox] = useState(120);
  const id = speakerlist?.id;

  const [deleteSpeaks] = useMutation((mutation, _) => {
    return mutation.deleteNodes({ where: { parentId: { _eq: id } } })
      ?.affected_rows;
  });

  const [setSpeakerlist] = useMutation(
    (mutation, set: nodes_set_input) => {
      return mutation.updateNode({ pk_columns: { id }, _set: set })?.id;
    },
    { refetchQueries: [speakerlist] }
  );

  const handleRemoveSpeaks = (_: any) => {
    deleteSpeaks();
  };

  const handleLockSpeak = async (mutable: boolean) => {
    await setSpeakerlist({ args: { mutable } });
  };

  const handleTimerSet = (time: number) => {
    const updatedAt = new Date();
    setSpeakerlist({ args: { data: { time, updatedAt } } });
  };

  const owner = speakerlist?.isOwner;

  return (
    (owner && (
      <AdminCard title="Administrer Talerlisten">
        <Divider />
        <ButtonGroup variant="contained" sx={{ m: 2 }}>
          <Button
            color="secondary"
            size="large"
            sx={{ color: "#fff" }}
            endIcon={speakerlist?.mutable ? <Lock /> : <LockOpen />}
            onClick={() => handleLockSpeak(!speakerlist?.mutable)}
          >
            {speakerlist?.mutable ? "Luk" : "Åben"}
          </Button>

          <Button
            color="secondary"
            size="large"
            endIcon={<Clear />}
            sx={{ color: "#fff" }}
            onClick={handleRemoveSpeaks}
          >
            Ryd
          </Button>
          <Button
            color="secondary"
            size="large"
            sx={{ color: "#fff" }}
            endIcon={time == 0 ? <PlayArrow /> : <Stop />}
            onClick={() => handleTimerSet(time > 0 ? 0 : timeBox)}
          >
            {time == 0 ? "Start" : "Stop"}
          </Button>
        </ButtonGroup>

        <TextField
          id="filled-number"
          label="Taletid"
          type="number"
          color="secondary"
          value={timeBox}
          sx={{
            bgcolor: (theme) => theme.palette.secondary.main,
            borderColor: "white",
            m: 2,
          }}
          InputLabelProps={{
            shrink: true,
            sx: { color: "#fff" },
          }}
          InputProps={{
            sx: { color: "#fff" },
          }}
          onChange={(e) => setTimeBox(parseInt(e.target.value))}
          variant="filled"
        />
      </AdminCard>
    )) ||
    null
  );
}
