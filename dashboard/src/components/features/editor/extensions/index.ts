import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import SlashCommand from "./slash-command";
import { InputRule } from "@tiptap/core";
import UploadImagesPlugin from "../plugins/upload-images";
import UpdatedImage from "./updated-image";
import CustomKeymap from "./custom-keymap";
import DragAndDrop from "./drag-and-drop";

export const defaultExtensions = [
    StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                style: "list-style-type: disc; list-style-position: outside; line-height: 12px; ",
                class: "mailrun",
            },
        },
        orderedList: {
            HTMLAttributes: {
                style: "list-style-type: deciaml; list-style-position: outside; line-height: 12px;",
                class: "mailrun",
            },
        },
        listItem: {
            HTMLAttributes: {
                style: "line-height: 1.5;",
                class: "mailrun",
            },
        },
        blockquote: {
            HTMLAttributes: {
                style: "border-left: 4px solid rgb(214 211 209); padding-left: 8px;",
                class: "mailrun"
            },
        },
        codeBlock: {
            HTMLAttributes: {
                class:
                    "mailrun rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800",
            },
        },
        code: {
            HTMLAttributes: {
                class:
                    "mailrun rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
                spellcheck: "false",
            },
        },
        dropcursor: {
            color: "#DBEAFE",
            width: 4,
        },
        gapcursor: false,
        horizontalRule: false,
        paragraph: {
            HTMLAttributes: {
                class: "mailrun",
            },
        },
        heading: {
            levels: [1, 2, 3],
            HTMLAttributes: {
                // style: "",
                class: "mailrun",
            }
        }
    }),
    // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
    HorizontalRule.extend({
        addInputRules() {
            return [
                new InputRule({
                    find: /^(?:---|—-|___\s|\*\*\*\s)$/,
                    handler: ({ state, range }) => {
                        const attributes = {};

                        const { tr } = state;
                        const start = range.from;
                        let end = range.to;

                        tr.insert(start - 1, this.type.create(attributes)).delete(
                            tr.mapping.map(start),
                            tr.mapping.map(end)
                        );
                    },
                }),
            ];
        },
    }).configure({
        HTMLAttributes: {
            class: "mt-4 mb-6 border-t border-stone-300",
        },
    }),
    TiptapLink.configure({
        HTMLAttributes: {
            class:
                "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
        },
    }),
    TiptapImage.extend({
        addProseMirrorPlugins() {
            return [UploadImagesPlugin()];
        },
    }).configure({
        allowBase64: true,
        HTMLAttributes: {
            class: "rounded-lg border border-stone-200",
        },
    }),
    UpdatedImage.configure({
        HTMLAttributes: {
            class: "rounded-lg border border-stone-200",
        },
    }),
    Placeholder.configure({
        placeholder: ({ node }) => {
            if (node.type.name === "heading") {
                return `Heading ${node.attrs.level}`;
            }
            return "Press '/' for commands";
        },
        includeChildren: true,
    }),
    SlashCommand,
    TiptapUnderline,
    TextStyle,
    Color,
    Highlight.configure({
        multicolor: true,
    }),
    CustomKeymap,
    DragAndDrop,
];