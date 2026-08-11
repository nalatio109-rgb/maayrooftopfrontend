const fs = require('fs');
const form = new FormData();
form.append('name', 'test_upload');
form.append('price', '123');
form.append('category', 'Topping');
form.append('desc', 'desc');
const blob = new Blob([fs.readFileSync('./package.json')]);
form.append('image', blob, 'package.json');
fetch('https://maayrooftopbackend-production.up.railway.app/api/menu', { method: 'POST', body: form })
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
