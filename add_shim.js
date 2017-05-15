const fs = require('fs');

const indexHtmlString = fs.readFileSync('./storybook-static/index.html', 'utf-8');

const shimsLink = `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-sham.min.js"></script>`;

const replaced = indexHtmlString.replace('</head>', shimsLink + '</head>');

fs.writeFileSync('./storybook-static/index.html', replaced);
