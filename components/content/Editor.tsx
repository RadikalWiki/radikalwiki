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
import { Node, useLink } from 'hooks';
import { nhost } from 'nhost';
import { Stack } from '@mui/system';

const Editor = ({ node }: { node: Node }) => {
  const link = useLink();
  const query = node.useQuery();
  const update = node.useUpdate();
  const nodeMembers = node.useMembers();
  const data = query?.data();

  const [name, setName] = useState('');
  const [members, setMembers] = useState<
    { nodeId: string; name?: string; email?: string }[]
  >([]);
  const [content, setContent] = useState<any>();
  const [fileId, setFileId] = useState<any>();
  const [image, setImage] = useState<any>();

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
          setFileId(data?.image);
        };
        fetch();
      });
    }
  }, [query]);

  useEffect(() => {
    const fetch = async () => {
      const { presignedUrl } = await nhost.storage.getPresignedUrl({ fileId });
      setImage(presignedUrl?.url);
    };
    if (fileId) {
      fetch();
    }
  }, [fileId]);

  const handleSave = (mutable?: boolean) => async () => {
    if (!['wiki/group', 'wiki/event'].includes(query?.mimeId!)) {
      await nodeMembers.delete();
      await nodeMembers.insert({
        members: members.map((member) => ({ ...member, mimeId: undefined })),
      });
    }
    const newContent =
      content.length >= 1 && content[0].children[0].text === ''
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
                  <PublishButton node={node} />
                </ButtonGroup>
              </Stack>
            </Grid>
            {!['wiki/group', 'wiki/event'].includes(query?.mimeId!) && (
              <Grid item xs={12}>
                <AuthorTextField value={members} onChange={setMembers} />
              </Grid>
            )}
            <Grid item>
              <FileUploader
                text="Upload Billede"
                onNewFile={async ({ fileId }: { fileId: string }) => {
                  setFileId(fileId);
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
          onChange={(value: any) => setContent(structuredClone(value))}
          readOnly={false}
        />
      </Card>
    </>
  );
};

export default Editor;
