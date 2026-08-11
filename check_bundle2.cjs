const fs = require('fs');
fetch('https://maay.vn/thuc-don')
  .then(res => res.text())
  .then(html => {
    const match = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
    if (!match) return console.log("No bundle found");
    const jsUrl = 'https://maay.vn' + match[1];
    fetch(jsUrl).then(res => res.text()).then(js => {
      // Find the exact VITE_API_URL string assigned
      const regex = /"https:\/\/maayrooftopbackend[^"]*"/g;
      console.log('Exact URLs in bundle:', js.match(regex));
    });
  });
