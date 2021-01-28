import "tippy.js/dist/tippy.css";
import "./Styles/RichCollabMarkdownEditor.css";
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
import { autoformatRules } from "../config/autoformatRules";
import { options, optionsResetBlockTypes } from "../config/defaults";
import {
  initialValueList,
  initialValueBasicElements,
  initialValueHighlight,
  initialValueBasicMarks,
  initialValuePreview,
} from "../config/demo/richDemoConfig";
import { MENTIONABLES } from "../config/mentionables";
import { InputSearchHighlight } from "./Widgets/InputSearchHighlight";

export interface RichMDEdProps {
  value?: string; // set a default value (or DEFAULT_VALUE is unbefined)
}

/**
 * An init value for the demo
 */
const initialValue: Node[] = [
  ...initialValueBasicMarks,
  ...initialValueHighlight,
  ...initialValueBasicElements,
  ...initialValueList,
  ...initialValuePreview,
];

const plugins = [
  ParagraphPlugin(options),
  BlockquotePlugin(options),
  TodoListPlugin(options),
  HeadingPlugin(options),
  ImagePlugin(options),
  LinkPlugin(options),
  ListPlugin(options),
  MentionPlugin(options),
  TablePlugin(options),
  MediaEmbedPlugin(options),
  CodeBlockPlugin(options),
  AlignPlugin(options),
  BoldPlugin(options),
  CodePlugin(options),
  ItalicPlugin(options),
  HighlightPlugin(options),
  SearchHighlightPlugin(options),
  UnderlinePlugin(options),
  StrikethroughPlugin(options),
  SubscriptPlugin(options),
  SuperscriptPlugin(options),
  ResetBlockTypePlugin(optionsResetBlockTypes),
  SoftBreakPlugin({
    rules: [
      { hotkey: "shift+enter" },
      {
        hotkey: "enter",
        query: {
          allow: [
            options.code_block.type,
            options.blockquote.type,
            options.td.type,
          ],
        },
      },
    ],
  }),
  ExitBreakPlugin({
    rules: [
      {
        hotkey: "mod+enter",
      },
      {
        hotkey: "mod+shift+enter",
        before: true,
      },
      {
        hotkey: "enter",
        query: {
          start: true,
          end: true,
          allow: headingTypes,
        },
      },
    ],
  }),
];

const withPlugins = [
  withReact,
  withHistory,
  withTable(options),
  withLink(),
  withList(options),
  withDeserializeHTML({ plugins }),
  withMarks(),
  withImageUpload(),
  withAutoformat({ rules: autoformatRules }),
  withNormalizeTypes({
    rules: [{ path: [0, 0], strictType: options.h1.type }],
  }),
  withTrailingNode({ type: options.p.type, level: 1 }),
  withInlineVoid({ plugins }),
  withSelectOnBackspace({ allow: [ELEMENT_IMAGE] }),
] as const;

export default function RichMDEd(props: RichMDEdProps) {
  const [search, setSearchHighlight] = useState("");
  const decorate = [decorateSearchHighlight({ search })];

  const [value, setValue] = useState<Node[]>(initialValue);
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  const {
    index,
    search: mentionSearch,
    target,
    values,
    onChangeMention,
    onKeyDownMention,
  } = useMention(MENTIONABLES, {
    maxSuggestions: 10,
  });

  const onKeyDown = [onKeyDownMention];

  return (
    <div className="RichCollabMarkdownEditor">
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => {
          setValue(newValue as SlateDocument);

          onChangeMention(editor);
        }}
      >
        <InputSearchHighlight icon={Search} setSearch={setSearchHighlight} />
        <HeadingToolbar styles={{ root: { flexWrap: "wrap" } }}>
          {/* Elements */}
          <ToolbarElement type={options.h1.type} icon={<LooksOne />} />
          <ToolbarElement type={options.h2.type} icon={<LooksTwo />} />
          <ToolbarElement type={options.h3.type} icon={<Looks3 />} />
          <ToolbarElement type={options.h4.type} icon={<Looks4 />} />
          <ToolbarElement type={options.h5.type} icon={<Looks5 />} />
          <ToolbarElement type={options.h6.type} icon={<Looks6 />} />
          <ToolbarList
            {...options}
            typeList={options.ul.type}
            icon={<FormatListBulleted />}
          />
          <ToolbarList
            {...options}
            typeList={options.ol.type}
            icon={<FormatListNumbered />}
          />
          <ToolbarElement
            type={options.blockquote.type}
            icon={<FormatQuote />}
          />
          <ToolbarElement type={options.code_block.type} icon={<CodeBlock />} />

          {/* Marks */}
          <ToolbarMark type={MARK_BOLD} icon={<FormatBold />} />
          <ToolbarMark type={MARK_ITALIC} icon={<FormatItalic />} />
          <ToolbarMark type={MARK_UNDERLINE} icon={<FormatUnderlined />} />
          <ToolbarMark
            type={MARK_STRIKETHROUGH}
            icon={<FormatStrikethrough />}
          />
          <ToolbarMark type={MARK_CODE} icon={<CodeAlt />} />
          <ToolbarMark
            type={MARK_SUPERSCRIPT}
            clear={MARK_SUBSCRIPT}
            icon={<Superscript />}
          />
          <ToolbarMark
            type={MARK_SUBSCRIPT}
            clear={MARK_SUPERSCRIPT}
            icon={<Subscript />}
          />

          <ToolbarAlign icon={<FormatAlignLeft />} />
          <ToolbarAlign
            type={options.align_center.type}
            icon={<FormatAlignCenter />}
          />
          <ToolbarAlign
            type={options.align_right.type}
            icon={<FormatAlignRight />}
          />
          <ToolbarAlign
            type={options.align_justify.type}
            icon={<FormatAlignJustify />}
          />
          <ToolbarLink {...options} icon={<Link />} />
          <ToolbarImage {...options} icon={<Image />} />
        </HeadingToolbar>
        <BalloonToolbar arrow>
          <ToolbarMark
            reversed
            type={MARK_BOLD}
            icon={<FormatBold />}
            tooltip={{ content: "Bold (⌘B)" }}
          />
          <ToolbarMark
            reversed
            type={MARK_ITALIC}
            icon={<FormatItalic />}
            tooltip={{ content: "Italic (⌘I)" }}
          />
          <ToolbarMark
            reversed
            type={MARK_UNDERLINE}
            icon={<FormatUnderlined />}
            tooltip={{ content: "Underline (⌘U)" }}
          />
        </BalloonToolbar>
        <MentionSelect at={target} valueIndex={index} options={values} />
        <EditablePlugins
          plugins={plugins}
          decorate={decorate}
          decorateDeps={[search]}
          renderLeafDeps={[search]}
          onKeyDown={onKeyDown}
          onKeyDownDeps={[index, mentionSearch, target]}
          placeholder="Enter some plain text..."
        />
      </Slate>
    </div>
  );
}
