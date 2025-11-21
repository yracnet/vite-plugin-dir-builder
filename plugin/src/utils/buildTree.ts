import { FileItem } from "src/types";

type Node = { item?: FileItem, children: { [key: string]: Node } };

type OnEnd = (node: Node, item: FileItem) => void;

const buildTree = (routes: FileItem[], onEnd?: OnEnd) => {
    const root: Node = { children: {} };
    for (const item of routes) {
        const parts = item.route.split("/").filter(Boolean);
        let current = root;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!current.children[part]) {
                current.children[part] = { children: {} };
            }
            current = current.children[part];
        }
        if (onEnd) {
            onEnd(current, item);
        } else {
            current.item = item;
        }
    }
    return root;
};

export default buildTree;