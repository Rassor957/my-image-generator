# My Image Generator

這是一個簡單的網頁應用，使用者可以自訂寬度、高度、背景顏色、文字顏色及顯示文字，生成一張圖片，並能下載圖片或複製圖片鏈接。

[示範影片](https://youtu.be/watch?v=sF7oJfnBGxM)


## 安裝與使用（Installation & Usage）

1. 克隆專案：

   ```bash
   git clone https://github.com/Rassor957/my-image-generator.git
   cd my-image-generator
   ```
2. 直接以瀏覽器開啟 `index.html` 即可使用。

## 專案結構（Project Structure）

```
my-image-generator/
│  index.html      # 主頁面
│  styles.css      # 自定義樣式
│  script.js       # 邏輯與事件處理
└─ README.md       # 專案說明
```

## 動機（Motivation）

在練習 CSS 時，我常用 [https://fakeimg.pl/](https://fakeimg.pl/) 生成假圖片，但該網站故障後，經過一番搜尋發現可改用 [https://fakeimg.ryd.tools/](https://fakeimg.ryd.tools/)。然而，每次都得手動輸入完整鏈接才能獲取圖片，十分繁瑣，因此決定開發此簡易網頁工具，一鍵生成並管理占位圖片。

## 功能（Features）

* 自訂寬度與高度，若留空高度自動跟隨寬度。
* 可選背景顏色與文字顏色。
* 可選是否顯示文字，且支援多語系字體需求。
* 生成後：

  * 即時預覽圖片。
  * 可複製完整圖片鏈接。
  * 可下載圖片檔。

## 技術棧（Tech Stack）

* HTML5 + CSS3 + JavaScript
* Bootstrap 5（樣式與佈局）
* Bootstrap Icons（按鈕圖示）
* Fakeimg API（假占位圖片服務）

## 授權（License）

本專案採用 MIT License，詳見 [LICENSE](LICENSE)。

---

歡迎提出 issue 或 PR！如有建議或功能需求，請隨時聯絡。
