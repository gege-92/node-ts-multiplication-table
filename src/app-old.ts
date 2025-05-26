import fs from 'fs'
import { yarg } from './config/plugins/yargs.plugin';


const { b:base, l:limit, s:show } = yarg;

const headerMessage = `
========================================
            Tabla del ${ base }                        
========================================\n
`;


let data = '';

for (let i = 1; i <= limit; i++) {

    data += (`${ base } x ${ i } = ${ base * i }\n`);
      
}

if( show ) console.log( data );

const outputMessage = headerMessage + data;
const outputPath = `outputs`;

fs.mkdirSync( outputPath, {recursive: true} );
fs.writeFileSync(`${outputPath}/tabla-${ base }.txt`, outputMessage);
console.log('File created!');
