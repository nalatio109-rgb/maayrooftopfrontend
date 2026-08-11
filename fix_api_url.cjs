const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // First, revert any previous replacements to avoid double replacement
  content = content.replace(/\.replace\(\/\\\/\\+\$\/, ''\)/g, '');
  // Now replace
  if (content.includes('import.meta.env.VITE_API_URL')) {
    content = content.replace(/import\.meta\.env\.VITE_API_URL/g, "import.meta.env.VITE_API_URL.replace(/\\/+$/, '')");
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
});
console.log('Done');
