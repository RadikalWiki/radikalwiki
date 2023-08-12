import React, { useState, useEffect, startTransition } from 'react';
import {
  AuthorTextField,
  AutoButton,
  Slate,
  FileUploader,
  Image,
  DeleteButton,
  PublishButton,
} from 'comps';
import { resolved } from 'gql';
import { Card, CardContent, TextField, Grid, ButtonGroup } from '@mui/material';
import { Save } from '@mui/icons-material';
import { Node, useLink, useFile } from 'hooks';
import { Stack } from '@mui/system';
import { Descendant } from 'slate';
import { CustomElement } from 'core/types/slate';

const Editor = ({ node }: { node: Node }) => {
  const link = useLink();
  const query = node.useQuery();
  const update = node.useUpdate();
  const nodeMembers = node.useMembers();
  const data = query?.data();
  const [fileId, setFileId] = useState<string | undefined>();
  const image = useFile({ fileId: fileId ?? data?.image, image: true });

  const [name, setName] = useState('');
  const [members, setMembers] = useState<
    { nodeId: string; name?: string; email?: string }[]
  >([]);
  const [content, setContent] = useState<Descendant[]>([]);
  const [authorError, setAuthorError] = useState<string | undefined>();

  useEffect(() => {
    if (query) {
      startTransition(() => {
        if (!['wiki/group', 'wiki/event'].includes(query?.mimeId!)) {
          const fetchMembers = async () => {
            const members = await resolved(() =>
              query?.members().map(({ nodeId, name, email, node }) => ({
                nodeId: nodeId!,
                name: name!,
                email: email!,
                mimeId: node?.mimeId,
              }))
            );
            if (
              members?.[0]?.nodeId ||
              members?.[0]?.email ||
              members?.[0]?.name
            )
              setMembers(members);
          };
          fetchMembers();
        }
        const fetch = async () => {
          setName(query.name ?? '');
          setContent(structuredClone(data?.content));
        };
        fetch();
      });
    }
  }, [query, JSON.stringify(data?.content)]);

  const handleSave = (mutable?: boolean) => async () => {
    if (
      !['wiki/group', 'wiki/event', 'vote/position', 'vote/candidate', 'wiki/folder'].includes(
        query?.mimeId!
      )
    ) {
      if (members.length === 0) {
        setAuthorError('Tilføj mindst 1 forfatter');
        return;
      }
      await nodeMembers.delete();
      await nodeMembers.insert({
        members: members.map((member) => ({ ...member, mimeId: undefined })),
      });
    }
    const newContent =
      content?.length >= 1 &&
      (content[0] as CustomElement).children?.[0].text === ''
        ? content.slice(1)
        : content;

    await update({
      set: { name, data: { content: newContent, image: fileId }, mutable },
    });
    link.push([]);
  };

  return (
    <>
      <Card sx={{ m: 0 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack spacing={2} direction={'row'} alignItems="center">
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Titel"
                  variant="outlined"
                  fullWidth
                  multiline
                />
                <ButtonGroup>
                  <DeleteButton node={node} />
                  <AutoButton
                    text="Gem"
                    icon={<Save />}
                    onClick={handleSave()}
                  />
                  <PublishButton node={node} handlePublish={handleSave(false)} />
                </ButtonGroup>
              </Stack>
            </Grid>
            {![
              'wiki/group',
              'wiki/event',
              'vote/position',
              'vote/candidate',
            ].includes(query?.mimeId!) && (
              <Grid item xs={12}>
                <AuthorTextField
                  value={members}
                  onChange={setMembers}
                  setAuthorError={setAuthorError}
                  authorError={authorError}
                />
              </Grid>
            )}
            <Grid item>
              <FileUploader
                text="Upload Billede"
                onNewFile={({ fileId }: { fileId?: string }) => {
                  fileId && setFileId(fileId);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                {image && (
                  <Grid item xs={3}>
                    <Image alt="Billede for indhold" src={image} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Slate
          value={content}
          onChange={(value) => setContent(structuredClone(value))}
          readOnly={false}
        />
      </Card>
    </>
  );
};

export default Editor;
