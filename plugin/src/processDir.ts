import path from 'path'
import fg from 'fast-glob'
import { FileItem } from './types';

export const processDir = ({
    cwd,
    pattern,
    ignore = [],
    base = ''
}: {
    cwd: string,
    pattern: string | string[],
    ignore?: string[],
    base?: string
}) => {
    const files = fg.globSync(pattern, {
        cwd,
        ignore: ['**/node_modules/', '**/.git/', ...ignore],
        onlyFiles: true,
        absolute: true,
        extglob: true,
    });
    const items: FileItem[] = files
        .sort()
        .map((file, ix) => {
            const name = `R${String(ix).padStart(3, '0')}`;
            const ext = path.extname(file)
            const type = path.basename(file, ext)
            const rel = path.relative(cwd, path.dirname(file));
            const route = `/${rel}`
                .replace(/\\/g, '/')
                .replace(/\[([^\]]+)\]/g, ':$1')
                .replace(/\/{2,}/g, '/');
            return {
                name,
                file,
                type,
                route,
            };
        });

    return items;
}




