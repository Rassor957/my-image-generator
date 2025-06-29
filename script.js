// 確保在 DOM 載入後綁定事件
window.addEventListener('DOMContentLoaded', () => {
  const widthInput  = document.getElementById('width');
  const generateBtn = document.getElementById('generateBtn');

  generateBtn.disabled = !widthInput.value;
  widthInput.addEventListener('input', () => {
    generateBtn.disabled = !widthInput.value;
  });
});

function generateImage() {
  const width    = document.getElementById('width').value;
  let   height   = document.getElementById('height').value;
  if (!height) height = width;

  const bgColor   = document.getElementById('bgColor').value.substring(1);
  const textColor = document.getElementById('textColor').value.substring(1);
  const text      = document.getElementById('text').value;

  // 組 URL
  let imageUrl = `https://fakeimg.ryd.tools/${width}x${height}/`;
  if (bgColor) {
    imageUrl += `${bgColor}/`;
    if (textColor) imageUrl += `${textColor}/`;
  }
  const params = new URLSearchParams();
  if (text) {
    params.append('text', text);
    if (/[\u4e00-\u9fa5]/.test(text)
     || /[\u3040-\u30ff]/.test(text)
     || /[\uac00-\ud7af]/.test(text)
    ) {
      params.append('font', 'noto');
    }
  } else {
    params.append('text', ' ');
    params.append('font', 'noto');
  }
  const qs = params.toString();
  if (qs) imageUrl += `?${qs}`;

  // 計算預覽大小
  let pW = width, pH = height;
  const max = 300, ratio = width / height;
  if (pW > max) { pW = max; pH = max / ratio; }
  if (pH > max) { pH = max; pW = max * ratio; }

  // 生成卡片
  const html = `
    <div class="card text-dark mx-auto" style="max-width:${pW}px;">
      <img id="generatedImage" src="${imageUrl}" class="card-img-top" alt="生成的圖片">
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control" id="imageLinkInput" value="${imageUrl}" readonly>
          <button class="btn btn-outline-secondary" type="button" id="copyLinkBtn" onclick="copyLink()">
            <i class="bi bi-clipboard"></i> 複製鏈接
          </button>
        </div>
        <div class="text-center">
          <button id="downloadBtn" class="btn btn-success" onclick="downloadImage()">
            <i class="bi bi-download"></i> 下載圖片
          </button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('imageContainer').innerHTML = html;
}

// 複製連結並動態反饋
function copyLink() {
  const input = document.getElementById('imageLinkInput');
  const btn   = document.getElementById('copyLinkBtn');
  const original = btn.innerHTML;

  navigator.clipboard.writeText(input.value).then(() => {
    btn.innerHTML = '<i class="bi bi-check2-circle"></i> 已複製';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 2000);
  });
}

// 下載圖片並動態反饋
function downloadImage() {
  const imgUrl = document.getElementById('generatedImage').src;
  const btn    = document.getElementById('downloadBtn');
  const original = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> 下載中…';

  fetch(imgUrl)
    .then(res => res.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = URL.createObjectURL(blob);
      link.download = 'custom_image.png';
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);

      // 成功後還原按鈕
      btn.innerHTML = original;
      btn.disabled = false;
    })
    .catch(() => {
      // 失敗提示
      btn.innerHTML = '<i class="bi bi-x-circle"></i> 下載失敗';
      btn.classList.replace('btn-success', 'btn-danger');
      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.replace('btn-danger', 'btn-success');
        btn.disabled = false;
      }, 2000);
    });
}
