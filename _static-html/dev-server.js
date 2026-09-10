const http=require('http'),fs=require('fs'),path=require('path');
const root=process.cwd(), port=4173;
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.jpg':'image/jpeg'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);
  if(p==='/')p='/index.html';
  const file=path.join(root,p);
  fs.readFile(file,(err,buf)=>{
    if(err){res.writeHead(404);return res.end('not found');}
    res.writeHead(200,{'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream'});
    res.end(buf);
  });
}).listen(port,()=>console.log('serving '+root+' on http://localhost:'+port));
