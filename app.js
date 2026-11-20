/* Versión sin framework: scripts clásicos compatibles con abrir index.html directamente. */
(() => {
 'use strict';
 const { BANK, isCorrect } = window.Berufe;
 const root = document.getElementById('screen');
 const boardButton = document.getElementById('board');
 const soundButton = document.getElementById('sound');
 const KEY = 'berufe-rosco-scores';
 let screen = 'start', name = '', limit = 180, sound = true, items = [], idx = 0, left = 180, timer = null, audio = null, scores = readScores(), flashTimer;
 function escape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
 function readScores() { try { const data = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(data) ? data.filter(s => s && typeof s.name === 'string' && Number.isFinite(s.score) && Number.isFinite(s.seconds)) : []; } catch { return []; } }
 function beep(freq, duration = .15) { if (!sound) return; try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); audio.resume(); const o = audio.createOscillator(), g = audio.createGain(); o.frequency.value = freq; o.connect(g); g.connect(audio.destination); g.gain.setValueAtTime(.15, audio.currentTime); g.gain.exponentialRampToValueAtTime(.001, audio.currentTime + duration); o.start(); o.stop(audio.currentTime + duration); } catch {} }
 function stopTimer() { clearInterval(timer); timer = null; clearTimeout(flashTimer); }
 function show(value) { stopTimer(); screen = value; boardButton.hidden = screen === 'game'; render(); }
 function start() {
  stopTimer(); items = BANK.map(l => ({letter:l.letter,contains:!!l.contains,entry:l.bank[Math.floor(Math.random()*l.bank.length)],status:'pending',given:''})); idx = 0; left = limit; screen = 'game'; boardButton.hidden = true; render();
  timer = setInterval(() => { left--; const time = document.getElementById('time'); if (time) { time.textContent = `⏱ ${left}s`; time.className = `stat${left <= 20 ? ' fail urgent' : ''}`; } if (left <= 0) finish(); },1000);
 }
 function finish() {
  stopTimer(); const score = items.filter(it => it.status === 'ok').length;
  scores = [...scores,{name:name.trim() || 'Anónimo',score,total:items.length,seconds:limit-left,date:new Date().toLocaleDateString('es-ES')}].sort((a,b) => b.score-a.score || a.seconds-b.seconds).slice(0,10);
  try { localStorage.setItem(KEY,JSON.stringify(scores)); } catch { /* Conserva el marcador en memoria cuando el navegador bloquea almacenamiento. */ }
  beep(330,.5); screen = 'results'; boardButton.hidden = false; render();
 }
 function next() { for(let k=1;k<=items.length;k++){ const j=(idx+k)%items.length; if(items[j].status==='pending') return j; } return -1; }
 function submit(event) {
  event.preventDefault(); const input=document.getElementById('answer'); const value=input.value; if(!value.trim()) return;
  const cur=items[idx]; const correct=isCorrect(value,cur.entry); cur.status=correct?'ok':'fail'; cur.given=value; beep(correct?880:200,correct?.15:.35);
  const n=next(); if(n===-1){finish();return;} idx=n; render();
  const clue=document.querySelector('.clue'); clue.classList.add(correct?'flash-ok':'flash-fail'); clearTimeout(flashTimer); flashTimer=setTimeout(()=>clue.classList.remove('flash-ok','flash-fail'),400);
 }
 function pass() { beep(520,.1); const n=next(); if(n!==-1) idx=n; render(); }
 function render() {
  if(screen==='start') {
   root.innerHTML=`<section class="panel start animate-pop"><h1 class="animate-float">Berufe<span class="accent">-Wortkreis</span></h1><p class="subtitle">Berufe auf Deutsch - 2A2</p><ul class="instructions"><li>🔤 Cada letra tiene una definición en alemán de una profesión.</li><li>✅ Escribe la profesión (masculino o femenino, con o sin <i>der/die</i>).</li><li>⏭️ <b>Pasapalabra</b> para dejarla para la siguiente vuelta.</li><li>⏱️ Responde todas antes de que se acabe el tiempo.</li></ul><input id="name" class="field name" placeholder="Tu nombre (opcional)" aria-label="Tu nombre (opcional)" value="${escape(name)}"><div class="choices">${[180,150,120].map(s=>`<button class="chip ${limit===s?'chip-active':''}" data-limit="${s}" aria-pressed="${limit===s}">${s} s</button>`).join('')}</div><button id="start" class="btn-accent launch">Los!</button></section>`;
   document.getElementById('name').addEventListener('input',e=>{name=e.target.value;});
   root.querySelectorAll('[data-limit]').forEach(b=>b.addEventListener('click',()=>{limit=Number(b.dataset.limit);render();}));
   document.getElementById('start').addEventListener('click',start);
  } else if(screen==='game') {
   const cur=items[idx], ok=items.filter(i=>i.status==='ok').length, fail=items.filter(i=>i.status==='fail').length;
   root.innerHTML=`<section><div class="stats"><span class="stat ok">✔ ${ok}</span><span id="time" class="stat${left<=20?' fail urgent':''}">⏱ ${left}s</span><span class="stat fail">✘ ${fail}</span></div><div class="circle">${items.map((it,i)=>{const a=i/items.length*2*Math.PI-Math.PI/2;return `<div class="letter ${it.status} ${i===idx?'letter-active':''}" style="left:${50+44*Math.cos(a)}%;top:${50+44*Math.sin(a)}%" aria-label="${it.letter}: ${it.status}">${it.letter}</div>`;}).join('')}<div class="clue"><p class="label">${cur.contains?'Enthält':'Beginnt mit'} ${cur.letter}</p><p class="definition">${escape(cur.entry.def)}</p></div></div><form id="answer-form"><input id="answer" class="field" placeholder="Deine Antwort…" aria-label="Deine Antwort" autocomplete="off" autocapitalize="off"><div class="answer-actions"><button type="submit" class="btn-primary">Antworten</button><button type="button" id="pass" class="btn-accent">Pasapalabra</button></div></form></section>`;
   document.getElementById('answer-form').addEventListener('submit',submit);document.getElementById('pass').addEventListener('click',pass);document.getElementById('answer').focus({preventScroll:true});
  } else if(screen==='results') {
   const ok=items.filter(i=>i.status==='ok').length, fail=items.filter(i=>i.status==='fail').length;
   root.innerHTML=`<section class="panel animate-pop"><h2>Ergebnis</h2><p class="score">${ok}<small>/${items.length}</small></p><p class="summary">${Math.round(ok/items.length*100)}% de aciertos · ${fail} errores</p><ul class="results">${items.map(it=>`<li><span class="result-letter ${it.status}">${it.letter}</span><span class="result-answer"><b>der ${escape(it.entry.m)}</b> / die ${escape(it.entry.f)}${it.status==='fail'?`<span class="wrong">Tu respuesta: ${escape(it.given)}</span>`:''}</span></li>`).join('')}</ul><div class="buttons"><button id="again" class="btn-accent">Jugar otra vez</button><button id="results-board" class="btn-primary">Marcador</button></div></section>`;
   document.getElementById('again').addEventListener('click',start);document.getElementById('results-board').addEventListener('click',()=>show('board'));
  } else {
   root.innerHTML=`<section class="panel animate-pop"><h2>🏆 Top 10</h2>${scores.length?`<div class="table-wrap"><table><thead><tr><th>#</th><th>Nombre</th><th>Puntos</th><th>Tiempo</th><th>Fecha</th></tr></thead><tbody>${scores.map((s,i)=>`<tr><td class="accent"><b>${i+1}</b></td><td>${escape(s.name)}</td><td><b>${s.score}/${s.total}</b></td><td>${s.seconds}s</td><td>${escape(s.date)}</td></tr>`).join('')}</tbody></table></div>`:'<p class="empty">Aún no hay partidas.</p>'}<div class="buttons"><button id="play" class="btn-accent">Jugar</button><button id="clear" class="btn-ghost">Borrar historial</button></div></section>`;
   document.getElementById('play').addEventListener('click',()=>show('start'));document.getElementById('clear').addEventListener('click',()=>{scores=[];try{localStorage.removeItem(KEY);}catch{}render();});
  }
 }
 document.getElementById('home').addEventListener('click',()=>show('start'));
 boardButton.addEventListener('click',()=>show('board'));
 soundButton.addEventListener('click',()=>{sound=!sound;soundButton.textContent=sound?'🔊':'🔇';soundButton.setAttribute('aria-pressed',String(sound));});
 render();
})();
