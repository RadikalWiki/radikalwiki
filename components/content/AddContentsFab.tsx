import React from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSession } from "hooks";
import { CSVReader } from "comps";
import {
  authorships_insert_input,
  contents_insert_input,
  useMutation,
} from "gql";

export default function AddContentsFab({ folderId }: { folderId: string }) {
  const [session] = useSession();
  const [addContent] = useMutation(
    (mutation, args: contents_insert_input[]) => {
      return mutation.insert_contents({ objects: args })?.returning;
    }
  );
  const [addAuthors] = useMutation(
    (mutation, args: authorships_insert_input[]) => {
      return mutation.insert_authorships({ objects: args })?.affected_rows;
    }
  );

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

      const newContent = await addContent({
        args: [
          {
            name,
            folderId,
            data: data,
            creatorId: session?.user?.id,
            published: true,
          },
        ],
      });
      if (!newContent) return;
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
            contentId: newContent[0].id,
          },
        ];
        await addAuthors({ args: objects });
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
        sx={{ position: "fixed", bottom: 9, right: 3 }}
        variant="extended"
        color="primary"
        aria-label="Tilføj mappe"
        component="span"
      >
        <Add sx={{ mr: 1 }} />
        Mappe
      </Fab>
    </CSVReader>
  );
}
