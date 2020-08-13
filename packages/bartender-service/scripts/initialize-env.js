const { program } = require('commander')
const fs = require('fs')

program
    .option('-s --stage <stage>', 'The stage at which to run the tests', 'local');

program.parse();


const { stage } = program;

fs.writeFileSync('./.env', `STAGE=${stage}`)
