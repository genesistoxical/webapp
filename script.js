
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
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Resize and draw image
      ctx.drawImage(img, 0, 0, 1024, 1024);

      // Enable download button
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
