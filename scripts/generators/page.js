import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const PAGES_DIR = path.join(path.dirname(__filename), '../../src/pages');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatPageName(name) {
    const capitalizedName = capitalizeFirstLetter(name);
    return capitalizedName.endsWith('Page') ? capitalizedName : `${capitalizedName}Page`;
}

function generateFiles(inputName) {
    const pageName = formatPageName(inputName);
    const folderName = inputName.endsWith('Page') ?
        inputName.slice(0, -4) :
        inputName;
    const pageDir = path.join(PAGES_DIR, capitalizeFirstLetter(folderName));

    if (fs.existsSync(pageDir)) {
        throw new Error(`Страница ${pageName} уже существует`);
    }

    fs.mkdirSync(pageDir, { recursive: true });

    const componentContent = `import React from 'react';

const ${pageName}: React.FC = () => {
  return (
    <div>
      ${pageName}
    </div>
  );
};

export default ${pageName};
`;

    const asyncContent = `import { lazy } from 'react';

export const ${pageName}Async = lazy(() => import('./${pageName}'));
`;

    const indexContent = `export { ${pageName}Async as ${pageName} } from './${pageName}Async';`;

    const configPath = path.join(path.dirname(__filename), '../../src/app/router/config.tsx');
    const configContent = fs.readFileSync(configPath, 'utf-8');

    const routeName = inputName.toUpperCase();
    const componentImport = `import { ${pageName} } from '@/pages/${capitalizeFirstLetter(folderName)}';\n`;

    // Добавляем импорт компонента
    let newContent = configContent.includes(componentImport) ?
        configContent :
        configContent.replace(
            /(import.*?;\n)\n/,
            `$1${componentImport}\n`
        );

    // Добавляем новый маршрут в enum AppRoutes
    newContent = newContent.replace(
        /(export enum AppRoutes {[\s\S]*?)(})/,
        `$1  ${routeName} = '${inputName.toLowerCase()}',\n$2`
    );

    // Добавляем путь в RoutePath
    newContent = newContent.replace(
        /(export const RoutePath: Record<AppRoutes, string> = {[\s\S]*?)(};)/,
        `$1  [AppRoutes.${routeName}]: '/${inputName.toLowerCase()}',\n$2`
    );

    // Добавляем конфигурацию маршрута в routeConfig
    const routeConfigRegex = /(export const routeConfig: Record<AppRoutes, RouteObject> = {[\s\S]*?)(}\s*$)/;
    const routeConfigEntry = `
  [AppRoutes.${routeName}]: {
    path: RoutePath[AppRoutes.${routeName}],
    element: <${pageName} />,
  },\n`;

    newContent = newContent.replace(
        routeConfigRegex,
        `$1${routeConfigEntry}$2`
    );

    fs.writeFileSync(configPath, newContent);
    fs.writeFileSync(path.join(pageDir, `${pageName}.tsx`), componentContent);
    fs.writeFileSync(path.join(pageDir, `${pageName}Async.tsx`), asyncContent);
    fs.writeFileSync(path.join(pageDir, 'index.ts'), indexContent);

    console.log(`✓ Страница ${pageName} успешно создана`);
    process.exit(0);
}

async function init() {
    try {
        let pageName = process.argv[2];

        if (!pageName) {
            pageName = await new Promise((resolve) => {
                rl.question('Введите название страницы: ', (answer) => {
                    resolve(answer);
                    rl.close();
                });
            });
        }

        generateFiles(pageName);
    } catch (error) {
        console.error(`✗ ${error.message}`);
        process.exit(1);
    }
}

init();
