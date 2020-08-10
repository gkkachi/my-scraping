const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const URL = require('url');
const { JSDOM } = require('jsdom');

const getDOMFromURL = async (url) => {
  const res = await fetch(url);
  const txt = await res.text();
  const dom = new JSDOM(txt);
  return dom;
};

const downloadFileFromURL = async (url, outputDir) => {
  const filename = url.split('/').pop();
  const res = await fetch(url);
  const downloadPath = path.join(outputDir, filename);
  const fileStream = fs.createWriteStream(downloadPath);
  fileStream.on('finish', () => fileStream.close());
  res.body.pipe(fileStream);
};

const downloadByTagName = async (urlString, tagName, outputDir, filt = () => true) => {
  const url = URL.parse(urlString);
  const dom = await getDOMFromURL(url);
  const a = dom.window.document.getElementsByTagName(tagName);
  const links = [...a]
    .map((x) => x.href)
    .filter((x) => x)
    .filter(filt)
    .map((x) => {
      if (x.startsWith('/')) {
        url.pathname = x;
        return url.format();
      }
      return x;
    });
  await Promise.all(links.map((x) => downloadFileFromURL(x, outputDir)));
};

module.exports = { getDOMFromURL, downloadFileFromURL, downloadByTagName };
