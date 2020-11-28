import { Node } from "../abstract/Node";
import type { HTMLElementAttributesMap } from "../types/attributes";
import type { TopLevelHTMLElement } from "../types/elements";

export class TextLevelNode extends Node {
	private readonly textContent: string;

	public constructor(tagName: keyof TopLevelHTMLElement, textContent: string, extras: HTMLElementAttributesMap[typeof tagName]) {
		super(tagName);

		for (const [key, value] of Object.entries(extras)) {
			this.attributes[key] = value;
		}

		this.textContent = textContent;
	}

	public get fragment(): DocumentFragment {
		this.cachedFragment = document.createDocumentFragment();

		const textLevelNode = document.createElement(this.type);
		textLevelNode.textContent = this.textContent;

		for (const [key, value] of Object.entries(this.attributes)) {
			textLevelNode.setAttribute(key, value);
		}

		this.cachedFragment.appendChild(textLevelNode);

		return this.cachedFragment;
	}
}
