require('dotenv').config();
const fs = require('fs-extra');
const axios = require('axios');
const imageDownloader = require('image-downloader');

const manga = process.env.MANGA;
const chapter = process.env.CHAPTER_ID;
const apiUrl = 'https://mangadex.org/api/chapter/'

if (!manga) {
    return console.log('Must include manga title. See README.');
}
if (!chapter) {
    return console.log('Must include chapter ID. See README.');
}

const getChapter = async () => {
    try {
        let response = await axios.get(apiUrl + chapter);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
};

const downloadImage = async options => {
    try {
        const { filename, image } = await imageDownloader.image(options);
        console.log(filename);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    let meta = await getChapter();
    if (!meta) {
        return;
    }
    let destDir = `../${manga}/volume_${meta.volume || 'misc'}/chapter_${meta.chapter || 1}`;
    try {
        await fs.ensureDir(destDir);
    } catch (e) {
        return console.error(e);
    }
    let pages = meta.page_array;
    for (let i = 0; i < pages.length; i++) {
        let img = await downloadImage({
            url: `${meta.server}${meta.hash}/${meta.page_array[i]}`,
            dest: destDir
        });
        if (!img) {
            return;
        }
        await sleep(2000);
    }
    console.log('done');
})();
