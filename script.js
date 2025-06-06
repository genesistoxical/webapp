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
      const canvasSize = 1024;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Fill with transparent (or white if needed: ctx.fillStyle = "#fff")
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Compute aspect ratio fit
      const ratio = Math.min(canvasSize / img.width, canvasSize / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;

      const offsetX = (canvasSize - newWidth) / 2;
      const offsetY = (canvasSize - newHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      downloadBtn.disabled = false;
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', function () {
  const link = document.createElement('a');
  link.download = 'icon.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
