/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** View Layout - Select the layout of the view */
  "layout": "list" | "grid",
  /** Advanced - Keep the order of the sections while searching folders, files, etc. */
  "keepSectionOrder": boolean,
  /** Usability - Close other Windsurf windows when opening a project */
  "closeOtherWindows": boolean,
  /** Terminal App - Select which Terminal App to use when opening with a terminal */
  "terminalApp"?: import("@raycast/api").Application,
  /** Git Integration - Display the current Git branch for files and folders in Git repositories */
  "showGitBranch": boolean,
  /** Git Integration Color - Hexadecimal color code for Git branch tag (e.g., #00FF00). Leave empty to use default green */
  "gitBranchColor": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `index` command */
  export type Index = ExtensionPreferences & {}
  /** Preferences accessible in the `open-with-windsurf` command */
  export type OpenWithWindsurf = ExtensionPreferences & {}
  /** Preferences accessible in the `open-new-window` command */
  export type OpenNewWindow = ExtensionPreferences & {}
  /** Preferences accessible in the `extensions` command */
  export type Extensions = ExtensionPreferences & {}
  /** Preferences accessible in the `install-extension` command */
  export type InstallExtension = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `index` command */
  export type Index = {}
  /** Arguments passed to the `open-with-windsurf` command */
  export type OpenWithWindsurf = {}
  /** Arguments passed to the `open-new-window` command */
  export type OpenNewWindow = {}
  /** Arguments passed to the `extensions` command */
  export type Extensions = {}
  /** Arguments passed to the `install-extension` command */
  export type InstallExtension = {}
}

