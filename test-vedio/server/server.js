const express = require('express');
const cors = require('cors');
const app = express();

// 设置CORS
app.use(cors());

// 设置静态资源目录
app.use(express.static('./public'));

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});