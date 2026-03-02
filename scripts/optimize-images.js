const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

async function findImages(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(await findImages(fullPath));
        } else if (/\.(png|jpe?g|gif)$/i.test(entry.name)) {
            // Skip if a .webp version already exists
            const webpPath = fullPath.replace(/\.(png|jpe?g|gif)$/i, '.webp');
            if (!fs.existsSync(webpPath)) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

async function convert(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const outPath = filePath.replace(/\.(png|jpe?g|gif)$/i, '.webp');
    const relPath = path.relative(imagesDir, filePath);

    try {
        if (ext === '.gif') {
            // For animated GIFs, convert to animated WebP
            await sharp(filePath, { animated: true })
                .webp({ quality: 80 })
                .toFile(outPath);
        } else {
            await sharp(filePath)
                .webp({ quality: 80 })
                .toFile(outPath);
        }

        const origSize = fs.statSync(filePath).size;
        const newSize = fs.statSync(outPath).size;
        const saved = ((1 - newSize / origSize) * 100).toFixed(1);
        console.log(`${relPath} -> .webp (${(origSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB, ${saved}% smaller)`);
    } catch (err) {
        console.error(`Failed to convert ${relPath}: ${err.message}`);
    }
}

async function main() {
    const files = await findImages(imagesDir);
    console.log(`Found ${files.length} images to convert...\n`);
    for (const f of files) {
        await convert(f);
    }
    console.log('\nDone!');
}

main();
