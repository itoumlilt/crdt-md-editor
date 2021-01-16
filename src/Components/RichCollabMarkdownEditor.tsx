import React, { useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";
import {
  ParagraphPlugin,
  BoldPlugin,
  EditablePlugins,
  ItalicPlugin,
  UnderlinePlugin,
  pipe,
  SlateDocument,
} from "@udecode/slate-plugins";
import {
  options,
} from '../config/demo/initialValues';

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
