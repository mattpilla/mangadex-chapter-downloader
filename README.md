# MangaDex Chapter Downloader
> Download a chapter from https://mangadex.org

This small, simple script will download all images in a manga chapter for offline reading.\
I use [MangaDex's chapter API](https://mangadex.org/api/chapter/10122) to conveniently get meta information about the chapter.\
To respect MangaDex's bandwidth, I wait 2 seconds between each image download.\
The files are saved one directory above where you run this, in this structure:\
`<manga title>/volume_<volume #>/chapter_<chapter #>/<filename>`

## Dependencies
[Node.js](https://nodejs.org)

## Setup
1) Clone this repo into the root of your manga directory
2) Run `npm ci` to install dependencies

## Running
Edit `.env` with the relevant information:
- set `MANGA` to the name of the manga (for directory-naming purposes)
- set `CHAPTER_ID` to the ID of the chapter you want to download (found in the url: red underlined part of below image)
![Chapter ID in url](https://i.imgur.com/ScdRjiB.png)
- run `npm start`

That's all. If anyone actually uses this and has trouble with it just message me or something.
