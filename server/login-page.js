// 登录/注册页：自包含单页，配色与排版刻意对齐 Fumadocs 文档站（同一套设计令牌 + 衬线标题），
// 仅字体走 Google Fonts CDN（与文档站 @fontsource 同源：Inter / Source Serif 4），离线自动回退系统字体。
export function loginPageHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>登录 · 我的项目文档</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" rel="stylesheet"/>
<style>
  :root{
    --bg:#f7f6f4; --card:#fcfcfb; --border:#e7e5e0; --fg:#16110c;
    --muted:#635d57; --primary:#2172cc; --primary-hover:#1b63b4; --primary-fg:#ffffff;
    --sans:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",sans-serif;
    --serif:"Source Serif 4",Georgia,"Songti SC","STSong",serif;
  }
  *{box-sizing:border-box;}
  html,body{height:100%;}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;
    color:var(--fg);font-family:var(--sans);
    -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
    background:var(--bg);}
  .card{width:440px;max-width:92vw;background:var(--card);border:1px solid var(--border);
    border-radius:14px;padding:44px 40px;box-shadow:0 1px 3px rgba(22,17,12,.05);}
  .brand{display:flex;align-items:center;gap:12px;margin-bottom:30px;}
  .logo{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex:none;
    background:var(--primary);box-shadow:0 1px 2px rgba(33,114,204,.25);}
  .logo svg{width:22px;height:22px;color:#fff;}
  .brand .name{font-size:16px;font-weight:600;letter-spacing:.2px;color:var(--fg);}
  h2{font-family:var(--serif);font-size:28px;line-height:1.15;margin:0 0 8px;font-weight:500;letter-spacing:-.018em;}
  .sub{color:var(--muted);font-size:14px;margin:0 0 28px;line-height:1.5;}
  .tabs{display:flex;gap:4px;padding:4px;background:#eeede9;border-radius:11px;margin-bottom:26px;}
  .tab{flex:1;text-align:center;padding:10px 0;border-radius:8px;font-size:14.5px;font-weight:500;
    cursor:pointer;color:var(--muted);border:none;background:transparent;transition:.15s;font-family:var(--sans);}
  .tab.active{background:var(--card);color:var(--fg);box-shadow:0 1px 2px rgba(0,0,0,.06);font-weight:600;}
  .field{margin-bottom:16px;}
  label{display:block;font-size:13px;font-weight:500;color:var(--muted);margin:0 0 8px;font-family:var(--sans);}
  input.text{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:9px;
    background:#fff;color:var(--fg);font-size:15px;font-family:var(--sans);outline:none;transition:.15s;}
  input.text::placeholder{color:#a39d94;}
  input.text:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(33,114,204,.15);}
  .row{display:flex;align-items:center;justify-content:space-between;margin:2px 0 22px;}
  .remember{display:flex;align-items:center;gap:8px;font-size:13.5px;color:var(--muted);cursor:pointer;user-select:none;}
  .remember input{width:15px;height:15px;accent-color:var(--primary);}
  button.submit{width:100%;padding:13px 0;border:none;border-radius:9px;
    background:var(--primary);color:#fff;font-size:16px;font-weight:600;cursor:pointer;transition:.15s;font-family:var(--sans);}
  button.submit:hover{background:var(--primary-hover);}
  button.submit:disabled{opacity:.65;cursor:default;}
  .msg{margin-top:16px;font-size:13.5px;min-height:18px;text-align:center;font-family:var(--sans);}
  .msg.err{color:#c0392b;} .msg.ok{color:#1d7a3f;}
  .foot{margin-top:26px;text-align:center;font-size:12.5px;color:#a39d94;font-family:var(--sans);}
  .user{font-size:14px;color:var(--muted);margin-bottom:16px;font-family:var(--sans);}
  .logout{background:#fff;border:1px solid var(--border);color:var(--fg);
    border-radius:9px;padding:11px 20px;font-size:14px;cursor:pointer;transition:.15s;font-family:var(--sans);}
  .logout:hover{background:#eeede9;}
</style>
</head>
<body>
  <div class="card">
    <div class="brand">
      <span class="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
          <path d="M5 3h9l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
          <path d="M9 13h6M9 17h6"/>
        </svg>
      </span>
      <span class="name">我的项目文档</span>
    </div>
    <div id="formBox">
      <h2 id="heading">登录到你的账户</h2>
      <p class="sub" id="subtitle">输入邮箱与密码以访问全部文档</p>
      <div class="tabs">
        <button class="tab active" data-mode="login">登录</button>
        <button class="tab" data-mode="register">注册</button>
      </div>
      <form id="authForm">
        <div class="field">
          <label for="email">邮箱</label>
          <input id="email" class="text" type="email" autocomplete="username" placeholder="you@example.com" required/>
        </div>
        <div class="field">
          <label for="password">密码</label>
          <input id="password" class="text" type="password" autocomplete="current-password" placeholder="至少 8 位，含字母和数字" required/>
        </div>
        <div class="row">
          <label class="remember"><input type="checkbox" id="remember"/> 记住我</label>
        </div>
        <button class="submit" type="submit" id="submitBtn">登录</button>
        <div class="msg" id="msg"></div>
      </form>
    </div>
    <div class="foot">受密码保护 · 仅授权用户可访问</div>
  </div>
<script>
  let mode='login';
  const tabs=document.querySelectorAll('.tab');
  const form=document.getElementById('authForm');
  const msg=document.getElementById('msg');
  const submitBtn=document.getElementById('submitBtn');
  const heading=document.getElementById('heading');
  const subtitle=document.getElementById('subtitle');
  function applyMode(){
    const login = mode==='login';
    heading.textContent = login ? '登录到你的账户' : '创建你的账户';
    subtitle.textContent = login ? '输入邮箱与密码以访问全部文档' : '注册一个账户以访问全部文档';
    submitBtn.textContent = login ? '登录' : '注册';
    msg.textContent=''; msg.className='msg';
  }
  tabs.forEach(function(t){
    t.onclick=function(){
      mode=t.dataset.mode;
      tabs.forEach(function(x){x.classList.remove('active');});
      t.classList.add('active');
      applyMode();
    };
  });
  // 已登录访问登录页：直接跳转进站（正常由服务端 302 完成，此处为兜底）
  fetch('/api/auth/me').then(function(r){return r.ok?r.json():null;}).then(function(u){
    if(u&&u.email){ location.replace('/'); }
  }).catch(function(){});
  form.onsubmit=function(e){
    e.preventDefault();
    msg.textContent=''; msg.className='msg';
    const email=document.getElementById('email').value.trim();
    const password=document.getElementById('password').value;
    submitBtn.disabled=true;
    fetch('/api/auth/'+mode,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:email,password:password})})
      .then(function(r){return r.json().then(function(d){return {ok:r.ok,data:d};});})
      .then(function(o){
        if(o.ok){ msg.textContent='成功，正在跳转…'; msg.className='msg ok'; location.href='/'; }
        else { msg.textContent=(o.data&&o.data.error)||'操作失败'; msg.className='msg err'; }
      })
      .catch(function(){ msg.textContent='网络错误'; msg.className='msg err'; })
      .finally(function(){ submitBtn.disabled=false; });
  };
</script>
</body>
</html>`;
}
