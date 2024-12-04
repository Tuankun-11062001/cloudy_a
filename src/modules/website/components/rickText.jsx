"use client";

import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import TableRow from "@tiptap/extension-table-row";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback } from "react";
import { appSvg } from "../../../data/svg";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="control_group">
      <div className="table">
        <p>Table</p>
        <div className="table_childs kid">
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            Insert table
          </button>

          <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.can().addColumnBefore()}
          >
            Add column before
          </button>
          <button
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
          >
            Add column after
          </button>
          <button
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!editor.can().deleteColumn()}
          >
            Delete column
          </button>
          <button
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.can().addRowBefore()}
          >
            Add row before
          </button>
          <button
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
          >
            Add row after
          </button>
          <button
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!editor.can().deleteRow()}
          >
            Delete row
          </button>
          <button
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!editor.can().deleteTable()}
          >
            Delete table
          </button>
          <button
            onClick={() => editor.chain().focus().mergeCells().run()}
            disabled={!editor.can().mergeCells()}
          >
            Merge cells
          </button>
          <button
            onClick={() => editor.chain().focus().splitCell().run()}
            disabled={!editor.can().splitCell()}
          >
            Split cell
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
            disabled={!editor.can().toggleHeaderColumn()}
          >
            ToggleHeaderColumn
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderRow().run()}
            disabled={!editor.can().toggleHeaderRow()}
          >
            Toggle header row
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            disabled={!editor.can().toggleHeaderCell()}
          >
            Toggle header cell
          </button>
          <button
            onClick={() => editor.chain().focus().mergeOrSplit().run()}
            disabled={!editor.can().mergeOrSplit()}
          >
            Merge or split
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .setCellAttribute("backgroundColor", "#FAF594")
                .run()
            }
            disabled={
              !editor.can().setCellAttribute("backgroundColor", "#FAF594")
            }
          >
            Set cell attribute
          </button>
          <button
            onClick={() => editor.chain().focus().fixTables().run()}
            disabled={!editor.can().fixTables()}
          >
            Fix tables
          </button>
          <button
            onClick={() => editor.chain().focus().goToNextCell().run()}
            disabled={!editor.can().goToNextCell()}
          >
            Go to next cell
          </button>
          <button
            onClick={() => editor.chain().focus().goToPreviousCell().run()}
            disabled={!editor.can().goToPreviousCell()}
          >
            Go to previous cell
          </button>
        </div>
      </div>
      <div className="align">
        <p>Align</p>
        <div className="align_childs">
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            Left
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            Center
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            Right
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
            }
          >
            Justify
          </button>
        </div>
      </div>

      <div className="style">
        <p>Style</p>
        <div className="style_childs">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            {appSvg.bold}
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            {appSvg.italic}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            {appSvg.strike}
          </button>
        </div>
      </div>

      <div className="heading">
        <p>Heading</p>
        <div className="heading_childs">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            {appSvg.h1}
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            {appSvg.h2}
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            {appSvg.h3}
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            {appSvg.h4}
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }
          >
            {appSvg.h5}
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 }) ? "is-active" : ""
            }
          >
            {appSvg.h6}
          </button>
        </div>
      </div>

      <div className="list">
        <p>List</p>
        <div className="list_childs">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            {appSvg.bulletList}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            {appSvg.ortherList}
          </button>
        </div>
      </div>

      <div className="code">
        <p>Code</p>
        <div className="code_childs">
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            {appSvg.code}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            {appSvg.codeBlock}
          </button>
        </div>
      </div>

      <div className="line">
        <p>line</p>
        <div className="line_childs">
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            {appSvg.horizontalRule}
          </button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()}>
            {appSvg.newLine}
          </button>
        </div>
      </div>

      <div className="link">
        <p>Link</p>
        <div className="link_childs">
          <button
            onClick={setLink}
            className={editor.isActive("link") ? "is-active" : ""}
          >
            Set link
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            Unset link
          </button>
        </div>
      </div>

      <div className="clear_node">
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
      </div>

      <div className="paragraph">
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>
      </div>

      <div className="highlight">
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "is-active" : ""}
        >
          Highlight
        </button>
      </div>
      <div className="clearMark">
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          {appSvg.clearMark}
        </button>
      </div>
      <div className="image">
        <button
          onClick={() => {
            const url = window.prompt("URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          {appSvg.image}
        </button>
      </div>
      <div className="video">
        <button
          onClick={() => {
            const url = prompt("Enter YouTube URL");

            if (url) {
              editor.commands.setYoutubeVideo({
                src: url,
              });
            }
          }}
        >
          {appSvg.video}
        </button>
      </div>

      <div className="quote">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          {appSvg.quote}
        </button>
      </div>

      <div className="undo">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          {appSvg.undo}
        </button>
      </div>
      <div className="redo">
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>

      <div className="color">
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          {appSvg.color}
        </button>
      </div>
    </div>
  );
};

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

const extensions = [
  Document,
  Image,
  Dropcursor,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight,
  Table.configure({
    resizable: true,
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
  TableRow,
  TableHeader,
  // Default TableCell
  // TableCell,
  // Custom TableCell with backgroundColor attribute
  CustomTableCell,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const TipTap = ({ change, state }) => {
  return (
    <div className="box_editor">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={state}
        onUpdate={(editor) => change(editor.editor.getHTML())}
      ></EditorProvider>
    </div>
  );
};

export default TipTap;
