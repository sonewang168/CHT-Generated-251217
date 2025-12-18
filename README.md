# 繁中生圖工坊 v1.4 更新說明

## 🔧 1. 圖片載入優化

**新策略**：移除 CORS 相關屬性，讓瀏覽器直接載入

```javascript
img.removeAttribute('crossorigin');
img.referrerPolicy='no-referrer';
```

**載入順序**：
```
原始URL → wsrv.nl → weserv.nl → pimg.tw
   ↓         ↓          ↓          ↓
 10秒超時  10秒超時   10秒超時    10秒超時
```

**關鍵改變**：
- 不再要求 CORS，直接顯示圖片
- `referrerPolicy='no-referrer'` 繞過防盜鏈檢查
- 下載時再處理 canvas 轉換

---

## 💾 2. 設定備份功能（防止 API KEY 遺失）

在「設定」頁面最下方新增「備份與還原」區塊：

| 按鈕 | 功能 |
|------|------|
| 📤 導出設定 | 將所有 API KEY 保存為 JSON 檔案 |
| 📥 導入設定 | 從 JSON 檔案還原 API KEY |

**使用流程**：
1. 設定完所有 API KEY 後，點擊「📤 導出設定」
2. 保存下載的 JSON 檔案到安全位置
3. 如果 API KEY 遺失，點擊「📥 導入設定」選擇檔案還原

---

## 💡 3. AI 提示詞建議功能

**使用方式**：
1. 輸入簡短描述（如：柴犬 新年）
2. 點擊「💡 建議」按鈕
3. AI 生成 5 個優化提示詞
4. 點擊任一建議即可套用

---

## 🧠 4. Qwen-Image 中文優化

**正確用法**：
```
可愛柴犬，紅色招牌寫著"新年快樂"
```

用 **雙引號** 包住要顯示的文字！

**自動優化**：
- 偵測引號文字 → 加入文字渲染提示
- 強制 `response_format: b64_json`（100%避免CORS）
- 步數：30

---

## 部署

```bash
git add index.html
git commit -m "fix: 圖片載入優化 + 設定備份功能 + AI建議"
git push origin main
```

---

## ⚠️ 重要提醒

**第一次使用後，請立即導出設定備份！**

這樣即使瀏覽器清除資料或休眠後遺失，也能快速還原。

---

*v1.4 by Sone Wang*
