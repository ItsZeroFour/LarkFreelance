const fs=require('fs'),path=require('path');
function dim(file){
  const b=fs.readFileSync(file);
  if(b[0]===0x89&&b[1]===0x50){return [b.readUInt32BE(16),b.readUInt32BE(20)];}
  if(b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP'){
    const fmt=b.toString('ascii',12,16);
    if(fmt==='VP8 '){return [b.readUInt16LE(26)&0x3fff, b.readUInt16LE(28)&0x3fff];}
    if(fmt==='VP8L'){const v=b.readUInt32LE(21);return [(v&0x3fff)+1, ((v>>14)&0x3fff)+1];}
    if(fmt==='VP8X'){return [1+((b[24])|(b[25]<<8)|(b[26]<<16)), 1+((b[27])|(b[28]<<8)|(b[29]<<16))];}
  }
  return [0,0];
}
const root='public/portfolio';
const entries=[];
for(const d of fs.readdirSync(root).sort()){
  const dir=path.join(root,d);
  if(!fs.statSync(dir).isDirectory())continue;
  for(const f of fs.readdirSync(dir).sort()){
    const [w,h]=dim(path.join(dir,f));
    entries.push([`/portfolio/${d}/${f}`,w,h]);
  }
}
let out=`/**\n * Intrinsic pixel dimensions for every portfolio screenshot.\n *\n * Generated from the files under /public/portfolio so <Image> can reserve\n * exact space (no layout shift) and request correctly sized sources.\n * Regenerate with: node scripts/gen-image-sizes.cjs\n */\nexport interface ImageSize {\n  width: number;\n  height: number;\n}\n\nexport const imageSizes: Record<string, ImageSize> = {\n`;
for(const [p,w,h] of entries){out+=`  "${p}": { width: ${w}, height: ${h} },\n`;}
out+=`};\n\n/** Dimensions for a public image path, with a safe 16:10 fallback. */\nexport function getImageSize(src: string): ImageSize {\n  return imageSizes[src] ?? { width: 1400, height: 875 };\n}\n`;
fs.writeFileSync('src/data/imageSizes.ts',out);
console.log('wrote src/data/imageSizes.ts with',entries.length,'entries');
