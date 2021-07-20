import React from "react";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useStyles, useSession } from "hooks";
import { CSVReader } from "comps";
import { CONTENTS_ADD, AUTHORSHIPS_ADD } from "gql";
import { useMutation } from "@apollo/client";

export default function AddContentFab({ folderId }: { folderId: string }) {
  const [session] = useSession();
  const classes = useStyles();
  const [addContent] = useMutation(CONTENTS_ADD);
  const [addAuthors] = useMutation(AUTHORSHIPS_ADD);

  const handleFile = async (file: any) => {
    for (const content of file) {
      const name = content?.navn ?? content.titel;
      let data = "";
      if (content.tekst) {
        data += `${content.tekst
          .replaceAll(". ", ". \n")
          .split("\n")
          .map((s: string) => `<p>${s}</p>`)
          .join("")}`;
      }
      if (content.motivation !== null && content.motivation !== "-") {
        data += `<h2>Motivation</h2>${content.motivation
          .replaceAll(". ", ". \n")
          .split("\n")
          .map((s: string) => `<p>${s}</p>`)
          .join("")}`;
      }
      if (content.faktaboks !== null && content.faktaboks !== "-") {
        data += `<h2>Faktaboks</h2>${content.faktaboks
          .replaceAll(". ", ". \n")
          .split("\n")
          .map((s: string) => `<p>${s}</p>`)
          .join("")}`;
      }

      const res = await addContent({
        variables: {
          name,
          folderId,
          data: data,
          creatorId: session.user.id,
          published: true,
        },
      });
      const authors =
        content.stillere
          ?.replaceAll("- og", "- &")
          .replaceAll("og", ",")
          .split(",")
          .map((s: string) => s.trim()) ?? [];

      for (const author of authors) {
        const objects = [
          {
            name: author,
            contentId: res.data.insert_contents_one.id,
          },
        ];
        await addAuthors({ variables: { objects } });
      }
    }
  };

  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: any) => header.trim().toLowerCase(),
  };

  return (
    <CSVReader parseOptions={parseOptions} onFileLoaded={handleFile}>
      <Fab
        className={classes.speedDial2}
        variant="extended"
        color="primary"
        aria-label="Tilføj mappe"
        component="span"
      >
        <Add className={classes.extendedIcon} />
        Mappe
      </Fab>
    </CSVReader>
  );
}
