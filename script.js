
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

      // Clear canvas and fill with transparent background
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Calculate aspect ratio
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasSize / canvasSize;

      let drawWidth = canvasSize;
      let drawHeight = canvasSize;

      if (imgRatio > 1) {
        // Image is wider
        drawWidth = canvasSize;
        drawHeight = canvasSize / imgRatio;
      } else {
        // Image is taller
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
  const link = document.createElement('a');
  link.download = 'icon.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
