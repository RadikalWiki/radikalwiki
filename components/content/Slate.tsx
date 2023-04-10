/* eslint-disable functional/immutable-data */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import isHotkey from 'is-hotkey';
import { jsx } from 'slate-hyperscript';
import {
  Editable,
  withReact,
  useSlate,
  Slate as SlateEditor,
  ReactEditor,
} from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
  Node as SlateNode,
  BaseEditor,
} from 'slate';
import { HistoryEditor, withHistory } from 'slate-history';
import {
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Popper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Link as MuiLink,
} from '@mui/material';
import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
  Link,
  LinkOff,
  Redo,
  Undo,
} from '@mui/icons-material';
import { Box } from '@mui/system';
import { Link as NextLink } from 'comps';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};
const STYLE_NAMES: Record<string, string> = {
  paragraph: 'Normal Tekst',
  'heading-one': 'Overskrift 1',
  'heading-two': 'Overskrift 2',
  'heading-three': 'Overskrift 3',
  'heading-four': 'Overskrift 4',
  'heading-five': 'Overskrift 5',
  'heading-six': 'Overskrift 6',
  'block-quote': 'Blok',
};
const STYLE_TYPES = [
  'paragraph',
  'heading-one',
  'heading-two',
  'heading-three',
  'heading-four',
  'heading-five',
  'heading-six',
  'block-quote',
];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

type EditorNode = {
  code?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
  link?: string;
};

type EditorElement = { type?: string; text: string } | SlateElement;

const ELEMENT_TAGS: Record<
  string,
  (el?: Element) => Omit<EditorElement, 'children'>
> = {
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: (el) => ({ type: 'image', url: el?.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS: Record<string, (el?: Element) => EditorNode> = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
  A: (el) => ({ link: el?.getAttribute('href') ?? '' }),
};

const deserialize = (el: any) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  const parent =
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
      ? el.childNodes[0]
      : el;

  const parentChildren: any = Array.from(parent.childNodes)
    .map(deserialize)
    .flat();
  const children: any =
    parentChildren.length === 0 ? [{ text: '' }] : parentChildren;

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child: any) => jsx('text', attrs, child));
  }

  return children;
};

const withHtml = (editor: any) => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = (element: any) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.isVoid = (element: any) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data: any) => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = deserialize(parsed.body);
      try {
        Transforms.insertFragment(editor, fragment);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    insertData(data);
  };

  return editor;
};

const validate = (value: any) => {
  if (Array.isArray(value)) return value;
  else return [{ type: 'paragraph', children: [{ text: '' }] }];
};

const Slate = ({
  value,
  onChange,
  readOnly = false,
}: {
  value?: any;
  onChange?: any;
  readOnly: boolean;
}) => {
  const editorRef = useRef<ReactEditor>();
  if (!editorRef.current)
    editorRef.current = withHtml(withHistory(withReact(createEditor() as any)));
  const editor = editorRef.current;
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const validated = validate(value);
  if (editor) {
    editor.children = validated;
  }

  return (
    <SlateEditor editor={editor!} value={validated} onChange={onChange}>
      {!readOnly && (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 1, ml: 2 }}>
            <BlockSelect />
            <HistoryButtons />
            <MarkButtons />
            <ListButtons />
            <AlignButtons />
            <LinkButton />
          </Stack>
        </>
      )}
      {(!readOnly ||
        (validated.length !== 0 && validated[0].children[0].text !== '')) && (
        <Box sx={{ m: 2 }}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            readOnly={readOnly}
            onKeyDown={(event) => {
              Object.entries(HOTKEYS).map(([hotkey, mark]) => {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  toggleMark(editor, mark);
                }
              });
            }}
          />
        </Box>
      )}
    </SlateEditor>
  );
};

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const currentBlocks = (
  editor: any,
  validBlocks: string[],
  blockType = 'type',
  prop?: string
) => {
  const { selection } = editor;
  if (!selection) return 'paragraph';

  const blocks = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        validBlocks.includes((n as any)[blockType]),
    })
  )?.[0];

  if (!blocks) return undefined;

  return blocks.length > 0
    ? blocks
        .filter((block) => (block as any)[blockType])
        ?.map((block) =>
          prop ? (block as any)[prop] : (block as any)[blockType]
        )
    : undefined;
};

const isBlockActive = (editor: any, format: string, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as any)[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false;
};

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case 'heading-four':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case 'heading-five':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      );
    case 'heading-six':
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );

    default:
      return (
        <p style={{ ...style, hyphens: 'auto' }} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  const bold = leaf.bold ? <strong>{children}</strong> : children;
  const code = leaf.code ? <em>{bold}</em> : bold;
  const underline = leaf.underline ? <u>{code}</u> : code;
  const italic = leaf.italic ? <i>{underline}</i> : underline;
  const link = leaf.link ? (
    <MuiLink component={NextLink} href={leaf.link}>
      {children}
    </MuiLink>
  ) : (
    italic
  );

  return <span {...attributes}>{link}</span>;
};

const BlockSelect = () => {
  const editor = useSlate();
  return (
    <FormControl>
      <InputLabel>Stil</InputLabel>
      <Select
        label="Stil"
        sx={{ width: 145 }}
        value={currentBlocks(editor, STYLE_TYPES) ?? 'paragraph'}
        onChange={(e) =>
          Transforms.setNodes<EditorElement>(editor, {
            type: e.target.value as string,
          })
        }
      >
        {STYLE_TYPES.map((style) => (
          <MenuItem key={style} value={style}>
            {STYLE_NAMES[style]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const HistoryButtons = () => {
  const editor = useSlate() as HistoryEditor;

  return (
    <ButtonGroup color="inherit">
      <Button
        disabled={editor.history.undos.length == 0}
        onClick={() => editor.undo()}
      >
        <Undo />
      </Button>
      <Button
        disabled={editor.history.redos.length == 0}
        onClick={() => editor.redo()}
      >
        <Redo />
      </Button>
    </ButtonGroup>
  );
};

const ListButtons = () => {
  const editor = useSlate();
  const handleBlock = (e: any, format: string) => {
    const isActive = isBlockActive(editor, format, 'type');

    Transforms.unwrapNodes<EditorElement>(editor, {
      match: (n: EditorElement) =>
        !Editor.isEditor(n) &&
        LIST_TYPES.includes((n as any).type) &&
        SlateElement.isElement(n),
      split: true,
    });
    const newProperties: any = {
      type: isActive ? 'paragraph' : 'list-item',
    };

    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={currentBlocks(editor, LIST_TYPES) ?? []}
      onChange={handleBlock}
    >
      <ToggleButton value="numbered-list">
        <FormatListNumbered />
      </ToggleButton>
      <ToggleButton value="bulleted-list">
        <FormatListBulleted />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const AlignButtons = () => {
  const editor = useSlate();
  const handleBlock = (e: any, block: string) => {
    const isActive = isBlockActive(editor, block, 'align');
    const newProperties: any = {
      align: isActive ? undefined : block,
    };
    Transforms.setNodes<SlateElement>(editor, newProperties);
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={currentBlocks(editor, TEXT_ALIGN_TYPES, 'align') ?? []}
      onChange={handleBlock}
    >
      <ToggleButton value="left">
        <FormatAlignLeft />
      </ToggleButton>
      <ToggleButton value="center">
        <FormatAlignCenter />
      </ToggleButton>
      <ToggleButton value="right">
        <FormatAlignRight />
      </ToggleButton>
      <ToggleButton value="justify">
        <FormatAlignJustify />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const MarkButtons = () => {
  const editor = useSlate();
  const marks = Editor.marks(editor);
  const handleMarks = (
    event: React.MouseEvent<HTMLElement>,
    newMarks: string[]
  ) => {
    // Symmetrical Difference
    newMarks
      .filter((mark) => !getMarks(marks).includes(mark))
      .concat(getMarks(marks).filter((x) => !newMarks.includes(x)))
      .map((mark) => toggleMark(editor, mark));
  };

  const getMarks = (marks: any) => {
    if (!marks) return [];
    return (marks.bold ? ['bold'] : [])
      .concat(marks.italic ? ['italic'] : [])
      .concat(marks.underline ? ['underline'] : []);
  };
  return (
    <ToggleButtonGroup value={getMarks(marks)} onChange={handleMarks}>
      <ToggleButton value="bold">
        <FormatBold />
      </ToggleButton>
      <ToggleButton value="italic">
        <FormatItalic />
      </ToggleButton>
      <ToggleButton value="underline">
        <FormatUnderlined />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const LinkButton = () => {
  const editor = useSlate();
  const marks = Editor.marks(editor);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleChange = (event: any) => {
    Editor.addMark(editor, 'link', event.target.value);
  };

  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        disablePortal={false}
        modifiers={[
          {
            name: 'flip',
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
        ]}
      >
        <Paper
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={(marks as any)?.link ?? ''}
            onChange={handleChange}
          />
          <IconButton
            sx={{ p: '10px' }}
            color="inherit"
            onClick={() => {
              setAnchorEl(null);
              Editor.removeMark(editor, 'link');
            }}
          >
            <LinkOff />
          </IconButton>
        </Paper>
      </Popper>
      <ToggleButton
        value="link"
        onClick={handleClick}
        selected={!!(marks as any)?.link}
      >
        <Link />
      </ToggleButton>
    </>
  );
};

export default Slate;
