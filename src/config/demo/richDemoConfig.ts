import {
  DEFAULTS_ALIGN,
  DEFAULTS_BLOCKQUOTE,
  DEFAULTS_BOLD,
  DEFAULTS_CODE,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_HEADING,
  DEFAULTS_HIGHLIGHT,
  DEFAULTS_IMAGE,
  DEFAULTS_ITALIC,
  DEFAULTS_KBD,
  DEFAULTS_LINK,
  DEFAULTS_LIST,
  DEFAULTS_MEDIA_EMBED,
  DEFAULTS_MENTION,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_SEARCH_HIGHLIGHT,
  DEFAULTS_STRIKETHROUGH,
  DEFAULTS_SUBSUPSCRIPT,
  DEFAULTS_TABLE,
  DEFAULTS_TODO_LIST,
  DEFAULTS_UNDERLINE,
  setDefaults,
  SlateDocument,
} from "@udecode/slate-plugins";
import { createParagraph } from "../../utils/leafs-plugin";

export const options = {
  ...setDefaults(DEFAULTS_PARAGRAPH, {}),
  ...setDefaults(DEFAULTS_MENTION, {}),
  ...setDefaults(DEFAULTS_BLOCKQUOTE, {}),
  ...setDefaults(DEFAULTS_CODE_BLOCK, {}),
  ...setDefaults(DEFAULTS_LINK, {}),
  ...setDefaults(DEFAULTS_IMAGE, {}),
  ...setDefaults(DEFAULTS_MEDIA_EMBED, {}),
  ...setDefaults(DEFAULTS_TODO_LIST, {}),
  ...setDefaults(DEFAULTS_TABLE, {}),
  ...setDefaults(DEFAULTS_LIST, {}),
  ...setDefaults(DEFAULTS_HEADING, {}),
  ...setDefaults(DEFAULTS_ALIGN, {}),
  ...setDefaults(DEFAULTS_BOLD, {}),
  ...setDefaults(DEFAULTS_ITALIC, {}),
  ...setDefaults(DEFAULTS_UNDERLINE, {}),
  ...setDefaults(DEFAULTS_STRIKETHROUGH, {}),
  ...setDefaults(DEFAULTS_CODE, {}),
  ...setDefaults(DEFAULTS_KBD, {}),
  ...setDefaults(DEFAULTS_SUBSUPSCRIPT, {}),
  ...setDefaults(DEFAULTS_HIGHLIGHT, {}),
  ...setDefaults(DEFAULTS_SEARCH_HIGHLIGHT, {}),
};

export const initialValuePreview: SlateDocument = [
  {
    children: [
      {
        type: options.h1.type,
        children: [
          {
            text: "👀 Preview Markdown",
          },
        ],
      },
      {
        type: options.p.type,
        children: [
          {
            text:
              "Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in `Markdown` previewing.",
          },
        ],
      },
      {
        type: options.p.type,
        children: [{ text: "- List." }],
      },
      {
        type: options.p.type,
        children: [{ text: "> Blockquote." }],
      },
      {
        type: options.p.type,
        children: [{ text: "---" }],
      },
      {
        type: options.p.type,
        children: [{ text: "## Try it out!" }],
      },
      {
        type: options.p.type,
        children: [{ text: "Try it out for yourself!" }],
      },
    ],
  },
];

export const initialValueBasicMarks: SlateDocument = [
  {
    children: [
      {
        type: options.h1.type,
        children: [
          {
            text: "🔥 Marks",
          },
        ],
      },
      {
        type: options.h2.type,
        children: [
          {
            text: "💧 Basic Marks",
          },
        ],
      },
      {
        type: options.p.type,
        children: [
          {
            text:
              "The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code.",
          },
        ],
      },
      {
        type: options.p.type,
        children: [
          {
            text:
              "You can customize the type, the component and the hotkey for each of these.",
          },
        ],
      },
      createParagraph(options, "This text is bold.", options.bold.type),
      createParagraph(options, "This text is italic.", options.italic.type),
      createParagraph(
        options,
        "This text is underlined.",
        options.underline.type
      ),
      {
        type: options.p.type,
        children: [
          {
            text: "This text is bold, italic and underlined.",
            [options.bold.type]: true,
            [options.italic.type]: true,
            [options.underline.type]: true,
          },
        ],
      },
      createParagraph(
        options,
        "This is a strikethrough text.",
        options.strikethrough.type
      ),
      createParagraph(options, "This is an inline code.", options.code.type),
      {
        type: options.p.type,
        children: [
          { text: "These are " },
          { text: "a subscript", [options.subscript.type]: true },
          { text: " and " },
          { text: "a superscript", [options.superscript.type]: true },
          { text: "." },
        ],
      },
      {
        type: options.p.type,
        children: [
          { text: "You can also press " },
          { text: "Super + B", [options.kbd.type]: true },
          { text: " to mark selected text bold or " },
          { text: "Super + I", [options.kbd.type]: true },
          { text: " to mark it italic." },
        ],
      },
      createParagraph(options, "There are many other keyboard shortcuts."),
    ] as any,
  },
];

export const initialValueHighlight: SlateDocument = [
  {
    children: [
      {
        type: options.h2.type,
        children: [
          {
            text: "🌈 Highlight",
          },
        ],
      },
      {
        type: options.p.type,
        children: [
          {
            text: "The Highlight plugin enables support for ",
          },
          {
            text: "highlights",
            [options.highlight.type]: true,
          },
          {
            text:
              ", useful when reviewing content or highlighting it for future reference.",
          },
        ],
      },
    ],
  },
];

export const initialValueBasicElements: SlateDocument = [
  {
    children: [
      {
        type: options.h1.type,
        children: [{ text: "🧱 Elements" }],
      },
      {
        type: options.h2.type,
        children: [{ text: "🔥 Basic Elements" }],
      },
      {
        type: options.p.type,
        children: [
          {
            text: "These are the most common elements, known as blocks:",
          },
        ],
      },
      {
        type: options.h1.type,
        children: [{ text: "Heading 1" }],
      },
      {
        type: options.h2.type,
        children: [{ text: "Heading 2" }],
      },
      {
        type: options.h3.type,
        children: [{ text: "Heading 3" }],
      },
      {
        type: options.h4.type,
        children: [{ text: "Heading 4" }],
      },
      {
        type: options.h5.type,
        children: [{ text: "Heading 5" }],
      },
      {
        type: options.h6.type,
        children: [{ text: "Heading 6" }],
      },
      {
        type: options.blockquote.type,
        children: [{ text: "Blockquote" }],
      },
      {
        type: options.code_block.type,
        children: [{ text: "Code block" }],
      },
    ],
  },
];

export const initialValueList: SlateDocument = [
  {
    children: [
      {
        type: options.h2.type,
        children: [{ text: "✍️ List" }],
      },
      {
        type: options.ul.type,
        children: [
          {
            type: options.li.type,
            children: [
              { type: options.p.type, children: [{ text: "Bulleted list" }] },
              {
                type: options.ul.type,
                children: [
                  {
                    type: options.li.type,
                    children: [
                      {
                        type: options.p.type,
                        children: [{ text: "support" }],
                      },
                    ],
                  },
                  {
                    type: options.li.type,
                    children: [
                      {
                        type: options.p.type,
                        children: [{ text: "nesting" }],
                      },
                      {
                        type: options.ul.type,
                        children: [
                          {
                            type: options.li.type,
                            children: [
                              {
                                type: options.p.type,
                                children: [{ text: "limitless" }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: options.ol.type,
        children: [
          {
            type: options.li.type,
            children: [
              { type: options.p.type, children: [{ text: "Numbered list" }] },
            ],
          },
        ],
      },
      {
        type: options.p.type,
        children: [
          {
            text:
              "With Slate you can build complex block types that have their own embedded content and behaviors, like rendering checkboxes inside check list items!",
          },
        ],
      },
      {
        type: options.todo_li.type,
        checked: true,
        children: [{ text: "Slide to the left." }],
      },
      {
        type: options.todo_li.type,
        checked: true,
        children: [{ text: "Slide to the right." }],
      },
      {
        type: options.todo_li.type,
        checked: false,
        children: [{ text: "Criss-cross." }],
      },
      {
        type: options.todo_li.type,
        checked: true,
        children: [{ text: "Criss-cross!" }],
      },
      {
        type: options.todo_li.type,
        checked: false,
        children: [{ text: "Cha cha real smooth…" }],
      },
      {
        type: options.todo_li.type,
        checked: false,
        children: [{ text: "Let's go to work!" }],
      },
      {
        type: options.p.type,
        children: [{ text: "Try it out for yourself!" }],
      },
    ],
  },
];
