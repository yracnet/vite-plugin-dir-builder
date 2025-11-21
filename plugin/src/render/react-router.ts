import path from "node:path";
import { join as joinURL } from "node:path/posix";
import El from "../utils/buildEl";
import buildTree from "../utils/buildTree";
import { EntryRender, FileItem, MainRender } from "src/types";

type Tree = { name?: string, children: { [key: string]: Tree } }

const renderTree = (path: string, { name, children }: Tree) => {
    const root = El.create("Route");
    if (path == "") {
        root.attr("index");
    } else {
        root.attr("path", path);
    }
    if (name) {
        root.exp("element", El.create(name).toString());
    }
    Object.entries(children).forEach(([path, value]) => {
        root.append(renderTree(path, value));
    });
    return root;
}

export const reactEntryRender: EntryRender = async (routes, item) => {
    const imports = routes
        .map(it => {
            const importFile = path.relative(path.dirname(item.file), it.file).replace(/\\/g, '/')
            return { ...it, importFile };
        })
        .map(r => `import ${r.name} from "${r.importFile}";`)
        // .map(r => `const ${r.name} = React.lazy(() => import("${r.importFile}"));`)
        .join("\n");
    const tree: Tree = buildTree(routes, (current: Tree, item: FileItem) => {
        if (item.type === "PAGE_LAYOUT") {
            current.name = item.name;
        } else {
            current.children[""] = {
                name: item.name,
                children: {}
            };
        }
    });
    const root = El.create("Routes");
    root.append(renderTree("/", tree));
    const name = `R${item.name}`;
    return `
import { Routes, Route } from "react-router-dom";
${imports}

const ${name}Routes = () => {
    return (
${root.toString(4, 8)}
    );
};

export default ${name}Routes;`;
}



export const reactMainRender: MainRender = async (config) => {
    const imports = config
        .entries
        .map(r => `import R${r.name} from "${r.alias}";`)
        .join("\n");
    const root = El.create("Routes");
    config.entries
        .forEach(r => {
            const el = root.createChild("Route");
            el.attr("path", joinURL("/", config.base, r.base, "*"));
            el.exp("element", El.create(`R${r.name}`).toString())
        });
    const name = `R${config.name}`;
    return `
import { Routes, Route } from 'react-router-dom';
${imports}

const ${name}Routes = () => {
    return (
${root.toString(4, 8)}
    );
};

export default ${name}Routes;`;
}
