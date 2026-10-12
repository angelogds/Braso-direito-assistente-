'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const PORT=Number(process.env.PORT||3000),root=path.join(__dirname,'public');
const assets={'/':'index.html','/style.css':'style.css','/app.js':'app.js'};
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const attempts=new Map();
function json(res,code,data){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));}
function readBody(req){return new Promise((resolve,reject)=>{let body='';req.on('data',c=>{body+=c;if(body.length>18000){reject(new Error('too_large'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(body));}catch(e){reject(e);}});req.on('error',reject);});}
function constantEqual(a,b){const x=crypto.createHash('sha256').update(String(a)).digest(),y=crypto.createHash('sha256').update(String(b)).digest();return crypto.timingSafeEqual(x,y);}
http.createServer(async(req,res)=>{
const p=new URL(req.url,'http://localhost').pathname;
if(req.method==='GET'&&p==='/health')return json(res,200,{status:'ok',aiConfigured:Boolean(process.env.OPENAI_API_KEY),accessConfigured:Boolean(process.env.APP_ACCESS_PASSWORD)});
if(req.method==='POST'&&p==='/api/chat'){
if(!process.env.OPENAI_API_KEY||!process.env.APP_ACCESS_PASSWORD)return json(res,503,{error:'A IA ainda não está configurada. Configure OPENAI_API_KEY e APP_ACCESS_PASSWORD no Railway.'});
const ip=req.socket.remoteAddress||'unknown',now=Date.now(),hit=attempts.get(ip)||[];const recent=hit.filter(t=>now-t<60000);
if(recent.length>=12)return json(res,429,{error:'Limite de mensagens por minuto atingido.'});recent.push(now);attempts.set(ip,recent);if(attempts.size>1500)attempts.clear();
if(!constantEqual(req.headers['x-access-password']||'',process.env.APP_ACCESS_PASSWORD))return json(res,401,{error:'Senha de acesso incorreta.'});
let input;try{input=await readBody(req);}catch(e){return json(res,400,{error:'Mensagem inválida.'});}
const message=typeof input.message==='string'?input.message.trim():'';
if(!message||message.length>2000)return json(res,400,{error:'Digite uma mensagem de até 2.000 caracteres.'});
const mode=input.mode==='pessoal'?'pessoal':'trabalho';
const allowed=['Geral','Manutenção e PCM','Compras e Estoque','Organização pessoal'];
const agent=allowed.includes(input.agent)?input.agent:'Geral';
const system='Você é o Braço Direito Assistente, em português do Brasil. Contexto: '+mode+'. Especialidade selecionada: '+agent+'. Seja útil, objetivo e transparente. Você não tem acesso a dados reais, agenda, CAD, dispositivos ou WhatsApp e não deve afirmar que executou ações. Não misture dados pessoais e profissionais. Não solicite senhas nem segredos.';
const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),25000);
try{
const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+process.env.OPENAI_API_KEY},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',instructions:system,input:message,max_output_tokens:700}),signal:controller.signal});
const data=await response.json();
if(!response.ok){console.error('OpenAI request failed',response.status);return json(res,502,{error:'Falha na conexão com a OpenAI. Verifique chave, créditos e modelo.'});}
const output=(data.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('\n').trim();
return json(res,200,{answer:output||'Não consegui gerar uma resposta desta vez.'});
}catch(err){console.error('AI connection error:',err.name);return json(res,502,{error:'Serviço de IA temporariamente indisponível.'});}finally{clearTimeout(timeout);}
}
if(req.method==='GET'&&Object.prototype.hasOwnProperty.call(assets,p)){
const file=path.join(root,assets[p]);const content=fs.readFileSync(file);
res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; connect-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none"});return res.end(content);
}
return json(res,404,{error:'Não encontrado'});
}).listen(PORT,'0.0.0.0',()=>console.log('Braço Direito iniciado na porta '+PORT));
