import CSVReader from "react-csv-reader";
import { useMutation } from "@apollo/client";
import { useStyles } from "hooks";
import { CATEGORY_ADD, CONTENT_ADD, CONTENT_SET_PRIORITY, USER_ADD } from "gql";
import { Card, Typography } from "@material-ui/core";

export default function Upload() {
  const classes = useStyles();
  const [addCategory] = useMutation(CATEGORY_ADD);
  const [addContent] = useMutation(CONTENT_ADD);
  const [addUser] = useMutation(USER_ADD);
  const [setPriority] = useMutation(CONTENT_SET_PRIORITY);

  const handleResolutions = async (data: any, fileInfo: any) => {
    const catName = fileInfo.name.split(".")[0];
    const res = await addCategory({ variables: { name: catName } });
    console.log(res.data.insert_category.returning[0].id);
    const catId = res.data.insert_category.returning[0].id;
    for (const content of data) {
      let contentData = "";
      if (content.forslagstekst) {
        contentData += content.forslagstekst;
      }
      if (content.tekst) {
        contentData += content.tekst;
      }
      if (content.motivation) {
        contentData += "\n" + content.motivation;
      }
      if (content.faktaboks) {
        contentData += "\n" + content.faktaboks;
      }

      if (!content.titel) {
        continue;
      }

      let priority = content.prioritet ? content.prioritet : 0;

      await addContent({
        variables: {
          name: content.titel.trim(),
          data: contentData,
          creators: content.stillere || "N/A",
          categoryId: catId,
          priority,
        },
      });
    }
  };

  const handlePriorities = async (data: any, _: any) => {
    console.log(data);
    for (const priority of data) {
      await setPriority({
        variables: {
          name: priority.name,
          priority: priority.priority,
        },
      });
    }
  };

  const handleChange = async (data: any, _: any) => {
    console.log(data);
    const res = await addCategory({ variables: { name: "Ændringsforslag" } });
    for (const change of data) {
      let contentData = "";
      if (change.tekst) {
        contentData += change.tekst;
      }
      if (change.motivation) {
        contentData += "\n" + change.motivation;
      }
      let name = change.navn || change.navn2;
      await addContent({
        variables: {
          name,
          data: contentData,
          creators: change.stillere,
          categoryId: res.data.insert_category.returning[0].id,
          priority: 0,
        },
      });
    }
  };

  const handleUsers = async (data: any, _: any) => {
    console.log(data);
    for (const user of data) {
      await addUser({
        variables: {
          name: user.fornavn + " " + user.efternavn,
          email: user.email,
        },
      });
    }
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <Card className={classes.card}>
      <Typography>Upload Resolutioner</Typography>

      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          onFileLoaded={handleResolutions}
          parserOptions={papaparseOptions}
        />
      </div>

      <Typography>Upload Prioteter</Typography>

      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          onFileLoaded={handlePriorities}
          parserOptions={papaparseOptions}
        />
      </div>

      <Typography>Upload Ændringsforslag</Typography>

      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          onFileLoaded={handleChange}
          parserOptions={papaparseOptions}
        />
      </div>

      <Typography>Upload Brugere</Typography>

      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          onFileLoaded={handleUsers}
          parserOptions={papaparseOptions}
        />
      </div>
    </Card>
  );
}
