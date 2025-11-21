import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pluginDirs from 'vite-plugin-dir-builder';
import { expressMainRender, expressEntryRender } from "vite-plugin-dir-builder/render/express-router";
import { reactMainRender, reactEntryRender } from "vite-plugin-dir-builder/render/react-router";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pluginDirs({
      cache: '.cache/api',
      moduleId: '@api',
      ext: '.js',
      base: '/api',
      mainRender: expressMainRender,
      entryRender: expressEntryRender,
      entries: [
        {
          dir: 'src/admin/routes',
          pattern: [
            '**/(USE|AUTH|GET|POST|PUT|PATCH|DELETE|FILE|PARAM|ERROR).(js|ts)'
          ],
          base: 'admin'
        },
        {
          dir: 'src/auth/routes',
          pattern: [
            '**/(USE|AUTH|GET|POST|PUT|PATCH|DELETE|FILE|PARAM|ERROR).(js|ts)'
          ],
          base: 'auth'
        },
        {
          dir: 'src/portal/routes',
          pattern: [
            '**/(USE|AUTH|GET|POST|PUT|PATCH|DELETE|FILE|PARAM|ERROR).(js|ts)'
          ],
          base: 'portal'
        },
      ]
    }),
    pluginDirs({
      cache: '.cache/ui',
      moduleId: '@pages',
      ext: '.jsx',
      base: '',
      mainRender: reactMainRender,
      entryRender: reactEntryRender,
      entries: [
        {
          dir: 'src/site/routes',
          pattern: [
            '**/(PAGE|PAGE_LAYOUT|PAGE_MAIN).(jsx|tsx)'
          ],
          base: '',
        },
        {
          dir: 'src/auth/routes',
          pattern: [
            '**/(PAGE|PAGE_LAYOUT|PAGE_MAIN).(jsx|tsx)'
          ],
          base: 'auth',
        },
        {
          dir: './src/admin/routes',
          pattern: [
            '**/(PAGE|PAGE_LAYOUT|PAGE_MAIN).(jsx|tsx)'
          ],
          base: 'admin',
        },
        {
          dir: 'src/portal/routes',
          pattern: [
            '**/(PAGE|PAGE_LAYOUT|PAGE_MAIN).(jsx|tsx)'
          ],
          base: 'portal',
        },
      ]
    })
  ],
})
