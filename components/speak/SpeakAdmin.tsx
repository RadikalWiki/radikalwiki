import React, { useState } from "react";
import { Button, ButtonGroup, Divider, TextField } from "@mui/material";
import { AdminCard } from "components";
import { Clear, LockOpen, Lock, PlayArrow, Stop } from "@mui/icons-material";
import { Node } from "hooks";

export default function SpeakAdmin({
  node,
  time,
}: {
  node: Node;
  time: number;
}) {
  const speakerlist = node.subGet("speakerlist");
  const [timeBox, setTimeBox] = useState(120);
  const id = speakerlist?.id;

  const handleRemoveSpeaks = async (_: any) => {
    await node.children.delete();
  };

  const handleLockSpeak = async (mutable: boolean) => {
    await node.update({ id, set: { mutable } })
  };

  const handleTimerSet = async (time: number) => {
    const updatedAt = new Date();
    await node.update({ id, set: { time, updatedAt } })
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
            bgcolor: (t) => t.palette.secondary.main,
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
