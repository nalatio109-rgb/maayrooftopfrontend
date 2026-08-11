fetch('https://maay.vn/thuc-don')
  .then(res => res.text())
  .then(html => {
    const match = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
    if (!match) return console.log("No bundle found");
    const jsUrl = 'https://maay.vn' + match[1];
    fetch(jsUrl).then(res => res.text()).then(js => {
      console.log('Matches for maayrooftopbackend:', js.match(/https:\/\/maayrooftopbackend[a-zA-Z0-9-.]+/g));
      console.log('Matches for localhost:', js.match(/http:\/\/localhost:\d+/g));
    });
  });
