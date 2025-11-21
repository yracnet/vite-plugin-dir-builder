import path from "node:path";
import { join as joinURL } from "node:path/posix";
import { El } from "../../../plugin/src/el"

const buildTree = (routes) => {
    const root = { children: {} };
    for (const r of routes) {
        const parts = r.route.split("/").filter(Boolean);
        let current = root;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!current.children[part]) {
                current.children[part] = { children: {} };
            }
            current = current.children[part];
        }
        if (r.type === "PAGE_LAYOUT") {
            current.name = r.name;
        } else {
            current.children[""] = {
                name: r.name,
                children: {}
            };
        }
    }
    return root;
};

const renderTree = (path, { name, children }) => {
    const root = El.create("Route");
    if (path == "") {
        root.attr("index");
    } else {
        root.attr("path", path);
    }
    if (name) {
        root.exp("element", El.create(name));
    }
    Object.entries(children).forEach(([path, value]) => {
        root.append(renderTree(path, value));
    });
    return root;
}


export const reactMainRender = async (config) => {
    const imports = config
        .entries
        .map(r => `import R${r.name} from "${r.alias}";`)
        .join("\n");
    const root = El.create("Routes");
    config.entries
        .forEach(r => {
            const el = root.createChild("Route");
            el.attr("path", joinURL("/", config.base, r.base, "*"));
            el.exp("element", El.create(`R${r.name}`))
        });
    return `
import { Routes, Route } from 'react-router-dom';
${imports}

export default () => {
    return (
${root.toString(4, 8)}
    );
};`;
}
export const reactEntryRender = async (routes, item) => {
    const imports = routes
        .map(it => {
            it.import = path.relative(path.dirname(item.file), it.file).replace(/\\/g, '/')
            return it;
        })
        .map(r => `import ${r.name} from "${r.import}";`)
        // .map(r => `const ${r.name} = React.lazy(() => import("${r.import}"));`)
        .join("\n");
    const tree = buildTree(routes);
    const root = El.create("Routes");
    root.append(renderTree(joinURL("/", "*"), tree));
    return `
import { Routes, Route } from "react-router-dom";
${imports}

export default () => {
    return (
${root.toString(4, 8)}
    );
};`;
}