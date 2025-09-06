Copy and paste one of the codes to make it work
### Opción A — Inline (respeta CSP con 'unsafe-inline')
```javascript
javascript:(async()=>{ 
  const u='https://raw.githubusercontent.com/Pollamasiva69/gallinamasiva69/main/RepairTool.js';
  const r=await fetch(u,{cache:'no-store'});
  if(!r.ok){ alert('No pude descargar el script: '+r.status); return; }
  const code=await r.text();
  const s=document.createElement('script');
  s.textContent = code + '\n//# sourceURL=RepairTool.remote.js';
  document.documentElement.appendChild(s);
  // s.remove();
})();
```

### Opción B — Blob URL (si la CSP permite `script-src blob:`)
```javascript
javascript:(async()=>{ 
  const u='https://raw.githubusercontent.com/Pollamasiva69/gallinamasiva69/main/RepairTool.js';
  const r=await fetch(u,{cache:'no-store'});
  if(!r.ok){ alert('No pude descargar el script: '+r.status); return; }
  const code=await r.text();
  const url=URL.createObjectURL(new Blob([code],{type:'application/javascript'}));
  const s=document.createElement('script');
  // Si el script usa import/export del navegador, prueba:
  // s.type='module';
  s.src=url;
  document.head.appendChild(s);
  // limpiar luego si quieres:
  // setTimeout(()=>URL.revokeObjectURL(url), 5000);
})();
```
