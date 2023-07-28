const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/video3') {
    const filePath = './public/video3.mp4';
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      // Partial content
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // Full content
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});