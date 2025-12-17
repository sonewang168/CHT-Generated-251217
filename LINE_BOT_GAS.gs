/**
 * 繁中生圖 LINE BOT - GAS
 * 
 * 部署步驟：
 * 1. script.google.com 新專案 → 貼上程式碼
 * 2. 部署 → 網頁應用程式 → 任何人
 * 3. 開啟網址設定 API Keys
 * 4. 複製 Webhook URL 到 LINE Developers
 * 
 * 作者：Sone Wang
 */

const MODELS = {
  'ideogram': { name: 'Ideogram v2', icon: '💡', api: 'ideogram', desc: '最佳中文字' },
  'flux-pro': { name: 'FLUX 1.1 Pro', icon: '👑', api: 'replicate', model: 'black-forest-labs/flux-1.1-pro', desc: '高品質' },
  'sd35': { name: 'SD 3.5', icon: '🔮', api: 'stability', desc: 'Stability' },
  'qwen-image': { name: 'Qwen-Image', icon: '🧠', api: 'together', model: 'Qwen/Qwen-Image', desc: '通義千問中文強' },
  'z-turbo': { name: 'Z-Image-Turbo', icon: '⚡', api: 'replicate', model: 'prunaai/z-image-turbo', desc: '極速8步' },
  'recraft': { name: 'Recraft V3', icon: '✨', api: 'replicate', model: 'recraft-ai/recraft-v3', desc: '向量設計風' },
};

// ========== 網頁設定介面 ==========
function doGet() {
  const config = getConfig();
  return HtmlService.createHtmlOutput(`<!DOCTYPE html>
<html><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>LINE Bot 設定</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,sans-serif;background:#0a0a0a;color:#fff;padding:20px}
.container{max-width:500px;margin:0 auto}
h1{text-align:center;font-size:20px;margin-bottom:20px;color:#64d2ff}
.card{background:#1c1c1e;border-radius:12px;padding:16px;margin-bottom:12px}
.card h2{font-size:13px;color:#8e8e93;margin-bottom:12px}
.field{margin-bottom:12px}
label{display:block;font-size:12px;color:#8e8e93;margin-bottom:4px}
.req{color:#ff375f;font-size:10px}
.rec{color:#30d158;font-size:10px}
input{width:100%;padding:10px;background:#2c2c2e;border:1px solid #3a3a3c;border-radius:8px;color:#fff;font-size:14px}
input:focus{outline:none;border-color:#0a84ff}
.hint{font-size:10px;color:#636366;margin-top:4px}
.hint a{color:#0a84ff}
.btn{width:100%;padding:14px;background:#06c755;border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:600;cursor:pointer}
.btn:disabled{opacity:0.5}
.status{text-align:center;padding:10px;border-radius:8px;margin-top:12px;font-size:13px;display:none}
.status.show{display:block}
.status.ok{background:rgba(48,209,88,0.2);color:#30d158}
.status.err{background:rgba(255,55,95,0.2);color:#ff375f}
.webhook{background:#2c2c2e;padding:10px;border-radius:8px;font-size:11px;color:#64d2ff;word-break:break-all;cursor:pointer;margin-top:8px}
.models{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:8px}
.model{background:#2c2c2e;padding:8px;border-radius:6px;font-size:11px}
.model b{color:#64d2ff}
</style>
</head><body>
<div class="container">
<h1>💬 繁中生圖 LINE Bot</h1>

<div class="card">
<h2>🔐 LINE Bot 認證</h2>
<div class="field">
<label>Channel Access Token <span class="req">*必填</span></label>
<input type="password" id="lineToken" value="${config.lineToken||''}">
<div class="hint"><a href="https://developers.line.biz/" target="_blank">LINE Developers</a> → Messaging API</div>
</div>
<div class="field">
<label>預設 User ID（網頁版推送用）</label>
<input type="text" id="lineUserId" value="${config.lineUserId||''}">
<div class="hint">對 Bot 說 /myid 取得，網頁版不填 User ID 時會用此值</div>
</div>
</div>

<div class="card">
<h2>🤖 AI 生圖 API（至少填一個）</h2>
<div class="field">
<label>Ideogram API Key <span class="rec">⭐推薦</span></label>
<input type="password" id="ideogramKey" value="${config.ideogramKey||''}">
<div class="hint"><a href="https://ideogram.ai/api" target="_blank">取得</a> - 最佳中文字</div>
</div>
<div class="field">
<label>Replicate Token</label>
<input type="password" id="repToken" value="${config.repToken||''}">
<div class="hint"><a href="https://replicate.com/account/api-tokens" target="_blank">取得</a> - FLUX / Z-Turbo / Recraft</div>
</div>
<div class="field">
<label>Stability AI Key</label>
<input type="password" id="stabKey" value="${config.stabKey||''}">
<div class="hint"><a href="https://platform.stability.ai/" target="_blank">取得</a> - SD 3.5</div>
</div>
<div class="field">
<label>Together AI Key</label>
<input type="password" id="togetherKey" value="${config.togetherKey||''}">
<div class="hint"><a href="https://api.together.xyz/" target="_blank">取得</a> - Qwen-Image</div>
</div>
</div>

<div class="card">
<h2>☁️ 圖片上傳</h2>
<div class="field">
<label>ImgBB Key <span class="req">*必填</span></label>
<input type="password" id="imgbbKey" value="${config.imgbbKey||''}">
<div class="hint"><a href="https://api.imgbb.com/" target="_blank">取得</a> - 推送圖片用</div>
</div>
</div>

<button class="btn" onclick="save()">💾 儲存設定</button>
<div class="status" id="status"></div>

<div class="card" style="margin-top:16px">
<h2>📋 Webhook URL</h2>
<div class="webhook" id="url" onclick="copy()">載入中...</div>
<div class="hint" style="margin-top:6px">👆 點擊複製，貼到 LINE Developers</div>
</div>

<div class="card">
<h2>🤖 支援模型（輸入 /model 名稱 切換）</h2>
<div class="models">
<div class="model"><b>💡 ideogram</b> 最佳中文字</div>
<div class="model"><b>👑 flux-pro</b> 高品質</div>
<div class="model"><b>🔮 sd35</b> Stability</div>
<div class="model"><b>🧠 qwen-image</b> 通義千問</div>
<div class="model"><b>⚡ z-turbo</b> 極速8步</div>
<div class="model"><b>✨ recraft</b> 向量設計風</div>
</div>
</div>
</div>

<script>
google.script.run.withSuccessHandler(u=>document.getElementById('url').textContent=u).getUrl();
function copy(){
  const u=document.getElementById('url');
  navigator.clipboard.writeText(u.textContent);
  u.textContent='✅ 已複製';
  setTimeout(()=>google.script.run.withSuccessHandler(x=>u.textContent=x).getUrl(),1500);
}
function save(){
  const btn=document.querySelector('.btn'),st=document.getElementById('status');
  btn.disabled=true;btn.textContent='儲存中...';
  google.script.run.withSuccessHandler(r=>{
    btn.disabled=false;
    btn.textContent=r.ok?'✅ 已儲存':'💾 儲存設定';
    st.textContent=r.ok?'設定完成！可以在 LINE 中使用了':'❌ '+r.err;
    st.className='status show '+(r.ok?'ok':'err');
    if(r.ok)setTimeout(()=>btn.textContent='💾 儲存設定',2000);
  }).saveConfig({
    lineToken:document.getElementById('lineToken').value.trim(),
    lineUserId:document.getElementById('lineUserId').value.trim(),
    ideogramKey:document.getElementById('ideogramKey').value.trim(),
    repToken:document.getElementById('repToken').value.trim(),
    stabKey:document.getElementById('stabKey').value.trim(),
    togetherKey:document.getElementById('togetherKey').value.trim(),
    imgbbKey:document.getElementById('imgbbKey').value.trim()
  });
}
</script>
</body></html>`).setTitle('LINE Bot 設定');
}

function getUrl() { return ScriptApp.getService().getUrl(); }

function saveConfig(c) {
  if (!c.lineToken) return { ok: false, err: 'LINE Token 必填' };
  if (!c.imgbbKey) return { ok: false, err: 'ImgBB Key 必填' };
  if (!c.ideogramKey && !c.repToken && !c.stabKey && !c.togetherKey) {
    return { ok: false, err: '請至少設定一個 AI API' };
  }
  PropertiesService.getScriptProperties().setProperties(c);
  return { ok: true };
}

function getConfig() {
  const p = PropertiesService.getScriptProperties();
  return {
    lineToken: p.getProperty('lineToken') || '',
    lineUserId: p.getProperty('lineUserId') || '',
    ideogramKey: p.getProperty('ideogramKey') || '',
    repToken: p.getProperty('repToken') || '',
    stabKey: p.getProperty('stabKey') || '',
    togetherKey: p.getProperty('togetherKey') || '',
    imgbbKey: p.getProperty('imgbbKey') || '',
  };
}

// ========== LINE Webhook ==========
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 網頁請求（透過 GAS 代理）
    if (data.action) {
      return handleWebRequest(data);
    }
    
    // LINE Webhook 請求
    for (const ev of data.events) {
      if (ev.type === 'message' && ev.message.type === 'text') {
        handleMsg(ev);
      }
    }
  } catch (err) {
    console.error(err);
  }
  return ContentService.createTextOutput('OK');
}

// 處理網頁請求
function handleWebRequest(data) {
  const cfg = getConfig();
  const uid = data.userId || cfg.lineUserId;
  
  if (data.action === 'testNotify') {
    if (!uid) {
      return ContentService.createTextOutput('NO_USER_ID');
    }
    push(uid, '🎉 LINE 連線測試成功！\n\n繁中生圖工坊已連接 ✅', cfg.lineToken);
    return ContentService.createTextOutput('OK');
  }
  
  if (data.action === 'sendImage') {
    if (!uid) {
      return ContentService.createTextOutput('NO_USER_ID');
    }
    const imgUrl = data.imageUrl;
    const prompt = data.prompt || '';
    const texts = data.texts || '';
    
    if (!imgUrl) {
      return ContentService.createTextOutput('NO_IMAGE');
    }
    
    const messages = [
      { type: 'image', originalContentUrl: imgUrl, previewImageUrl: imgUrl },
      { type: 'text', text: `🎨 繁中生圖\n📝 ${prompt}${texts ? '\n📌 ' + texts : ''}\n🔗 ${imgUrl}` }
    ];
    
    pushMessages(uid, cfg.lineToken, messages);
    return ContentService.createTextOutput('OK');
  }
  
  return ContentService.createTextOutput('UNKNOWN_ACTION');
}

// 推送多個訊息
function pushMessages(uid, token, messages) {
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    payload: JSON.stringify({ to: uid, messages: messages }),
    muteHttpExceptions: true
  });
}

function handleMsg(ev) {
  const token = ev.replyToken;
  const uid = ev.source.userId;
  const text = ev.message.text.trim();
  const cfg = getConfig();

  if (text === '/myid' || text === '我的ID') {
    reply(token, cfg.lineToken, `🆔 你的 User ID：\n\n${uid}\n\n📋 複製此 ID 填入網頁版設定`);
    return;
  }
  if (text === '/help' || text === '說明') {
    reply(token, cfg.lineToken, helpMsg());
    return;
  }
  if (text === '/models' || text === '模型') {
    reply(token, cfg.lineToken, modelsMsg());
    return;
  }
  if (text.startsWith('/model ') || text.startsWith('模型 ')) {
    const m = text.replace(/^(\/model |模型 )/, '').trim().toLowerCase();
    if (MODELS[m]) {
      setPref(uid, 'model', m);
      reply(token, cfg.lineToken, `✅ 已切換：${MODELS[m].icon} ${MODELS[m].name}`);
    } else {
      reply(token, cfg.lineToken, '❌ 找不到此模型\n輸入 /models 查看');
    }
    return;
  }
  if (text.startsWith('/size ') || text.startsWith('尺寸 ')) {
    const s = text.replace(/^(\/size |尺寸 )/, '').trim().replace(/[*×]/g, 'x');
    if (/^\d+x\d+$/.test(s)) {
      setPref(uid, 'size', s);
      reply(token, cfg.lineToken, `✅ 尺寸：${s}`);
    } else {
      reply(token, cfg.lineToken, '❌ 格式錯誤\n例如：/size 1024x1024');
    }
    return;
  }
  if (text === '/status' || text === '狀態') {
    const m = getPref(uid, 'model') || 'ideogram';
    const s = getPref(uid, 'size') || '1024x1024';
    const mi = MODELS[m] || MODELS['ideogram'];
    reply(token, cfg.lineToken, `📊 目前設定\n🤖 ${mi.icon} ${mi.name}\n📐 ${s}`);
    return;
  }

  // 生成圖片
  genImg(token, uid, text, cfg);
}

function genImg(token, uid, prompt, cfg) {
  const modelId = getPref(uid, 'model') || 'ideogram';
  const sizeStr = getPref(uid, 'size') || '1024x1024';
  const [w, h] = sizeStr.split('x').map(Number);
  const size = { w: w || 1024, h: h || 1024 };
  const m = MODELS[modelId] || MODELS['ideogram'];

  // 回覆生成中
  reply(token, cfg.lineToken, `🎨 生成中...\n\n📝 ${prompt}\n🤖 ${m.icon} ${m.name}\n📐 ${size.w}×${size.h}\n\n⏳ 完成後推送給您`);

  try {
    let imgUrl;
    switch (m.api) {
      case 'ideogram':
        if (!cfg.ideogramKey) throw new Error('未設定 Ideogram Key');
        imgUrl = apiIdeogram(prompt, size, cfg.ideogramKey);
        break;
      case 'replicate':
        if (!cfg.repToken) throw new Error('未設定 Replicate Token');
        imgUrl = apiReplicate(prompt, size, cfg.repToken, m);
        break;
      case 'stability':
        if (!cfg.stabKey) throw new Error('未設定 Stability Key');
        imgUrl = apiStability(prompt, size, cfg.stabKey);
        break;
      case 'together':
        if (!cfg.togetherKey) throw new Error('未設定 Together Key');
        imgUrl = apiTogether(prompt, m.model, size, cfg.togetherKey);
        break;
      default:
        throw new Error('不支援的模型');
    }

    // 上傳 ImgBB
    const pubUrl = uploadImgBB(imgUrl, cfg.imgbbKey);

    // 推送成果
    pushResult(uid, pubUrl, prompt, m, size, cfg.lineToken);

  } catch (err) {
    console.error(err);
    push(uid, `❌ 生成失敗\n${err.message}\n\n💡 請檢查 API Key 或更換模型`, cfg.lineToken);
  }
}

// ========== API 調用 ==========
function apiIdeogram(prompt, size, key) {
  const ar = size.w === size.h ? 'ASPECT_1_1' : size.w > size.h ? 'ASPECT_4_3' : 'ASPECT_3_4';
  const res = UrlFetchApp.fetch('https://api.ideogram.ai/generate', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Api-Key': key },
    payload: JSON.stringify({ image_request: { prompt, aspect_ratio: ar, model: 'V_2' } }),
    muteHttpExceptions: true
  });
  const data = JSON.parse(res.getContentText());
  if (data.data && data.data[0]) return data.data[0].url;
  throw new Error('Ideogram: ' + (data.error || '失敗'));
}

function apiReplicate(prompt, size, token, modelInfo) {
  const modelPath = modelInfo.model || 'black-forest-labs/flux-1.1-pro';
  const res = UrlFetchApp.fetch('https://api.replicate.com/v1/models/' + modelPath + '/predictions', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + token },
    payload: JSON.stringify({ input: { prompt, width: size.w, height: size.h } }),
    muteHttpExceptions: true
  });
  let r = JSON.parse(res.getContentText());
  if (r.error) throw new Error('Replicate: ' + r.error);
  for (let i = 0; i < 60 && r.status !== 'succeeded' && r.status !== 'failed'; i++) {
    Utilities.sleep(2000);
    r = JSON.parse(UrlFetchApp.fetch('https://api.replicate.com/v1/predictions/' + r.id, {
      headers: { 'Authorization': 'Bearer ' + token }
    }).getContentText());
  }
  if (r.status === 'failed') throw new Error('Replicate 生成失敗');
  return Array.isArray(r.output) ? r.output[0] : r.output;
}

function apiStability(prompt, size, key) {
  const res = UrlFetchApp.fetch('https://api.stability.ai/v2beta/stable-image/generate/sd3', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + key, 'Accept': 'application/json' },
    payload: JSON.stringify({ prompt, model: 'sd3.5-large', output_format: 'png', width: size.w, height: size.h }),
    muteHttpExceptions: true
  });
  const data = JSON.parse(res.getContentText());
  if (data.image) return 'data:image/png;base64,' + data.image;
  throw new Error('Stability: ' + (data.message || '失敗'));
}

function apiTogether(prompt, model, size, key) {
  const res = UrlFetchApp.fetch('https://api.together.xyz/v1/images/generations', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + key },
    payload: JSON.stringify({ model, prompt, width: size.w, height: size.h, steps: 28, n: 1 }),
    muteHttpExceptions: true
  });
  const data = JSON.parse(res.getContentText());
  if (data.data && data.data[0]) {
    return data.data[0].url || 'data:image/png;base64,' + data.data[0].b64_json;
  }
  throw new Error('Together: ' + (data.error?.message || '失敗'));
}

function uploadImgBB(imgUrl, key) {
  let b64 = imgUrl.startsWith('data:') ? imgUrl.split(',')[1] : Utilities.base64Encode(UrlFetchApp.fetch(imgUrl).getBlob().getBytes());
  const res = UrlFetchApp.fetch('https://api.imgbb.com/1/upload', {
    method: 'post',
    payload: { key: key, image: b64 },
    muteHttpExceptions: true
  });
  const data = JSON.parse(res.getContentText());
  if (data.success) return data.data.url;
  throw new Error('ImgBB 上傳失敗');
}

// ========== LINE API ==========
function reply(token, lineToken, text) {
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + lineToken },
    payload: JSON.stringify({ replyToken: token, messages: [{ type: 'text', text }] })
  });
}

function push(uid, text, lineToken) {
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + lineToken },
    payload: JSON.stringify({ to: uid, messages: [{ type: 'text', text }] })
  });
}

function pushResult(uid, imgUrl, prompt, model, size, lineToken) {
  const time = Utilities.formatDate(new Date(), 'Asia/Taipei', 'MM/dd HH:mm');
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + lineToken },
    payload: JSON.stringify({
      to: uid,
      messages: [
        { type: 'image', originalContentUrl: imgUrl, previewImageUrl: imgUrl },
        { type: 'text', text: `✅ 生成完成！\n\n📝 ${prompt}\n🤖 ${model.icon} ${model.name}\n📐 ${size.w}×${size.h}\n🕐 ${time}\n\n🔗 ${imgUrl}` }
      ]
    })
  });
}

// ========== 偏好設定 ==========
function getPref(uid, key) {
  return PropertiesService.getScriptProperties().getProperty(key + '_' + uid);
}
function setPref(uid, key, val) {
  PropertiesService.getScriptProperties().setProperty(key + '_' + uid, val);
}

// ========== 說明訊息 ==========
function helpMsg() {
  return `🎨 繁中生圖 LINE Bot
━━━━━━━━━━━━━━

📝 使用：直接輸入描述

💬 範例：
• 一隻可愛的柴犬
• 海報寫著「新年快樂」

━━━━━━━━━━━━━━
⚙️ 指令：

/myid - 取得你的 User ID
/help - 說明
/models - 模型列表
/model 名稱 - 切換
/size 寬x高 - 尺寸
/status - 目前設定`;
}

function modelsMsg() {
  return `🤖 可用模型
━━━━━━━━━━━━━━

💡 ideogram - 最佳中文字 ⭐
👑 flux-pro - 高品質
🔮 sd35 - Stability
🧠 qwen-image - 通義千問中文強
⚡ z-turbo - 極速8步
✨ recraft - 向量設計風

━━━━━━━━━━━━━━
切換：/model 名稱
例如：/model ideogram`;
}
