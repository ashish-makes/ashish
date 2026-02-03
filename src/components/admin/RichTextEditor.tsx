"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { CldUploadWidget } from "next-cloudinary";
import { common, createLowlight } from "lowlight";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Link as LinkIcon,
    Image as ImageIcon,
    Undo,
    Redo,
    Minus,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Highlighter,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
    RemoveFormatting,
    FileCode,
    Table as TableIcon,
    Rows3,
    Columns3,
    Trash2,
    Merge,
    Split,
    StretchHorizontal,
} from "lucide-react";
import { useEffect } from "react";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

interface ToolbarButtonProps {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
}

function ToolbarButton({ onClick, isActive, disabled, children, title }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`p-2 rounded-lg transition-colors ${isActive
                ? "bg-neutral-900 text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    );
}

function ToolbarDivider() {
    return <div className="w-px h-6 bg-neutral-200 mx-1" />;
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 underline cursor-pointer",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg max-w-full h-auto",
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Subscript,
            Superscript,
            Highlight.configure({
                multicolor: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableCell,
            TableHeader,
        ],
        content: value,
        editorProps: {
            attributes: {
                class: "rich-text-editor-content max-w-none min-h-[300px] px-4 py-3 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return (
            <div className="border border-neutral-200 rounded-2xl bg-neutral-50/50 min-h-[400px] flex items-center justify-center">
                <span className="text-neutral-400 text-sm">Loading editor...</span>
            </div>
        );
    }

    const addLink = () => {
        const url = window.prompt("Enter URL:");
        if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
    };

    const addImage = (url: string) => {
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const clearFormatting = () => {
        editor.chain().focus().clearNodes().unsetAllMarks().run();
    };

    return (
        <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white flex flex-col max-h-[600px]">
            {/* Toolbar - Always visible at top */}
            <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-neutral-100 bg-neutral-50/95 shrink-0">
                {/* Text Formatting */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="Bold (Ctrl+B)"
                >
                    <Bold className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="Italic (Ctrl+I)"
                >
                    <Italic className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive("underline")}
                    title="Underline (Ctrl+U)"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    title="Strikethrough"
                >
                    <Strikethrough className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
                    isActive={editor.isActive("highlight")}
                    title="Highlight"
                >
                    <Highlighter className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Subscript / Superscript */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    isActive={editor.isActive("subscript")}
                    title="Subscript"
                >
                    <SubscriptIcon className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    isActive={editor.isActive("superscript")}
                    title="Superscript"
                >
                    <SuperscriptIcon className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Headings */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                    title="Heading 1"
                >
                    <Heading1 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive("heading", { level: 3 })}
                    title="Heading 3"
                >
                    <Heading3 className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Text Alignment */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    isActive={editor.isActive({ textAlign: "left" })}
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    isActive={editor.isActive({ textAlign: "center" })}
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    isActive={editor.isActive({ textAlign: "right" })}
                    title="Align Right"
                >
                    <AlignRight className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    isActive={editor.isActive({ textAlign: "justify" })}
                    title="Justify"
                >
                    <AlignJustify className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Lists */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                    title="Ordered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Blocks */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                    title="Blockquote"
                >
                    <Quote className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    isActive={editor.isActive("code")}
                    title="Inline Code"
                >
                    <Code className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive("codeBlock")}
                    title="Code Block"
                >
                    <FileCode className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal Rule"
                >
                    <Minus className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Media */}
                <ToolbarButton
                    onClick={addLink}
                    isActive={editor.isActive("link")}
                    title="Add Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </ToolbarButton>

                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ashish_portfolio"}
                    onSuccess={(result) => {
                        if (result.info && typeof result.info !== "string") {
                            addImage(result.info.secure_url);
                        }
                    }}
                >
                    {({ open }) => (
                        <ToolbarButton
                            onClick={() => open()}
                            title="Upload Image"
                        >
                            <ImageIcon className="w-4 h-4" />
                        </ToolbarButton>
                    )}
                </CldUploadWidget>

                <ToolbarDivider />

                {/* Table Controls */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                    title="Insert Table"
                >
                    <TableIcon className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                    disabled={!editor.can().toggleHeaderRow()}
                    isActive={editor.isActive('tableHeader')}
                    title="Toggle Header Row"
                >
                    <StretchHorizontal className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    disabled={!editor.can().addRowAfter()}
                    title="Add Row"
                >
                    <Rows3 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    disabled={!editor.can().addColumnAfter()}
                    title="Add Column"
                >
                    <Columns3 className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().mergeCells().run()}
                    disabled={!editor.can().mergeCells()}
                    title="Merge Cells"
                >
                    <Merge className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().splitCell().run()}
                    disabled={!editor.can().splitCell()}
                    title="Split Cell"
                >
                    <Split className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    disabled={!editor.can().deleteTable()}
                    title="Delete Table"
                >
                    <Trash2 className="w-4 h-4 text-red-500" />
                </ToolbarButton>

                <ToolbarDivider />

                {/* Utilities */}
                <ToolbarButton
                    onClick={clearFormatting}
                    title="Clear Formatting"
                >
                    <RemoveFormatting className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo (Ctrl+Z)"
                >
                    <Undo className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo (Ctrl+Y)"
                >
                    <Redo className="w-4 h-4" />
                </ToolbarButton>
            </div>

            {/* Editor Content - Scrollable */}
            <div className="overflow-y-auto flex-1">
                <EditorContent editor={editor} className="bg-neutral-50/30" />
            </div>

            {/* Editor Styles - Light Mode Code Blocks */}
            <style jsx global>{`
                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #a3a3a3;
                    pointer-events: none;
                    height: 0;
                }
                .ProseMirror {
                    min-height: 300px;
                }
                .ProseMirror:focus {
                    outline: none;
                }
                .ProseMirror h1 {
                    font-size: 2em;
                    font-weight: 700;
                    margin: 1em 0 0.5em;
                }
                .ProseMirror h2 {
                    font-size: 1.5em;
                    font-weight: 600;
                    margin: 1em 0 0.5em;
                }
                .ProseMirror h3 {
                    font-size: 1.25em;
                    font-weight: 600;
                    margin: 1em 0 0.5em;
                }
                .ProseMirror ul, .ProseMirror ol {
                    padding-left: 1.75em;
                    margin: 0.75em 0;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                }
                .ProseMirror ul ul {
                    list-style-type: circle;
                }
                .ProseMirror ul ul ul {
                    list-style-type: square;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                }
                .ProseMirror ol ol {
                    list-style-type: lower-alpha;
                }
                .ProseMirror ol ol ol {
                    list-style-type: lower-roman;
                }
                .ProseMirror li {
                    margin: 0.35em 0;
                    padding-left: 0.25em;
                }
                .ProseMirror li::marker {
                    color: #737373;
                }
                .ProseMirror li p {
                    margin: 0;
                }
                .ProseMirror blockquote {
                    border-left: 3px solid #d4d4d4;
                    padding-left: 1em;
                    margin: 1em 0;
                    font-style: italic;
                    color: #525252;
                    background: #fafafa;
                    padding: 0.75em 1em;
                    border-radius: 0 0.5em 0.5em 0;
                }
                /* Light mode code blocks */
                .ProseMirror pre {
                    background: #f9fafb;
                    color: #111827;
                    border: 1px solid #f1f5f9;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                    font-family: inherit;
                    font-size: 0.9em;
                    line-height: 1.7;
                }
                .ProseMirror code {
                    background: #f1f5f9;
                    color: #0f172a;
                    padding: 0.2em 0.4em;
                    border-radius: 0.375em;
                    font-size: 0.9em;
                    font-weight: 500;
                }
                .ProseMirror pre code {
                    background: none;
                    color: inherit;
                    padding: 0;
                    font-weight: 400;
                }
                /* Syntax highlighting - premium light theme */
                .ProseMirror pre .hljs-keyword { color: #c026d3; font-weight: 500; }
                .ProseMirror pre .hljs-string { color: #059669; }
                .ProseMirror pre .hljs-number { color: #2563eb; }
                .ProseMirror pre .hljs-function { color: #0891b2; font-weight: 500; }
                .ProseMirror pre .hljs-comment { color: #94a3b8; font-style: italic; }
                .ProseMirror pre .hljs-variable { color: #ea580c; }
                .ProseMirror pre .hljs-attr { color: #7c3aed; }
                .ProseMirror pre .hljs-tag { color: #e11d48; }
                .ProseMirror pre .hljs-name { color: #e11d48; }
                .ProseMirror pre .hljs-attribute { color: #2563eb; }
                .ProseMirror pre .hljs-built_in { color: #0891b2; }
                .ProseMirror pre .hljs-title { color: #0891b2; }
                .ProseMirror pre .hljs-params { color: #475569; }
                
                .ProseMirror hr {
                    border: none;
                    border-top: 2px solid #e5e5e5;
                    margin: 2em 0;
                }
                .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.75em;
                    margin: 1em 0;
                }
                .ProseMirror mark {
                    background-color: #fef08a;
                    padding: 0.1em 0.2em;
                    border-radius: 0.2em;
                }
                .ProseMirror sub {
                    font-size: 0.75em;
                    vertical-align: sub;
                }
                .ProseMirror sup {
                    font-size: 0.75em;
                    vertical-align: super;
                }
                
                /* Table Styles */
                .ProseMirror table {
                    border-collapse: collapse;
                    table-layout: fixed;
                    width: 100%;
                    margin: 2rem 0;
                    overflow: hidden;
                    border: 1px solid #e5e5e5;
                    border-radius: 0.5rem;
                }
                .ProseMirror td, .ProseMirror th {
                    min-width: 1em;
                    border: 1px solid #e5e5e5;
                    padding: 0.75rem 1rem;
                    vertical-align: top;
                    box-sizing: border-box;
                    position: relative;
                }
                .ProseMirror th {
                    font-weight: 600;
                    text-align: left;
                    background-color: #f9fafb;
                    color: #111827;
                }
                .ProseMirror .selectedCell:after {
                    z-index: 2;
                    position: absolute;
                    content: "";
                    left: 0; right: 0; top: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.05);
                    pointer-events: none;
                }
                .ProseMirror .column-resize-handle {
                    position: absolute;
                    right: -2px;
                    top: 0;
                    bottom: 0;
                    width: 4px;
                    background-color: #3b82f6;
                    pointer-events: none;
                }
                .ProseMirror table p {
                    margin: 0;
                }
            `}</style>
        </div>
    );
}
