import { Card } from '@mui/material';
import { Content, ContentToolbar, MemberChips } from 'comps';
import { Node, useScreen } from 'hooks';
import { useState } from 'react';

const ContentApp = (param: { node: Node; hideMembers?: boolean }) => {
  const screen = useScreen();
  const [expand, setExpand] = useState(true);
  return (
    <>
      {!screen && <ContentToolbar node={param.node} child={false} />}
      <Card sx={{ m: 0 }}>
        {!param.hideMembers && <MemberChips node={param.node} />}
        <Content node={param.node} fontSize={screen ? '150%' : '100%'} />
      </Card>
    </>
  );
};

export default ContentApp;
