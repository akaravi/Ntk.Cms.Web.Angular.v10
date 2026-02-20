// Fix list.mobile.component.html files - run with: node fix-list-mobile.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = __dirname;
const pattern = 'src/app/cms-modules/**/list/list.mobile.component.html';
const files = glob.sync(pattern, { cwd: root });

function fix(content) {
  let c = content;
  const imageBlockRe = /@if\s*\(\s*row\.linkMainImageIdSrc\?\.length\s*>\s*0\s*\)\s*\{\s*<div class="cms-m-list-item-image">\s*<img[\s\S]*?<\/div>\s*\}\s*@else\s*\{\s*(<div class="cms-m-list-item-image-placeholder">\s*<i class="[^"]+"[^>]*><\/i>\s*<\/div>)\s*\}/g;
  c = c.replace(imageBlockRe, '$1');
  const expandedRe = /\s*@if\s*\(\s*row\.linkMainImageIdSrc\?\.length\s*>\s*0\s*\)\s*\{\s*<div class="cms-m-list-item-expanded-image">\s*<img[\s\S]*?<\/div>\s*\}\s*(?=@if \(\s*row\.updatedDate)/g;
  c = c.replace(expandedRe, '');
  return c;
}

let count = 0;
files.forEach(f => {
  const full = path.join(root, f);
  const content = fs.readFileSync(full, 'utf8');
  if (content.includes('row.linkMainImageIdSrc')) {
    const newContent = fix(content);
    if (newContent !== content) {
      fs.writeFileSync(full, newContent);
      count++;
      console.log('Fixed:', f);
    }
  }
});
console.log('Total fixed:', count);
