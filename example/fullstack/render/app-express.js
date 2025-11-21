import { join as joinURL } from "node:path/posix";

export const apiRender = async (config) => {

    const imports = config.entries
        .map(r => `import ${r.name} from "${r.alias}";`)
        .join("\n");

    const routeLines = config.entries
        .map(r => {
            const route = joinURL("/", config.base);
            return `router.use("${route}", ${r.name});`;
        })
        .join("\n");
    return `
import { Router } from "express";
const router = new Router();
${imports}
${routeLines}
export default router;
    `
}

export const apiEntryRender = async (routes, item) => {
    const mapper = ["USE", "AUTH", "GET", "POST", "PUT", "PATCH", "DELETE", "FILE", "PARAM", "ERROR"].reduce((acc, type, ix) => {
        acc[type] = {
            priority: ix,
            method: type.toLocaleLowerCase()
        }
        return acc;
    }, {});

    const typePriority = ["USE", "AUTH", "GET", "POST", "PUT", "PATCH", "DELETE", "FILE", "PARAM", "ERROR"].reduce((acc, type, ix) => {
        acc[type] = ix.toString().padStart(3, '0')
        return acc;
    }, {});
    const sortedRoutes = [...routes]
        .map(it => {
            const keys = it.route
                .split('/')
                .filter(Boolean)
                .map(it => {
                    const prefix = it.startsWith(':') ? typePriority.PARAM : typePriority.FILE;
                    return `${prefix}_${it}`;
                })
            keys.push(typePriority[it.type]);
            keys.push(it.type);
            it.o = keys.join("_");
            return it;
        }).sort((a, b) => {
            return a.o.localeCompare(b.o);
        });
    const imports = sortedRoutes
        .map(r => `import ${r.name} from "${r.file}";`)
        .join("\n");
    console.log("Rewrite");
    const routeLines = sortedRoutes
        .map(r => {
            const route = joinURL("/", item.base, r.route);
            switch (r.type) {
                case "USE":
                case "AUTH":
                case "ERROR":
                    return `router.use   ("${route}", ${r.name});`;
                case "GET":
                case "POST":
                case "PUT":
                case "PATCH":
                case "DELETE":
                    return `router.${r.type.toLowerCase().padEnd(6)}("${route}", ${r.name});`;
                default:
                    return "";
            }
        })
        .join("\n");

    const route = joinURL("/", item.base);
    return `
import { Router } from "express";
${imports}

const router = new Router();
${routeLines}
export default router;

`;
}