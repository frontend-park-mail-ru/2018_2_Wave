import createMenu from "../menu/menu";
import addButtonListener from "../addbuttonlistener";

import settingsTemplate from "./settings.pug"

export default function createSettings() {
	
	root.innerHTML = settingsTemplate()
	addButtonListener("menuButton", createMenu);

	console.log("settings block created");
}