# 🎨 繁中生圖工坊 Pro V3.0

## 整合版本 = 繁中生圖工坊 + 圖文魔術師

**程式碼：19,049 行 | 檔案大小：~820 KB**

---

## 🆕 新增功能

### 1️⃣ AI 生圖工坊（6 個模型）

| 模型 | 平台 | 特色 |
|------|------|------|
| **Qwen-Image** | Together | **中文文字最強（預設）** |
| Ideogram V2 | Ideogram | 英文文字最強 |
| FLUX 1.1 Pro | Replicate | 最高品質 |
| Recraft V3 | Replicate | 向量設計風 |
| Z-Image-Turbo | Replicate | 極速 8 步生成 |
| SD 3.5 Large | Stability | 最新模型 |

### 2️⃣ 🀄 圖片內文字生成（全新！）

在 AI 生圖面板中直接設定：
- ✅ **輸入文字**：要顯示在圖片中的文字
- ✅ **文字方向**：橫書 ➡️ 或 直書 ⬇️
- ✅ **九宮格位置**：選擇文字要出現的位置
- ✅ **自動組合提示詞**：系統自動將設定加入提示詞

**範例：**
```
畫面描述：可愛柴犬在公園玩耍
文字內容：新年快樂
文字方向：橫書
位置：圖片底部中央

↓ 自動組合成 ↓

可愛柴犬在公園玩耍，在圖片底部中央位置以橫書方式清晰顯示文字"新年快樂"，高清晰文字渲染，正確的中文字形
```

### 3️⃣ 繁體中文文字疊加（後製）

生成圖片後，還可以用文字疊加工具：
- ✅ 輸入繁體中文文字
- ✅ 選擇 **橫書** 或 **直書**
- ✅ **九宮格** 快速定位
- ✅ **自由拖曳** 到任意位置
- ✅ 字體大小 / 顏色 / 描邊設定

### 4️⃣ AI 提示詞建議

- 輸入簡短描述
- AI 生成 5 個優化建議
- 點擊即可套用

### 5️⃣ 設定備份/還原

- 📤 導出設定（JSON 檔案）
- 📥 導入設定（從 JSON 還原）
- **永不遺失 API KEY！**

---

## 🎯 使用流程

### 方法 A：AI 直接生成帶文字的圖片

1. 打開網頁 → 點擊「🎨 AI生圖」
2. 選擇模型（推薦 **Qwen-Image**）
3. 輸入畫面描述
4. 在「🀄 圖片內文字設定」填入：
   - 文字內容
   - 選擇橫書/直書
   - 點擊九宮格選位置
5. 點擊「✨ 開始生成」
6. 完成！文字會直接出現在圖片中

### 方法 B：先生圖，再疊加文字

1. 用 AI 生成純圖片（不填文字設定）
2. 點擊「✅ 使用此圖」載入編輯器
3. 點擊「🤖 AI → 🀄 文字疊加」
4. 設定文字、方向、位置
5. 點擊「✅ 套用」

---

## ⚙️ API KEY 設定

到「設定」頁面填入以下 API KEY：

| API | 用途 | 取得網址 |
|-----|------|----------|
| Together | Qwen-Image 中文生圖 | https://api.together.ai/settings/api-keys |
| Ideogram | 英文文字生圖 | https://ideogram.ai/api |
| Replicate | FLUX/Recraft/Z-Turbo | https://replicate.com/account/api-tokens |
| Stability | SD 3.5 | https://platform.stability.ai/ |
| OpenAI | AI 提示詞建議 | https://platform.openai.com/api-keys |
| Gemini | AI 圖片分析 | https://aistudio.google.com/ |

---

## 部署

```bash
git add index.html
git commit -m "feat: 繁中生圖工坊 Pro V3.0 - 圖片內文字生成功能"
git push origin main
```

---

*V3.0 by Sone Wang*
