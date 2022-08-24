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
  const get = node.useSubsGet();
  const speakerlist = get("speakerlist");
  const update = node.useUpdate({ refetch: false });
  const children = node.useChildren();
  const [timeBox, setTimeBox] = useState(120);
  const id = speakerlist?.id;

  const handleRemoveSpeaks = async () => {
    await children.delete({
      _and: [
        { mimeId: { _eq: "speak/speak" } },
        {
          parentId: { _eq: id },
        },
      ],
    });
  };

  const handleLockSpeak = async (mutable: boolean) => {
    await update({ id, set: { mutable } });
  };

  const handleTimerSet = async (time: number) => {
    const updatedAt = new Date();
    await update({ id, set: { data: { time, updatedAt } } });
  };

  const owner = speakerlist?.isContextOwner;

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
