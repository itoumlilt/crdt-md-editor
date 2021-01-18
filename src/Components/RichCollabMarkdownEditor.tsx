import "tippy.js/dist/tippy.css";
import React, { useMemo, useState } from "react";
import { CodeAlt } from "@styled-icons/boxicons-regular/CodeAlt";
import { CodeBlock } from "@styled-icons/boxicons-regular/CodeBlock";
import { Subscript, Superscript } from "@styled-icons/foundation";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatAlignJustify,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Image,
  Link,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
  Search,
} from "@styled-icons/material";
import {
  AlignPlugin,
  BalloonToolbar,
  BlockquotePlugin,
  BoldPlugin,
  CodeBlockPlugin,
  CodePlugin,
  decorateSearchHighlight,
  EditablePlugins,
  ELEMENT_IMAGE,
  ExitBreakPlugin,
  HeadingPlugin,
  HeadingToolbar,
  HighlightPlugin,
  ImagePlugin,
  ItalicPlugin,
  LinkPlugin,
  ListPlugin,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  MediaEmbedPlugin,
  MentionPlugin,
  MentionSelect,
  ParagraphPlugin,
  pipe,
  ResetBlockTypePlugin,
  SearchHighlightPlugin,
  SlateDocument,
  SoftBreakPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  TablePlugin,
  TodoListPlugin,
  ToolbarAlign,
  ToolbarElement,
  ToolbarImage,
  ToolbarLink,
  ToolbarList,
  ToolbarMark,
  ToolbarSearchHighlight,
  UnderlinePlugin,
  useMention,
  withAutoformat,
  withDeserializeHTML,
  withImageUpload,
  withInlineVoid,
  withLink,
  withList,
  withMarks,
  withNormalizeTypes,
  withTable,
  withTrailingNode,
  withSelectOnBackspace,
} from "@udecode/slate-plugins";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import { headingTypes } from "../config/types";
import { options } from "../config/demo/initialValues";

export interface RichMDEdProps {
  value?: string; // set a default value (or DEFAULT_VALUE is unbefined)
}

/**
 * An init value for the demo
 */
const initialValue: Node[] = [
  {
    type: options.p.type,
    children: [
      {
        text: "This text is bold, italic and underlined",
        [options.bold.type]: true,
        [options.italic.type]: true,
        [options.underline.type]: true,
      },
    ],
  },
];

const plugins = [
  ParagraphPlugin(),
  BoldPlugin(),
  ItalicPlugin(),
  UnderlinePlugin(),
];

const withPlugins = [withReact, withHistory] as const;

export default function RichMDEd(props: RichMDEdProps) {
  const [value, setValue] = useState<Node[]>(initialValue);
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue as SlateDocument)}
    >
      <EditablePlugins plugins={plugins} placeholder="Enter some text..." />
    </Slate>
  );
}
