const { downloadByTagName } = require('./utils');

const downloadLinkFiles = (urlString, outputDir, filt = () => true) => downloadByTagName(urlString, 'A', outputDir, filt);

module.exports = downloadLinkFiles;
