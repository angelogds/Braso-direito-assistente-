'use strict';
const key='braco-direito-demo-tasks-v1';
const previews={trabalho:'Modo Trabalho: futuramente você poderá consultar OS, manutenção preventiva, demandas, compras e almoxarifado. Nenhum dado do CAD está conectado nesta versão.',pessoal:'Modo Pessoal: futuramente você poderá organizar agenda, lembretes e tarefas privadas. Não registre informações sensíveis nesta demonstração.'};
let currentMode='trabalho';
let tasks=[];
try{const stored=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(stored))tasks=stored.filter(x=>x&&typeof x.title==='string'&&['trabalho','pessoal'].includes(x.mode)).slice(0,100);}catch(_){}
const list=document.getElementById('task-list'),count=document.getElementById('task-count');
function save(){try{localStorage.setItem(key,JSON.stringify(tasks));}catch(_){alert('O navegador não permitiu salvar. Estas tarefas poderão desaparecer.');}}
function render(){list.replaceChildren();const filtered=tasks.filter(t=>t.mode===currentMode);count.textContent=filtered.length+' tarefa(s) — '+(currentMode==='trabalho'?'Trabalho':'Pessoal');if(!filtered.length){const e=document.createElement('li');e.textContent='Nenhuma tarefa neste ambiente.';list.append(e);return;}filtered.forEach(t=>{const li=document.createElement('li');const label=document.createElement('label');const check=document.createElement('input');check.type='checkbox';check.checked=Boolean(t.done);check.addEventListener('change',()=>{t.done=check.checked;save();render();});const span=document.createElement('span');span.textContent=t.title;if(t.done)span.style.textDecoration='line-through';label.append(check,span);const del=document.createElement('button');del.type='button';del.textContent='Excluir';del.setAttribute('aria-label','Excluir tarefa '+t.title);del.addEventListener('click',()=>{tasks=tasks.filter(x=>x.id!==t.id);save();render();});li.append(label,del);list.append(li);});}
function setMode(mode){currentMode=mode;document.getElementById('task-mode').value=mode;document.getElementById('mode-label').textContent=mode==='trabalho'?'Ambiente profissional (prévia)':'Ambiente pessoal (prévia)';document.getElementById('preview').textContent=previews[mode];render();}
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{setMode(b.dataset.mode);document.querySelector('#tarefas').scrollIntoView({behavior:'smooth',block:'center'});}));
document.getElementById('show-trabalho').addEventListener('click',()=>setMode('trabalho'));
document.getElementById('show-pessoal').addEventListener('click',()=>setMode('pessoal'));
document.getElementById('task-mode').addEventListener('change',e=>setMode(e.target.value));
document.getElementById('task-form').addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('task-title');const title=input.value.trim();if(!title)return;if(tasks.length>=100){alert('Limite de 100 tarefas nesta demonstração.');return;}tasks.push({id:Date.now()+'-'+Math.random().toString(36).slice(2),title,mode:currentMode,done:false});input.value='';save();render();input.focus();});
document.getElementById('clear-done').addEventListener('click',()=>{tasks=tasks.filter(t=>!(t.mode===currentMode&&t.done));save();render();});
render();
