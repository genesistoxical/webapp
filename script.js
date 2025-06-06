
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (e) {
    img.onload = function () {
      const canvasSize = 256;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Maintain aspect ratio
      const imgRatio = img.width / img.height;
      let drawWidth = canvasSize;
      let drawHeight = canvasSize;

      if (imgRatio > 1) {
        drawWidth = canvasSize;
        drawHeight = canvasSize / imgRatio;
      } else {
        drawHeight = canvasSize;
        drawWidth = canvasSize * imgRatio;
      }

      const offsetX = (canvasSize - drawWidth) / 2;
      const offsetY = (canvasSize - drawHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      downloadBtn.disabled = false;
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', function () {
  canvas.toBlob(function (blob) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const arrayBuffer = reader.result;
      const byteArray = new Uint8Array(arrayBuffer);
      const icoBlob = new Blob([byteArray], { type: 'image/vnd.microsoft.icon' });
      const link = document.createElement('a');
      link.download = 'icon.ico';
      link.href = URL.createObjectURL(icoBlob);
      link.click();
    };
    reader.readAsArrayBuffer(blob);
  }, 'image/png');
});
