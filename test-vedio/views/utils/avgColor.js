function getAverageColor(imageUrl = 'http://127.0.0.1:3000/picture.jpg') {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.addEventListener('load', function () {
      // 创建canvas元素
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 将图片绘制到canvas上
      ctx.drawImage(img, 0, 0);

      // 获取图片像素数据
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pixels = imageData.data;

      // 计算所有像素的颜色平均值
      let red = 0;
      let green = 0;
      let blue = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        red += pixels[i];
        green += pixels[i + 1];
        blue += pixels[i + 2];
      }

      const totalPixels = pixels.length / 4;
      const avgRed = Math.round(red / totalPixels);
      const avgGreen = Math.round(green / totalPixels);
      const avgBlue = Math.round(blue / totalPixels);

      // 返回平均颜色值
      resolve(`rgb(${avgRed}, ${avgGreen}, ${avgBlue})`);
    });

    img.addEventListener('error', function () {
      // 图片加载失败
      reject(new Error('图片加载失败'));
    });

    // 加载图片
    img.src = imageUrl;
  });
}