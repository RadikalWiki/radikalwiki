import { useState, useEffect } from "react";
import { useStyles } from "hooks";
import { ResultTab, IdentityTab, UserTab, AddIdentitiesFab } from "comps";
import { Tabs, Tab, Box, Card, Divider } from "@material-ui/core";
import { useRouter } from "next/router";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function tabProps(id: string) {
  return {
    value: id,
    id: `tab-${id}`,
    "aria-controls": `tab-${id}`,
  };
}

export default function Admin() {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = useState("users");

  useEffect(() => {
    if (router.query?.tab) {
      setValue(router.query.tab as string);
    }
  }, [router.query]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    router.push(`/admin/${newValue}`);
  };

  return (
    <Card className={classes.card}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Brugere" {...tabProps("users")} />
        <Tab label="Identiteter" {...tabProps("identities")} />
        <Tab label="Resultater" {...tabProps("results")} />
      </Tabs>
      <Divider />
      <TabPanel value={value} index={"users"}>
        <UserTab />
      </TabPanel>
      <TabPanel value={value} index={"identities"}>
        <IdentityTab />
      </TabPanel>
      {value == "identities" && <AddIdentitiesFab />}
      <TabPanel value={value} index={"results"}>
        <ResultTab />
      </TabPanel>
    </Card>
  );
}
