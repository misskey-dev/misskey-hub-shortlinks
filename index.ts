import { redirectSource } from './redirect-source';
import { exists, rm } from 'node:fs/promises';

function getHtml(dest: string) {
    let _dest = dest;
    if (!dest.startsWith('http')) {
        _dest = `https://misskey-hub.net${dest}`;
    }
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; URL=${_dest}">
    <meta name="robots" content="noindex">
    <link rel="canonical" href="${_dest}">
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting you to <a href="${_dest}">${_dest}</a>...</p>
</body>
</html>`;   
}

async function build() {
    const distDir = 'dist';
    const __dirname = import.meta.dirname;
    const distPath = `${__dirname}/${distDir}`;
    console.log(`Building to ${distPath}`);

    if (await exists(distPath)) {
        console.log('Removing existing dist directory...');
        await rm(distPath, { recursive: true });
    }

    await Promise.allSettled([
        ...redirectSource.map(async ([short, dest]) => {
            const html = getHtml(dest);
            const path = `${distPath}/${short}/index.html`;
            console.log(`Writing ${path}`);
            await Bun.write(path, html);
        }),
        (async (): Promise<void> => {
            console.log(`Writing ${distPath}/index.html`);
            Bun.write(`${distPath}/index.html`, getHtml('/'))
        })(),
    ]);
}

build().then(() => console.log('Build completed.'));
