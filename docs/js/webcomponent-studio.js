import { URL } from 'url';

class Node {
    constructor(type) {
        this.children = [];
        this.type = type;
    }
    push(...items) {
        this.children.push(...items);
        return this;
    }
    unshift(...items) {
        this.children.unshift(...items);
        return this;
    }
    [Symbol.iterator]() {
        // TODO
    }
}

class AnchorNode extends Node {
    constructor(tagName, textContent, href, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.textContent = textContent;
        this.attributes.href = href;
    }
    get fragment() {
        this.cachedFragment = document.createDocumentFragment();
        const anchor = document.createElement(this.type);
        anchor.textContent = this.textContent;
        anchor.setAttribute("src", this.attributes.href);
        this.cachedFragment.appendChild(anchor);
        return this.cachedFragment;
    }
}

// <summary> should be part of a <details>
class DetailsNode extends Node {
    constructor(tagName, summary, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.summary = summary;
    }
    get fragment() {
        // TODO
    }
}

// <source> should be a part of a <picture>, <audio> or <video>
// <track> should be a part of a <audio> or <video>
class EmbeddedNode extends Node {
    constructor(tagName, sources, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.sources = sources;
    }
    get fragment() {
        // TODO
    }
}

// <legend> should be part of a <fieldset>
class FieldSetNode extends Node {
    constructor(tagName, legend, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.caption = legend;
    }
    get fragment() {
        // TODO
    }
}

// <figcaption> should be part of a <figure>
class FigureNode extends Node {
    constructor(tagName, caption, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.caption = caption;
    }
    get fragment() {
        // TODO
    }
}

class FormNode extends Node {
    constructor(tagName, method, action, encoding, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.attributes.method = method;
        this.attributes.action = action;
        this.attributes.enctype = encoding;
    }
    get fragment() {
        // TODO
    }
}

class GroupingNode extends Node {
    constructor(tagName, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
    }
    get fragment() {
        // TODO
    }
}

class IFrameNode extends Node {
    constructor(tagName, source, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.source = source;
    }
    get fragment() {
        // TODO
    }
}

// <optgroup> should be part of a <select>
// <option> should be part of a <select> or <optgroup>
class SelectNode extends Node {
    constructor(tagName, options, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
    }
    get fragment() {
        // TODO
    }
}

// <caption> should be part of a <table>
// <col> should be part of a <colgroup>
// <colgroup> should be part of a <table>
// <tbody> should be part of a <table>
// <td> should be part of a <tr>
// <tfoot> should be part of a <table>
// <th> should be part of a <tr>
// <thead> should be part of a <table>
// <tr> should be part of a <tbody>, <tfoot> or <thead>
class TableNode extends Node {
    constructor(tagName, caption, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.caption = caption;
    }
    get fragment() {
        // TODO
    }
}

class TextLevelNode extends Node {
    constructor(tagName, textContent, extras) {
        super(tagName);
        for (const [key, value] of Object.entries(extras)) {
            this.attributes[key] = value;
        }
        this.textContent = textContent;
    }
    get fragment() {
        // TODO
    }
}

function primeConstructor(node, tagName, ...args) {
    return node[tagName](tagName, ...args);
}
// eslint-disable-next-line @typescript-eslint/naming-convention
const NodeTagNameMap = {
    // Text Content
    "b": primeConstructor(TextLevelNode, "b"),
    "blockquote": primeConstructor(TextLevelNode, "blockquote"),
    "button": primeConstructor(TextLevelNode, "button"),
    "code": primeConstructor(TextLevelNode, "code"),
    "del": primeConstructor(TextLevelNode, "del"),
    "em": primeConstructor(TextLevelNode, "em"),
    "h1": primeConstructor(TextLevelNode, "h1"),
    "h2": primeConstructor(TextLevelNode, "h2"),
    "h3": primeConstructor(TextLevelNode, "h3"),
    "h4": primeConstructor(TextLevelNode, "h4"),
    "h5": primeConstructor(TextLevelNode, "h5"),
    "h6": primeConstructor(TextLevelNode, "h6"),
    "i": primeConstructor(TextLevelNode, "i"),
    "ins": primeConstructor(TextLevelNode, "ins"),
    "kbd": primeConstructor(TextLevelNode, "kbd"),
    "label": primeConstructor(TextLevelNode, "label"),
    "li": primeConstructor(TextLevelNode, "li"),
    "mark": primeConstructor(TextLevelNode, "mark"),
    "p": primeConstructor(TextLevelNode, "p"),
    "pre": primeConstructor(TextLevelNode, "pre"),
    "q": primeConstructor(TextLevelNode, "q"),
    "s": primeConstructor(TextLevelNode, "s"),
    "small": primeConstructor(TextLevelNode, "small"),
    "span": primeConstructor(TextLevelNode, "span"),
    "strong": primeConstructor(TextLevelNode, "strong"),
    "sub": primeConstructor(TextLevelNode, "sub"),
    "sup": primeConstructor(TextLevelNode, "sup"),
    "u": primeConstructor(TextLevelNode, "u"),
    // Embedded
    "audio": primeConstructor(EmbeddedNode, "audio"),
    "img": primeConstructor(EmbeddedNode, "img"),
    "picture": primeConstructor(EmbeddedNode, "picture"),
    "video": primeConstructor(EmbeddedNode, "video"),
    // Grouping
    "article": primeConstructor(GroupingNode, "article"),
    "aside": primeConstructor(GroupingNode, "aside"),
    "br": primeConstructor(GroupingNode, "br"),
    "canvas": primeConstructor(GroupingNode, "canvas"),
    "div": primeConstructor(GroupingNode, "div"),
    "footer": primeConstructor(GroupingNode, "footer"),
    "header": primeConstructor(GroupingNode, "header"),
    "hr": primeConstructor(GroupingNode, "hr"),
    "main": primeConstructor(GroupingNode, "main"),
    "nav": primeConstructor(GroupingNode, "nav"),
    "ol": primeConstructor(GroupingNode, "ol"),
    "section": primeConstructor(GroupingNode, "section"),
    "ul": primeConstructor(GroupingNode, "ul"),
    // Form-associated
    "meter": primeConstructor(GroupingNode, "meter"),
    "progress": primeConstructor(GroupingNode, "progress"),
    "textarea": primeConstructor(GroupingNode, "textarea"),
    // IFrame
    "iframe": primeConstructor(IFrameNode, "iframe"),
    // FieldSet
    "fieldset": primeConstructor(FieldSetNode, "fieldset"),
    // Form
    "form": primeConstructor(FormNode, "form"),
    // Input
    "input": primeConstructor(InputNode, "input"),
    // Select
    "select": primeConstructor(SelectNode, "select"),
    // Figure
    "figure": primeConstructor(FigureNode, "figure"),
    // Details
    "details": primeConstructor(DetailsNode, "details"),
    // Table
    "table": primeConstructor(TableNode, "table"),
    // Anchor
    "a": primeConstructor(AnchorNode, "a")
};

/* eslint-disable @typescript-eslint/typedef */
const CSS_SELECTOR = /-?([_a-z]|[\240-\377]|[0-9a-f]{1,6})([_a-z0-9-]|[\240-\377]|[0-9a-f]{1,6})*/i;
function isUrl(string) {
    try {
        // eslint-disable-next-line no-new
        new URL(string);
    }
    catch (error) {
        return false;
    }
    return true;
}
// eslint-disable-next-line complexity
function createPrimitive(tagName) {
    switch (tagName) {
        case "b":
        case "blockquote":
        case "button":
        case "code":
        case "del":
        case "em":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
        case "i":
        case "ins":
        case "kbd":
        case "label":
        case "li":
        case "mark":
        case "p":
        case "pre":
        case "q":
        case "s":
        case "small":
        case "span":
        case "strong":
        case "sub":
        case "sup":
        case "u":
            return function (selectors, textContent, extras = {}) {
                // selectors
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    textContent = selectors;
                }
                // textContent
                if (textContent !== undefined && typeof textContent !== "object") {
                    return new NodeTagNameMap[tagName](textContent, extras);
                }
                else if (typeof textContent === "object") {
                    extras = textContent;
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "audio":
        case "img":
        case "picture":
        case "video":
            return function (selectors, sources, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    // eslint-disable-next-line no-lonely-if
                    if (Array.isArray(sources)) {
                        sources = selectors;
                    }
                    else if (typeof selectors === "string") {
                        sources = [selectors];
                    }
                }
                // sources
                if (sources !== undefined && Array.isArray(sources)) {
                    return new NodeTagNameMap[tagName](sources, extras);
                }
                else if (typeof sources === "object") {
                    extras = Object.assign(Object.assign({}, sources), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](undefined, extras);
            };
        case "article":
        case "aside":
        case "br":
        case "canvas":
        case "div":
        case "footer":
        case "header":
        case "hr":
        case "main":
        case "meter":
        case "nav":
        case "ol":
        case "progress":
        case "section":
        case "textarea":
        case "ul":
            return function (selectors, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else if (typeof selectors === "object") {
                    extras = Object.assign(Object.assign({}, selectors), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "iframe":
            return function (selectors, source, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    source = selectors;
                }
                // source
                if (typeof source === "string") {
                    return new NodeTagNameMap[tagName](source, extras);
                }
                else {
                    extras = Object.assign(Object.assign({}, source), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "fieldset":
            return function (selectors, legend, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    legend = selectors;
                }
                // source
                if (typeof legend === "string") {
                    return new NodeTagNameMap[tagName](legend, extras);
                }
                else {
                    extras = Object.assign(Object.assign({}, legend), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "form":
            return function (selectors, method, action, encoding, extras = {}) {
                // selectors
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    method = selectors;
                }
                // method
                if (method !== undefined && typeof method === "string" && /^post|get|dialog$/i.test(method)) {
                    extras.method = method;
                }
                else {
                    action = method;
                }
                // action
                if (action !== undefined && typeof action === "string" && isUrl(action)) {
                    extras.action = action;
                }
                else {
                    action = encoding;
                }
                // encoding
                if (encoding !== undefined && typeof encoding === "string" && /^application\/x-www-form-urlencoded|multipart\/form-data|text\/plain$/i.test(encoding)) {
                    extras.enctype = action;
                }
                else if (typeof encoding === "object") {
                    extras = Object.assign(Object.assign({}, encoding), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "input":
            throw new Error("Not yet implemented.");
        case "select":
            return function (selectors, options, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    options = selectors;
                }
                // method
                if (options !== undefined && Array.isArray(options)) {
                    return new NodeTagNameMap[tagName](extras).push(options);
                }
                else if (typeof options === "object") {
                    extras = Object.assign(Object.assign({}, options), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "figure":
            return function (selectors, figcaption, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    figcaption = selectors;
                }
                // figcaption
                if (figcaption !== undefined && typeof figcaption === "string") {
                    return new NodeTagNameMap[tagName](figcaption, extras);
                }
                else if (typeof figcaption === "object") {
                    extras = Object.assign(Object.assign({}, figcaption), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "details":
            return function (selectors, summary, extras = {}) {
                // selectors
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                    return new NodeTagNameMap[tagName]();
                }
                else {
                    summary = selectors;
                }
                // summary
                if (summary !== undefined && typeof summary === "string") {
                    return new NodeTagNameMap[tagName](summary, extras);
                }
                else if (typeof summary === "object") {
                    extras = Object.assign(Object.assign({}, summary), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "table":
            return function (selectors, caption, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    caption = selectors;
                }
                // caption
                if (caption !== undefined && typeof caption === "string") {
                    return new NodeTagNameMap[tagName](caption, extras);
                }
                else if (typeof caption === "object") {
                    extras = Object.assign(Object.assign({}, caption), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        case "a":
            return function (selectors, textContent, href, extras = {}) {
                if (selectors !== undefined && typeof selectors === "string" && CSS_SELECTOR.test(selectors)) {
                    for (const selector of selectors.split(/#|./g)) {
                        if (selector.startsWith("#")) {
                            extras.id = selector;
                        }
                        else if (selector.startsWith(".")) {
                            if (extras.class === undefined) {
                                extras.class = "";
                            }
                            extras.class += " " + selector;
                        }
                    }
                }
                else {
                    textContent = selectors;
                }
                // textContent
                if (textContent !== undefined && typeof textContent === "string") {
                    return new NodeTagNameMap[tagName](textContent, href, extras);
                }
                else {
                    href = textContent;
                }
                // href
                if (href !== undefined && typeof href === "string" && isUrl(href)) {
                    return new NodeTagNameMap[tagName](href, href, extras);
                }
                else if (typeof textContent === "object") {
                    extras = Object.assign(Object.assign({}, textContent), extras);
                }
                // extras
                return new NodeTagNameMap[tagName](extras);
            };
        default:
            throw new Error("Unrecognized element `" + tagName + "`.");
    }
}
const b = createPrimitive("b");
globalThis.b = b;
const blockquote = createPrimitive("blockquote");
globalThis.blockquote = blockquote;
const button = createPrimitive("button");
globalThis.button = button;
const code = createPrimitive("code");
globalThis.code = code;
const del = createPrimitive("del");
globalThis.del = del;
const em = createPrimitive("em");
globalThis.em = em;
const h1 = createPrimitive("h1");
globalThis.h1 = h1;
const h2 = createPrimitive("h2");
globalThis.h2 = h2;
const h3 = createPrimitive("h3");
globalThis.h3 = h3;
const h4 = createPrimitive("h4");
globalThis.h4 = h4;
const h5 = createPrimitive("h5");
globalThis.h5 = h5;
const h6 = createPrimitive("h6");
globalThis.h6 = h6;
const ins = createPrimitive("ins");
globalThis.ins = ins;
const kbd = createPrimitive("kbd");
globalThis.kbd = kbd;
const label = createPrimitive("label");
globalThis.label = label;
const li = createPrimitive("li");
globalThis.li = li;
const mark = createPrimitive("mark");
globalThis.mark = mark;
const p = createPrimitive("p");
globalThis.p = p;
const pre = createPrimitive("pre");
globalThis.pre = pre;
const q = createPrimitive("q");
globalThis.q = q;
const s = createPrimitive("s");
globalThis.s = s;
const small = createPrimitive("small");
globalThis.small = small;
const span = createPrimitive("span");
globalThis.span = span;
const strong = createPrimitive("strong");
globalThis.strong = strong;
const sub = createPrimitive("sub");
globalThis.sub = sub;
const sup = createPrimitive("sup");
globalThis.sup = sup;
const u = createPrimitive("u");
globalThis.u = u;
const audio = createPrimitive("audio");
globalThis.audio = audio;
const img = createPrimitive("img");
globalThis.img = img;
const picture = createPrimitive("picture");
globalThis.picture = picture;
const video = createPrimitive("video");
globalThis.video = video;
const article = createPrimitive("article");
globalThis.article = article;
const aside = createPrimitive("aside");
globalThis.aside = aside;
const br = createPrimitive("br");
globalThis.br = br;
const canvas = createPrimitive("canvas");
globalThis.canvas = canvas;
const div = createPrimitive("div");
globalThis.div = div;
const footer = createPrimitive("footer");
globalThis.footer = footer;
const header = createPrimitive("header");
globalThis.header = header;
const hr = createPrimitive("hr");
globalThis.hr = hr;
const main = createPrimitive("main");
globalThis.main = main;
const meter = createPrimitive("meter");
globalThis.meter = meter;
const nav = createPrimitive("nav");
globalThis.nav = nav;
const ol = createPrimitive("ol");
globalThis.ol = ol;
const progress = createPrimitive("progress");
globalThis.progress = progress;
const section = createPrimitive("section");
globalThis.section = section;
const textarea = createPrimitive("textarea");
globalThis.textarea = textarea;
const ul = createPrimitive("ul");
globalThis.ul = ul;
const iframe = createPrimitive("iframe");
globalThis.iframe = iframe;
const fieldset = createPrimitive("fieldset");
globalThis.fieldset = fieldset;
const form = createPrimitive("form");
globalThis.form = form;
const select = createPrimitive("select");
globalThis.select = select;
const figure = createPrimitive("figure");
globalThis.figure = figure;
const details = createPrimitive("details");
globalThis.details = details;
const table = createPrimitive("table");
globalThis.table = table;
const a = createPrimitive("a");
globalThis.a = a;

export { a, article, aside, audio, b, blockquote, br, button, canvas, code, del, details, div, em, fieldset, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hr, iframe, img, ins, kbd, label, li, main, mark, meter, nav, ol, p, picture, pre, progress, q, s, section, select, small, span, strong, sub, sup, table, textarea, u, ul, video };