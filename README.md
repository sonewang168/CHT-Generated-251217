# 繁中生圖工坊 v1.2 更新說明

## 🔧 圖片載入系統全面重寫

新的 `proxyLoadImage()` 使用 **6 種方式**依序嘗試：

| # | 方式 | 類型 | 說明 |
|---|------|------|------|
| 1 | 直接載入 | Image | 某些 CDN 支援 CORS |
| 2 | wsrv.nl | Image | 專業圖片代理 |
| 3 | weserv.nl | Image | 專業圖片代理 |
| 4 | allorigins.win | Fetch | CORS 代理 |
| 5 | corsproxy.io | Fetch | CORS 代理 |
| 6 | codetabs.com | Fetch | CORS 代理 |

- 每種方式 **20 秒超時**
- 失敗自動切換下一個
- 驗證返回資料 > 5KB

---

## 🧠 Qwen-Image 中文優化

### 用法（手機友好）
```
可愛柴犬坐在店門口，旁邊紅色招牌寫著"新年快樂"四個金色大字
```

用 **雙引號 `""`** 包住要顯示的文字！

### 自動優化
- 偵測到中文 → 加入 `超清, 4K, 电影级构图`
- 偵測到引號文字 → 加入 `高清晰文字渲染, 確保文字清晰可讀`
- 強制 `response_format: b64_json`（避免 CORS）
- 步數：20 → **30**

---

## ✏️ AI 解析可編輯

- `<div>` → `<textarea>`
- 可在使用前編輯內容

---

## 部署

```bash
git add index.html
git commit -m "fix: 重寫圖片載入系統 + Qwen中文優化"
git push origin main
```

---

*v1.2 by Sone Wang*
