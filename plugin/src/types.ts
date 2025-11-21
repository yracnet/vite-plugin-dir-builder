import { mkdirSync } from "fs";
import path, { join } from "path"
import { join as joinPath } from 'node:path/posix';


export type Entry = {
    name: string,
    dir: string,
    base: string,
    pattern: string[],
    ignore: string[],
    alias: string,
    file: string,
    render: EntryRender,
}

export type Config = {
    base: string,
    alias: string,
    file: string,
    render: mainRender,
    entries: Entry[],
}

export type FileItem = {
    name: string,
    file: string,
    type: string,
    route: string,
}

export type EntryRender = (list: FileItem[], entry: Entry, config: Config) => Promise<string>;

export type mainRender = (config: Config) => Promise<string>;

export type Options = {
    moduleId?: string,
    root?: string,
    name?: string,
    ext?: string,
    cache?: string,
    base?: string,
    mainRender?: mainRender,
    entryRender?: EntryRender,
    entries?: {
        dir: string,
        base?: string,
        name?: string,
        skip?: boolean,
        pattern?: string[],
        ignore?: string[],
        render?: EntryRender,
    }[],
};


export function ensureConfig({
    root = process.cwd(),
    name = 'main',
    ext = '.js',
    moduleId = '@dir',
    cache = '.dir',
    base = '/',
    mainRender = (
        async (config) => {
            const value = JSON.stringify(config.entries.map(it => it.alias), null, 2);
            return [
                `// Alias: ${config.alias}`,
                `export default ${value}`
            ].join('\n');
        }
    ),
    entryRender = (async (data, it) => {
        const value = JSON.stringify(data, null, 2);
        return [
            `// Alias: ${it.alias}`,
            `export default ${value}`
        ].join('\n');
    }),
    entries = [{
        dir: './src',
        base: '/',
    }],
}: Options): Config {
    const duplicate = entries.find(e => e.name === name)
    if (duplicate) {
        throw new Error(`Config name "${name}" conflicts with entry name "${duplicate.name}"`)
    }
    const cacheDir = path.join(root, cache);
    mkdirSync(cacheDir, { recursive: true })
    return {
        base,
        alias: `${moduleId}/${name}${ext}`,
        file: path.join(root, cache, `${name}${ext}`),
        render: mainRender,
        entries: entries
            .filter(it => !it.skip)
            .map((it, ix) => {
                const key = ix.toString().padStart(3, '0');
                it.name = it.name ?? `e${key}`;
                return {
                    dir: path.join(root, it.dir),
                    base: it.base ?? '/',
                    name: it.name.replace(/[^a-zA-Z0-9_]/g, ''),
                    pattern: it.pattern ?? [
                        '**/*.(jsx|tsx|js|ts)'
                    ],
                    ignore: it.ignore ?? [],
                    alias: `${moduleId}/${it.name}${ext}`,
                    file: path.join(root, cache, `${it.name}${ext}`),
                    render: it.render ?? entryRender,
                };
            })
            .sort((a, b) => a.base.localeCompare(b.base))
    }
}
