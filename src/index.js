const downloadLinkFiles = require('./commands/downloadLinkFiles');

// eslint-disable-next-line no-unused-expressions
require('yargs')
  .command('download <url> <outdir> <ext>', 'Download files', (yargs) => {
    yargs.positional('url', {
      describe: 'Web page URL',
    }).positional('outdir', {
      describe: 'Output directory',
    }).positional('ext', {
      describe: 'File extension',
    });
  }, async (args) => {
    await downloadLinkFiles(args.url, args.outdir, (x) => x.endsWith(`.${args.ext}`));
  })
  .help()
  .argv;
