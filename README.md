# 繁中生圖工坊 v1.5 更新說明

## 🔧 重大修復 - 解決所有 API CORS 問題

### 問題根源
| API | 原始錯誤 | 原因 |
|-----|----------|------|
| Ideogram | CORS blocked | API 不允許瀏覽器直接調用 |
| Replicate | CORS blocked | API 不允許瀏覽器直接調用 |
| Stability AI | 400 Bad Request | 需要 FormData 格式 |
| Together AI | 401 Invalid key | **你的 API Key 無效** |

---

### 修復方案

#### 1️⃣ Ideogram & Replicate
使用 **CORS 代理** `corsproxy.io` 轉發請求：
```javascript
fetch('https://corsproxy.io/?https://api.ideogram.ai/generate', {...})
```

#### 2️⃣ Stability AI
改用 **FormData** 格式（非 JSON）：
```javascript
const fd = new FormData();
fd.append('prompt', prompt);
fd.append('model', 'sd3.5-large');
fd.append('output_format', 'png');
```

#### 3️⃣ Together AI (Qwen-Image)
⚠️ **你的 API Key 無效或過期！**

請到 https://api.together.ai/settings/api-keys 重新申請。

---

## 💾 設定備份功能

在「設定」頁面最下方：

| 按鈕 | 功能 |
|------|------|
| 📤 導出設定 | 保存所有 API KEY 為 JSON 檔案 |
| 📥 導入設定 | 從 JSON 檔案還原 |

**建議：設定完成後立即導出備份！**

---

## 💡 AI 提示詞建議

1. 輸入簡短描述（如：柴犬 新年）
2. 點擊「💡 建議」按鈕
3. 選擇一個優化後的提示詞

---

## 🧠 Qwen-Image 中文用法

```
可愛柴犬，紅色招牌寫著"新年快樂"
```

用 **雙引號** 包住要顯示的文字！

---

## ⚠️ 重要提醒

1. **Together AI Key 需要重新申請**
   - 錯誤訊息：`Invalid API key provided`
   - 網址：https://api.together.ai/settings/api-keys

2. **CORS 代理可能不穩定**
   - 如果 Ideogram/Replicate 還是失敗
   - 可能是 corsproxy.io 暫時不可用
   - 建議稍後再試

3. **設定備份**
   - 設定完成後立即導出
   - 避免休眠後遺失

---

## 部署

```bash
git add index.html
git commit -m "fix: 修復所有API的CORS問題 + 設定備份功能"
git push origin main
```

---

*v1.5 by Sone Wang*
