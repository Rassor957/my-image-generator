function generateImage() {
    // 取得使用者輸入的值
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const bgColor = document.getElementById('bgColor').value.substring(1); // 去掉前面的 #
    const textColor = document.getElementById('textColor').value.substring(1); // 去掉前面的 #
    const text = document.getElementById('text').value;

    // 組合圖片的 URL
    let imageUrl = `https://fakeimg.pl/${width}x${height}/`;
    if (bgColor) {
        imageUrl += `${bgColor}/`;
        if (textColor) {
            imageUrl += `${textColor}/`;
        }
    }

    // 構建查詢參數
    const params = new URLSearchParams();
    if (text) {
        params.append('text', text);
        if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text) || /[\u3040-\u30ff]/.test(text) || /[\u4e00-\u9fa5]/.test(text)) {
            params.append('font', 'noto');
        }
    } else {
        params.append('text', ' ');
        params.append('font', 'noto');
    }

    // 如果有查詢參數，添加到 URL
    const queryString = params.toString();
    if (queryString) {
        imageUrl += `?${queryString}`;
    }

    // 限制預覽圖片的大小
    const previewMaxWidth = 300;
    const previewMaxHeight = 300;
    let previewWidth = width;
    let previewHeight = height;

    if (previewWidth > previewMaxWidth || previewHeight > previewMaxHeight) {
        const aspectRatio = width / height;
        if (previewWidth > previewMaxWidth) {
            previewWidth = previewMaxWidth;
            previewHeight = previewMaxWidth / aspectRatio;
        }
        if (previewHeight > previewMaxHeight) {
            previewHeight = previewMaxHeight;
            previewWidth = previewMaxHeight * aspectRatio;
        }
    }

    // 在網頁上顯示縮小版的圖片
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `
        <img id="generatedImage" src="${imageUrl}" alt="生成的圖片" width="${previewWidth}" height="${previewHeight}">
        <br>
        <button onclick="downloadImage()">下載圖片</button>
    `;
}

function downloadImage() {
    const image = document.getElementById('generatedImage');
    const imageUrl = image.src;

    // 使用 Fetch API 下載圖片並觸發下載
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'custom_image.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('下載失敗'));
}
