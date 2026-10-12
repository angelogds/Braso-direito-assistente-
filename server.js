const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const PORT = Number(process.env.PORT || 3000);
const html = fs.readFileSync(path.join(__dirname,'public','index.html'));
http.createServer((req,res)=>{
  const pathname = new URL(req.url,'http://localhost').pathname;
  if(req.method==='GET' && pathname==='/health'){
    res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
    return res.end(JSON.stringify({status:'ok',service:'braco-direito-assistente',mode:'prototype'}));
  }
  if(req.method==='GET' && pathname==='/'){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"});
    return res.end(html);
  }
  res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});
  res.end('Não encontrado');
}).listen(PORT,'0.0.0.0',()=>console.log('Braço Direito rodando na porta '+PORT));
