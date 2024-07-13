import { redirectSource } from './redirect-source';
import { exists, rm } from 'node:fs/promises';

function getHtml(dest: string) {
    let _dest = dest;
    if (!dest.startsWith('http')) {
        _dest = `https://misskey-hub.net${dest}`;
    }
    _dest = Bun.escapeHTML(_dest);
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
    <p>Redirecting you to <a href="${_dest}">${_dest}</a></p>
</body>
</html>`;   
}

function get404Html() {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>404 Not Found</title>
</head>
<body>
    <h1>404 Not Found</h1>
    <p>The requested URL was not found on this server.</p>
</body>
</html>`;
}

async function build() {
    const distDir = 'dist';
    const __dirname = import.meta.dirname;
    const distPath = `${__dirname}/../${distDir}`;
    console.log(`Building to ${distPath}`);

    if (await exists(distPath)) {
        console.log('Cleaning existing dist directory...');
        await rm(distPath, { recursive: true });
    }

    await Promise.allSettled([
        ...redirectSource.filter(([short, dest]) => {
            // shortのパスが相対で戻っていないかチェック
            if (short.includes('..')) {
                console.error(`Invalid short path: ${short}`);
                return false;
            }

            // 正しいURLかどうかをチェック
            if (dest.startsWith('http')) {
                try {
                    new URL(dest);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                try {
                    new URL(dest, 'https://misskey-hub.net');
                    return true;
                } catch (err) {
                    return false;
                }
            }
        }).map(async ([short, dest]) => {
            const html = getHtml(dest);
            const _short = short.startsWith('/') ? short.slice(1) : short;
            const path = `${distPath}/${_short}/index.html`;
            console.log(`Writing ${path}`);
            await Bun.write(path, html);
        }),
        (() => {
            console.log(`Writing ${distPath}/index.html`);
            return Bun.write(`${distPath}/index.html`, getHtml('/'))
        })(),
        (() => {
            console.log(`Writing ${distPath}/404.html`);
            return Bun.write(`${distPath}/404.html`, get404Html());
        })(),
    ]);
}

const now = performance.now();
build().then(() => {
    const time = Math.round((performance.now() - now) * 1000) / 1000;
    console.log(`Build completed in ${time}ms.`);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
