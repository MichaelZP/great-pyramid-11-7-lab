// Export the existing standalone preview without rebuilding its geometry.
import {cp, mkdir, readdir, readFile, writeFile} from 'node:fs/promises';
import {resolve, dirname, relative, isAbsolute, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const output=resolve(process.argv[2]??resolve(root,'dist-education'));
const normalized=path=>process.platform==='win32'?path.toLowerCase():path;
const inside=(parent,child)=>{const path=relative(normalized(parent),normalized(child));return !path||(!isAbsolute(path)&&path!=='..'&&!path.startsWith('..'+sep));};
if(inside(output,root))throw Error('Output must not contain the source checkout.');
for(const path of ['education','docs/etap-7','docs/etap-10','docs/etap-11'])if(inside(resolve(root,path),output))throw Error('Output must be outside the copied source directories.');
await mkdir(output,{recursive:true});
if((await readdir(output)).length)throw Error('Use a new empty output directory; existing files will not be overwritten.');
for(const path of ['education','docs/etap-7','docs/etap-10','docs/etap-11','docs/STATUS.md'])await cp(resolve(root,path),resolve(output,path),{recursive:true});
await writeFile(resolve(output,'.nojekyll'),'');
await writeFile(resolve(output,'index.html'),'<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=education/"><title>Pyramid 11:7 — educational show</title></head><body><a href="education/">Open the educational show / Otwórz pokaz edukacyjny</a></body></html>\n');
// Validate all HTML resource/navigation references inside the exported previews.
async function check(directory){for(const entry of await readdir(directory,{withFileTypes:true})){
 const file=resolve(directory,entry.name);if(entry.isDirectory()){await check(file);continue;}
 if(!entry.name.endsWith('.html'))continue;
 for(const match of (await readFile(file,'utf8')).matchAll(/(?:src|href)="([^"#]+)"/g)){
  const url=match[1].split(/[?#]/)[0];if(/^[a-z]+:/i.test(url)||url.startsWith('//'))continue;
  const target=resolve(dirname(file),decodeURIComponent(url));
  if(!inside(output,target))throw Error(`Escaping link: ${file} -> ${url}`);
  if(url.endsWith('/'))await readdir(target);else await readFile(target);
 }
}}
await check(output);
console.log(`Exported and checked the education site: ${output}`);
