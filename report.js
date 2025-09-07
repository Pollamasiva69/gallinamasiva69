// Auto Report Stress Tester v8 - Con controles avanzados de personalización
class AutoReportStressTester {
   constructor() {
       this.isRunning = false;
       this.reportCount = 0;
       this.errors = 0;
       this.successes = 0;
       this.currentUserId = null;
       this.currentUsername = null;
       this.debugLogs = [];
       this.reportedUsers = new Set();
       this.allowDuplicates = false;
       this.currentCoords = this.getCoordinatesFromURL();
       
       this.config = {
           endpoint: 'https://backend.wplace.live/report-user',
           delayBetweenReports: 1000,
           maxReports: 10,
           useRandomUA: true,
           useRandomMessage: true,
           selectedUA: 0,
           selectedMessage: ''
       };
       
       this.userAgents = [
           'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
           'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
           'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
           'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0',
           'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0 Safari/537.36',
           'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
           'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
           'Mozilla/5.0 (Linux; Android 14; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
           'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
           'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0',
           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
           'Mozilla/5.0 (Windows NT 11.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
           'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0'
       ];
       
       this.reasons = [
           'inappropriate-content',
           'hate-speech', 
           'doxxing',
           'bot',
           'griefing',
           'other'
       ];
       
       this.reasonMessages = {
           'inappropriate-content': [
               'El usuario ha compartido contenido sexual explícito repetidamente',
               'Publicó imágenes pornográficas en el chat público',
               'Contenido +18 sin advertencia en área familiar',
               'Enlaces a sitios pornográficos enviados múltiples veces',
               'Imágenes de desnudos compartidas sin consentimiento',
               'Contenido sexual gráfico dirigido a menores',
               'Spam de material pornográfico en comentarios',
               'Distribuye contenido sexual no consensual'
           ],
           'hate-speech': [
               'Comentarios racistas hacia usuarios afroamericanos',
               'Lenguaje homofóbico sistemático en chat público',
               'Promovió simbolos nazis y supremacía blanca',
               'Insultos antisemitas repetidos hacia la comunidad',
               'Discurso transfóbico y discriminatorio constante',
               'Incitación al odio contra inmigrantes latinos',
               'Amenazas de violencia racial en múltiples ocasiones',
               'Propaganda de grupos extremistas compartida',
               'Slurs raciales usados sistemáticamente',
               'Discurso de odio contra comunidad musulmana'
           ],
           'doxxing': [
               'Compartió dirección residencial de otro usuario',
               'Publicó números de teléfono personales sin autorización',
               'Reveló nombre real y lugar de trabajo de víctima',
               'Amenazó con publicar fotos privadas robadas',
               'Distribuyó información bancaria de otros usuarios',
               'Compartió ubicación GPS en tiempo real de víctima',
               'Publicó datos familiares incluyendo menores de edad',
               'Reveló historial médico privado sin consentimiento'
           ],
           'bot': [
               'Uso de macro automatizado para colocar píxeles perfectamente',
               'Velocidad de clicks imposible para humanos detectada',
               'Patrones geométricos perfectos indican automatización',
               'Scripts de JavaScript detectados en comportamiento',
               'Colocación simultánea en múltiples coordenadas',
               'Tiempo de respuesta menor a 50ms entre clicks',
               'Comportamiento robótico sin variación humana natural',
               'Software de OCR para leer canvas automáticamente',
               'Bot detectado pintando 24/7 sin descanso',
               'Algoritmo de pathfinding automático observado',
               'Uso de API no oficial para bypass de rate limits',
               'Multiple cuentas controladas por mismo bot',
               'Auto-clicker con precisión pixel-perfect detectado',
               'Scripts de Python corriendo en segundo plano',
               'Comportamiento de IA generativa en patrones',
               'Selenium WebDriver detectado en actividad',
               'Automation tools como Puppeteer identificados',
               'Coordenadas calculadas matemáticamente sin error',
               'Movimiento de mouse en líneas perfectamente rectas',
               'Actividad continua durante horarios de sueño humano',
               'Uso de headless browser para automatización',
               'Canvas manipulation mediante DOM scripting',
               'Auto-refresh y auto-paint detectado claramente',
               'Múltiples ventanas sincronizadas automáticamente',
               'Hash de imagen usado para auto-detection',
               'Computer vision aplicada para pixel placement',
               'Machine learning pattern recognition activo',
               'Batch processing de múltiples imágenes simultáneas',
               'Server-side rendering para acelerar colocación',
               'Database queries automatizadas para coordinates'
           ],
           'griefing': [
               'Destrucción sistemática del logo de Reddit',
               'Sabotaje coordinado del pixel art comunitario principal',
               'Borrado malicioso de memorial tribute completado',
               'Vandalizó artwork de caridad benéfica deliberadamente',
               'Destruyó colaboración internacional de 200+ usuarios',
               'Griefing específico contra artwork LGBT+ con odio',
               'Saboteó proyecto educativo de universidad local',
               'Destrucción de pixel art dedicado a víctimas',
               'Borró trabajo colaborativo de 48 horas consecutivas',
               'Vandalismo dirigido contra comunidades minoritarias',
               'Griefing de memorial a persona fallecida recientemente',
               'Destrucción intencional durante stream en vivo',
               'Sabotaje de artwork durante evento especial importante',
               'Borrado masivo de zona cultural patrimonio',
               'Vandalismo coordinado con múltiples cuentas alt',
               'Destruyó pixel art de caridad contra el cáncer',
               'Griefing específico durante conmemoración histórica',
               'Saboteó colaboración pacífica entre comunidades rivales',
               'Destrucción de artwork infantil de escuela primaria',
               'Borrado de proyecto conmemorativo del 11-S',
               'Vandalismo de bandera nacional durante fecha patria',
               'Griefing de artwork religioso con intent ofensivo',
               'Destrucción de pixel art supporting Ukraine',
               'Saboteó proyecto benéfico para animales en peligro',
               'Borrado de artwork de awareness sobre salud mental',
               'Vandalismo durante tributo a trabajadores esenciales',
               'Destruyó colaboración de artistas con discapacidad',
               'Griefing de memorial COVID-19 victims tribute',
               'Saboteó artwork de concientización sobre cambio climático',
               'Destrucción maliciosa de proyecto de paz mundial'
           ],
           'other': [
               'Comportamiento disruptivo sistemático en comunidad',
               'Spam masivo en chat con contenido irrelevante',
               'Evasión de ban usando cuentas alternativas múltiples',
               'Actividad sospechosa indicando cuenta comprometida',
               'Manipulación de votos usando sockpuppet accounts',
               'Brigading organizado contra usuarios específicos',
               'Impersonación de moderador para confundir usuarios',
               'Phishing attempts dirigidos a otros miembros'
           ]
       };
       
       this.createUI();
       this.makeDraggable();
       this.startReportButtonObserver();
       this.startURLMonitoring();
       this.log('Auto Stress Tester v8 iniciado - Con controles avanzados');
   }
   
   getCoordinatesFromURL() {
       const url = new URL(window.location.href);
       const lat = url.searchParams.get('lat');
       const lng = url.searchParams.get('lng');
       const zoom = url.searchParams.get('zoom');
       
       return {
           latitude: lat || (36 + Math.random() * 4).toFixed(14),
           longitude: lng || (-6 + Math.random() * 2).toFixed(16),
           zoom: zoom || (14 + Math.random()).toFixed(1)
       };
   }
   
   startURLMonitoring() {
       // Monitorear cambios en la URL
       let lastURL = window.location.href;
       
       const checkURL = () => {
           if (window.location.href !== lastURL) {
               lastURL = window.location.href;
               this.updateCoordinatesFromURL();
           }
       };
       
       setInterval(checkURL, 1000);
       
       // También monitorear cambios de popstate
       window.addEventListener('popstate', () => {
           setTimeout(() => this.updateCoordinatesFromURL(), 100);
       });
   }
   
   updateCoordinatesFromURL() {
       const newCoords = this.getCoordinatesFromURL();
       const oldCoords = this.currentCoords;
       
       if (newCoords.latitude !== oldCoords.latitude || 
           newCoords.longitude !== oldCoords.longitude || 
           newCoords.zoom !== oldCoords.zoom) {
           
           this.currentCoords = newCoords;
           this.updateCoordsDisplay();
           this.log(`Coordenadas actualizadas desde URL:`);
           this.log(`   Lat: ${newCoords.latitude.substring(0,10)}...`);
           this.log(`   Lng: ${newCoords.longitude.substring(0,10)}...`);
           this.log(`   Zoom: ${newCoords.zoom}`);
       }
   }
   
   updateCoordsDisplay() {
       const coordsElement = document.getElementById('coords-display');
       if (coordsElement) {
           coordsElement.textContent = `${this.currentCoords.latitude.substring(0,8)}, ${this.currentCoords.longitude.substring(0,8)}`;
       }
   }
   
   getSelectedUserAgent() {
       if (this.config.useRandomUA) {
           return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
       } else {
           return this.userAgents[this.config.selectedUA];
       }
   }
   
   createVariedImage() {
       const canvas = document.createElement('canvas');
       const size = Math.floor(Math.random() * 3) + 1;
       canvas.width = size;
       canvas.height = size;
       const ctx = canvas.getContext('2d');
       
       const colors = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'];
       ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
       ctx.fillRect(0, 0, size, size);
       
       if (Math.random() > 0.5) {
           ctx.fillStyle = '#FFFFFF';
           ctx.fillRect(0, 0, 1, 1);
       }
       
       return new Promise(resolve => {
           canvas.toBlob(resolve, 'image/jpeg', Math.random() * 0.3 + 0.1);
       });
   }
   
   showSuccessAnimation() {
       const panel = document.getElementById('auto-stress-tester');
       
       const successElement = document.createElement('div');
       successElement.style.cssText = `
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           background: linear-gradient(45deg, #27ae60, #2ecc71);
           color: white;
           padding: 15px 25px;
           border-radius: 50px;
           font-weight: bold;
           font-size: 14px;
           box-shadow: 0 10px 30px rgba(39, 174, 96, 0.4);
           z-index: 10001;
           animation: successPulse 2s ease-in-out;
           pointer-events: none;
       `;
       successElement.textContent = 'REPORT SUCCESS!';
       
       if (!document.getElementById('success-animation-style')) {
           const style = document.createElement('style');
           style.id = 'success-animation-style';
           style.textContent = `
               @keyframes successPulse {
                   0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                   30% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                   70% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                   100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
               }
               @keyframes borderSuccess {
                   0% { border-color: #16213e; }
                   50% { border-color: #27ae60; box-shadow: 0 0 20px rgba(39, 174, 96, 0.5); }
                   100% { border-color: #16213e; }
               }
           `;
           document.head.appendChild(style);
       }
       
       panel.style.position = 'relative';
       panel.appendChild(successElement);
       panel.style.animation = 'borderSuccess 2s ease-in-out';
       
       setTimeout(() => {
           if (successElement.parentNode) {
               successElement.remove();
           }
           panel.style.animation = '';
       }, 2000);
   }
   
   createUI() {
       const panel = document.createElement('div');
       panel.id = 'auto-stress-tester';
       panel.style.cssText = `
           position: fixed;
           top: 20px;
           right: 20px;
           width: 450px;
           background: #1a1a2e;
           border: 2px solid #16213e;
           border-radius: 10px;
           padding: 15px;
           color: white;
           font-family: 'Consolas', monospace;
           font-size: 11px;
           z-index: 10000;
           box-shadow: 0 15px 35px rgba(0,0,0,0.7);
           cursor: move;
           transition: border-color 0.3s ease;
       `;
       
       panel.innerHTML = `
           <div id="drag-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; cursor: move; padding: 5px;">
               <h3 style="margin: 0; color: #ff6b6b; text-shadow: 0 0 10px #ff6b6b; user-select: none;">Rerport v8 @root</h3>
               <button id="close-auto-tester" style="background: #ff4757; border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer;">×</button>
           </div>
           
           <div style="background: #0f0f23; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
               <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                   <span>Target User:</span>
                   <span id="target-info" style="color: #5dade2;">Esperando Report button...</span>
               </div>
               <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                   <span>Estado:</span>
                   <span id="status-info" style="color: #f39c12;">Listo</span>
               </div>
               <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                   <span>Coords:</span>
                   <span id="coords-display" style="color: #2ecc71; font-size: 9px;">${this.currentCoords.latitude.substring(0,8)}, ${this.currentCoords.longitude.substring(0,8)}</span>
               </div>
               <div style="display: flex; justify-content: space-between;">
                   <span>Reportados:</span>
                   <span id="reported-users" style="color: #e67e22;">0</span>
               </div>
           </div>
           
           <div style="margin-bottom: 10px;">
               <label style="display: block; margin-bottom: 5px; color: #bdc3c7;">User Agent:</label>
               <div style="display: flex; gap: 10px; margin-bottom: 5px;">
                   <label><input type="radio" name="ua-mode" value="random" checked style="margin-right: 5px;"> Aleatorio</label>
                   <label><input type="radio" name="ua-mode" value="fixed" style="margin-right: 5px;"> Fijo</label>
               </div>
               <select id="ua-select" style="width: 100%; padding: 5px; border: 1px solid #34495e; border-radius: 3px; background: #2c3e50; color: white; font-size: 10px;" disabled>
                   <option value="0">Chrome Windows</option>
                   <option value="1">Firefox Windows</option>
                   <option value="2">Chrome macOS</option>
                   <option value="3">Safari macOS</option>
                   <option value="4">Chrome Linux</option>
                   <option value="5">Firefox Linux</option>
                   <option value="6">Edge Windows</option>
                   <option value="7">Safari iPhone</option>
                   <option value="8">Safari iPad</option>
                   <option value="9">Chrome Android Samsung</option>
                   <option value="10">Chrome Android Pixel</option>
                   <option value="11">Opera Windows</option>
                   <option value="12">Chrome macOS Old</option>
                   <option value="13">Firefox Windows 11</option>
                   <option value="14">Firefox Linux</option>
               </select>
           </div>
           
           <div style="margin-bottom: 10px;">
               <label style="display: block; margin-bottom: 5px; color: #bdc3c7;">Mensaje:</label>
               <div style="display: flex; gap: 10px; margin-bottom: 5px;">
                   <label><input type="radio" name="message-mode" value="random" checked style="margin-right: 5px;"> Aleatorio</label>
                   <label><input type="radio" name="message-mode" value="custom" style="margin-right: 5px;"> Personalizado</label>
               </div>
               <textarea id="custom-message" placeholder="Escribe tu mensaje personalizado aquí..." style="width: 100%; height: 60px; padding: 5px; border: 1px solid #34495e; border-radius: 3px; background: #2c3e50; color: white; font-size: 11px; resize: vertical;" disabled></textarea>
           </div>
           
           <div style="margin-bottom: 10px;">
               <label>
                   <input id="allow-duplicates" type="checkbox" style="margin-right: 8px;">
                   <span style="color: #f39c12;">Permitir reportes duplicados</span>
               </label>
           </div>
           
           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
               <div>
                   <label style="display: block; margin-bottom: 3px; color: #bdc3c7;">Cantidad:</label>
                   <input id="auto-max-reports" type="number" value="500" min="1" max="1000" style="width: 100%; padding: 5px; border: 1px solid #34495e; border-radius: 3px; background: #2c3e50; color: white; font-size: 11px;">
               </div>
               <div>
                   <label style="display: block; margin-bottom: 3px; color: #bdc3c7;">Delay (ms):</label>
                   <input id="auto-delay" type="number" value="3000" min="100" max="10000" style="width: 100%; padding: 5px; border: 1px solid #34495e; border-radius: 3px; background: #2c3e50; color: white; font-size: 11px;">
               </div>
           </div>
           
           <div style="margin-bottom: 10px;">
               <label style="display: block; margin-bottom: 3px; color: #bdc3c7;">Razón:</label>
               <select id="auto-reason" style="width: 100%; padding: 5px; border: 1px solid #34495e; border-radius: 3px; background: #2c3e50; color: white; font-size: 11px;">
                   <option value="random">Aleatorio</option>
                   <option value="inappropriate-content">Contenido inapropiado</option>
                   <option value="hate-speech">Discurso de odio</option>
                   <option value="doxxing">Doxxing</option>
                   <option value="bot">Botting</option>
                   <option value="griefing">Griefing</option>
                   <option value="other">Otro</option>
               </select>
           </div>
           
           <div style="display: flex; gap: 8px; margin-bottom: 15px;">
               <button id="auto-start" style="flex: 1; background: #27ae60; border: none; color: white; padding: 10px; border-radius: 5px; cursor: pointer; font-weight: bold;">▶ Start Test</button>
               <button id="auto-stop" style="flex: 1; background: #e74c3c; border: none; color: white; padding: 10px; border-radius: 5px; cursor: pointer;" disabled>⏹ Stop</button>
               <button id="manual-report" style="background: #3498db; border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer;">📤</button>
           </div>
           
           <div style="background: #0f0f23; padding: 8px; border-radius: 5px; margin-bottom: 10px;">
               <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; text-align: center;">
                   <div>
                       <div style="color: #bdc3c7; font-size: 9px;">ENVIADOS</div>
                       <div id="sent-count" style="color: #3498db; font-weight: bold; font-size: 14px;">0</div>
                   </div>
                   <div>
                       <div style="color: #bdc3c7; font-size: 9px;">ÉXITOS</div>
                       <div id="success-count-auto" style="color: #27ae60; font-weight: bold; font-size: 14px;">0</div>
                   </div>
                   <div>
                       <div style="color: #bdc3c7; font-size: 9px;">ERRORES</div>
                       <div id="error-count-auto" style="color: #e74c3c; font-weight: bold; font-size: 14px;">0</div>
                   </div>
               </div>
           </div>
           
           <div style="background: #0a0a1a; border: 1px solid #1e1e3f; border-radius: 5px; padding: 8px;">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                   <span style="color: #f39c12; font-weight: bold;">Debug Log</span>
                   <div style="display: flex; gap: 5px;">
                       <button id="update-coords" style="background: none; border: 1px solid #3498db; color: #3498db; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 9px;">Update Coords</button>
                       <button id="clear-reported" style="background: none; border: 1px solid #e67e22; color: #e67e22; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 9px;">Reset Users</button>
                       <button id="clear-debug" style="background: none; border: 1px solid #34495e; color: #bdc3c7; padding: 2px 6px; border-radius: 3px; cursor: pointer; font-size: 9px;">Clear Log</button>
                   </div>
               </div>
               <div id="debug-log" style="max-height: 120px; overflow-y: auto; font-size: 10px; line-height: 1.3;">
                   <div style="color: #7f8c8d;">Esperando click en botón Report...</div>
               </div>
           </div>
       `;
       
       document.body.appendChild(panel);
       this.bindEvents();
   }
   
   makeDraggable() {
       const panel = document.getElementById('auto-stress-tester');
       const header = document.getElementById('drag-header');
       let isDragging = false;
       let startX, startY, startLeft, startTop;
       
       header.addEventListener('mousedown', (e) => {
           isDragging = true;
           startX = e.clientX;
           startY = e.clientY;
           startLeft = parseInt(window.getComputedStyle(panel).left, 10);
           startTop = parseInt(window.getComputedStyle(panel).top, 10);
           
           document.addEventListener('mousemove', handleMouseMove);
           document.addEventListener('mouseup', handleMouseUp);
           e.preventDefault();
       });
       
       function handleMouseMove(e) {
           if (!isDragging) return;
           
           const deltaX = e.clientX - startX;
           const deltaY = e.clientY - startY;
           
           panel.style.left = (startLeft + deltaX) + 'px';
           panel.style.top = (startTop + deltaY) + 'px';
           panel.style.right = 'auto';
       }
       
       function handleMouseUp() {
           isDragging = false;
           document.removeEventListener('mousemove', handleMouseMove);
           document.removeEventListener('mouseup', handleMouseUp);
       }
   }
   
   bindEvents() {
       document.getElementById('close-auto-tester').onclick = () => {
           this.stopTest();
           document.getElementById('auto-stress-tester').remove();
       };
       
       document.getElementById('auto-start').onclick = () => this.startAutoTest();
       document.getElementById('auto-stop').onclick = () => this.stopTest();
       document.getElementById('manual-report').onclick = () => this.sendManualReport();
       document.getElementById('clear-debug').onclick = () => this.clearDebug();
       document.getElementById('clear-reported').onclick = () => this.clearReportedUsers();
       document.getElementById('update-coords').onclick = () => this.forceUpdateCoords();
       
       document.getElementById('allow-duplicates').onchange = (e) => {
           this.allowDuplicates = e.target.checked;
           this.log(`Reportes duplicados: ${this.allowDuplicates ? 'PERMITIDOS' : 'BLOQUEADOS'}`);
       };
       
       // User Agent controls
       document.querySelectorAll('input[name="ua-mode"]').forEach(radio => {
           radio.onchange = (e) => {
               const isRandom = e.target.value === 'random';
               this.config.useRandomUA = isRandom;
               document.getElementById('ua-select').disabled = isRandom;
               this.log(`User Agent: ${isRandom ? 'ALEATORIO' : 'FIJO'}`);
           };
       });
       
       document.getElementById('ua-select').onchange = (e) => {
           this.config.selectedUA = parseInt(e.target.value);
           this.log(`UA seleccionado: ${e.target.options[e.target.selectedIndex].text}`);
       };
       
       // Message controls
       document.querySelectorAll('input[name="message-mode"]').forEach(radio => {
           radio.onchange = (e) => {
               const isRandom = e.target.value === 'random';
               this.config.useRandomMessage = isRandom;
               document.getElementById('custom-message').disabled = isRandom;
               this.log(`Mensaje: ${isRandom ? 'ALEATORIO' : 'PERSONALIZADO'}`);
           };
       });
       
       document.getElementById('custom-message').oninput = (e) => {
           this.config.selectedMessage = e.target.value;
       };
   }
   
   forceUpdateCoords() {
       this.updateCoordinatesFromURL();
       this.log('Coordenadas actualizadas manualmente');
   }
   
   clearReportedUsers() {
       this.reportedUsers.clear();
       document.getElementById('reported-users').textContent = '0';
       this.log('Lista de usuarios reportados limpiada');
   }
   
   log(message) {
       const timestamp = new Date().toLocaleTimeString();
       const logEntry = `[${timestamp}] ${message}`;
       this.debugLogs.push(logEntry);
       
       if (this.debugLogs.length > 50) {
           this.debugLogs = this.debugLogs.slice(-30);
       }
       
       this.updateDebugLog();
       console.log(logEntry);
   }
   
   updateDebugLog() {
       const debugElement = document.getElementById('debug-log');
       if (debugElement) {
           debugElement.innerHTML = this.debugLogs
               .slice(-10)
               .map(log => `<div style="margin-bottom: 2px; color: ${this.getLogColor(log)}">${log}</div>`)
               .join('');
           debugElement.scrollTop = debugElement.scrollHeight;
       }
   }
   
   getLogColor(log) {
       if (log.includes('éxito') || log.includes('success')) return '#27ae60';
       if (log.includes('Error') || log.includes('falló')) return '#e74c3c';
       if (log.includes('encontrado') || log.includes('detectado') || log.includes('actualizadas')) return '#3498db';
       if (log.includes('Advertencia') || log.includes('409') || log.includes('Saltando')) return '#f39c12';
       if (log.includes('bloqueado')) return '#e67e22';
       if (log.includes('PERMITIDOS') || log.includes('ALEATORIO')) return '#2ecc71';
       if (log.includes('BLOQUEADOS') || log.includes('FIJO') || log.includes('PERSONALIZADO')) return '#e74c3c';
       return '#bdc3c7';
   }
   
   startReportButtonObserver() {
       this.log('Observando clicks en botones Report User');
       
       document.addEventListener('click', (event) => {
           const button = event.target.closest('button');
           if (button && button.textContent.includes('Report User')) {
               this.log('Click detectado en botón Report User');
               setTimeout(() => {
                   this.detectUserFromReportModal();
               }, 500);
           }
       });
       
       this.log('Observer de botón Report activado');
   }
   
   detectUserFromReportModal() {
       const userIdInput = document.querySelector('input[name="reportedUserId"]');
       
       if (userIdInput && userIdInput.value) {
           this.currentUserId = userIdInput.value;
           
           if (!this.allowDuplicates && this.reportedUsers.has(this.currentUserId)) {
               this.log(`Usuario ${this.currentUserId} ya fue reportado previamente (409)`);
               return;
           }
           
           this.log(`ID encontrado para usuario: ${this.currentUserId}`);
           
           const modalText = document.querySelector('.modal-box')?.textContent || '';
           const userMatch = modalText.match(/([^#\s]+)#(\d+)/);
           
           if (userMatch) {
               this.currentUsername = userMatch[1];
               this.log(`Usuario completo detectado: ${this.currentUsername}#${this.currentUserId}`);
           }
           
           const displayText = this.currentUsername ? 
               `${this.currentUsername}#${this.currentUserId}` : 
               `ID: ${this.currentUserId}`;
           document.getElementById('target-info').textContent = displayText;
           document.getElementById('target-info').style.color = '#27ae60';
           
           this.log(`Objetivo establecido: ${displayText}`);
       } else {
           this.log('No se encontró input reportedUserId o está vacío');
       }
   }
   
   getMessageForReason(reason) {
       if (!this.config.useRandomMessage && this.config.selectedMessage.trim()) {
           return this.config.selectedMessage.trim();
       }
       
       const messages = this.reasonMessages[reason];
       if (messages && messages.length > 0) {
           return messages[Math.floor(Math.random() * messages.length)];
       }
       return 'Comportamiento que viola las normas de la comunidad';
   }
   
   async generateAndSendReport() {
       if (!this.currentUserId) {
           this.log('Error: No hay User ID objetivo');
           return false;
       }
       
       if (!this.allowDuplicates && this.reportedUsers.has(this.currentUserId)) {
           this.log(`Saltando usuario ${this.currentUserId} - Ya reportado`);
           return false;
       }
       
       try {
           const reason = document.getElementById('auto-reason').value;
           const selectedReason = reason === 'random' ? 
               this.reasons[Math.floor(Math.random() * this.reasons.length)] : reason;
           
           const message = this.getMessageForReason(selectedReason);
           const userAgent = this.getSelectedUserAgent();
           
           // Crear imagen variada
           const imageBlob = await this.createVariedImage();
           const timestamp = Date.now();
           
           const data = new FormData();
           data.append('reportedUserId', this.currentUserId);
           data.append('latitude', this.currentCoords.latitude);
           data.append('longitude', this.currentCoords.longitude);
           data.append('zoom', this.currentCoords.zoom);
           data.append('reason', selectedReason);
           data.append('notes', message);
           data.append('image', imageBlob, `report-${timestamp}.jpeg`);
           
           this.log(`Enviando reporte #${this.reportCount + 1}:`);
           this.log(`   Usuario: ${this.currentUserId}`);
           this.log(`   Razón: ${selectedReason}`);
           this.log(`   UA: ${this.config.useRandomUA ? 'Aleatorio' : 'Fijo'}`);
           this.log(`   Mensaje: ${this.config.useRandomMessage ? 'Aleatorio' : 'Personalizado'}`);
           
           const response = await fetch(this.config.endpoint, {
               method: 'POST',
               body: data,
               credentials: 'include',
               headers: {
                   'User-Agent': userAgent
               }
           });
           
           this.reportCount++;
           
           if (response.ok) {
               const result = await response.json();
               this.successes++;
               this.reportedUsers.add(this.currentUserId);
               
               this.log(`Reporte #${this.reportCount} enviado con éxito (${response.status})`);
               if (result.success) {
                   this.log(`Servidor confirmó: {"success":true}`);
                   this.showSuccessAnimation();
               }
               
               document.getElementById('reported-users').textContent = this.reportedUsers.size;
               
           } else {
               this.errors++;
               if (response.status === 409) {
                   this.log(`Reporte #${this.reportCount} - Usuario ya reportado (409)`);
                   this.reportedUsers.add(this.currentUserId);
               } else if (response.status === 401) {
                   this.log(`Reporte #${this.reportCount} - No autorizado (401)`);
               } else if (response.status === 429) {
                   this.log(`Reporte #${this.reportCount} bloqueado - Rate limit detectado!`);
               } else if (response.status === 403) {
                   this.log(`Reporte #${this.reportCount} bloqueado - Medida de seguridad (403)`);
               } else {
                   this.log(`Reporte #${this.reportCount} falló con código: ${response.status}`);
               }
           }
           
           this.updateStats();
           return response.ok;
           
       } catch (error) {
           this.reportCount++;
           this.errors++;
           this.log(`Reporte #${this.reportCount} - Error de red: ${error.message}`);
           this.updateStats();
           return false;
       }
   }
   
   async sendManualReport() {
       await this.generateAndSendReport();
   }
   
   startAutoTest() {
       if (!this.currentUserId) {
           this.log('No hay usuario objetivo. Haz click en un botón "Report User" primero.');
           return;
       }
       
       if (this.isRunning) return;
       
       const maxReports = parseInt(document.getElementById('auto-max-reports').value);
       const delay = parseInt(document.getElementById('auto-delay').value);
       
       this.isRunning = true;
       document.getElementById('auto-start').disabled = true;
       document.getElementById('auto-stop').disabled = false;
       document.getElementById('status-info').textContent = 'Ejecutando...';
       document.getElementById('status-info').style.color = '#27ae60';
       
       const targetDisplay = this.currentUsername ? 
           `${this.currentUsername}#${this.currentUserId}` : 
           `ID: ${this.currentUserId}`;
       
       this.log(`Iniciando stress test personalizado:`);
       this.log(`   Objetivo inicial: ${targetDisplay}`);
       this.log(`   Reportes: ${maxReports} con delay ${delay}ms`);
       this.log(`   User Agent: ${this.config.useRandomUA ? 'ALEATORIO' : 'FIJO'}`);
       this.log(`   Mensaje: ${this.config.useRandomMessage ? 'ALEATORIO' : 'PERSONALIZADO'}`);
       this.log(`   Coords: Auto-actualizadas desde URL`);
       this.log(`   Duplicados: ${this.allowDuplicates ? 'PERMITIDOS' : 'BLOQUEADOS'}`);
       
       this.intervalId = setInterval(async () => {
           if (this.reportCount >= maxReports) {
               this.stopTest();
               return;
           }
           
           await this.generateAndSendReport();
       }, delay);
   }
   
   stopTest() {
       if (!this.isRunning) return;
       
       this.isRunning = false;
       
       if (this.intervalId) {
           clearInterval(this.intervalId);
           this.intervalId = null;
       }
       
       document.getElementById('auto-start').disabled = false;
       document.getElementById('auto-stop').disabled = true;
       document.getElementById('status-info').textContent = 'Detenido';
       document.getElementById('status-info').style.color = '#e74c3c';
       
       this.log(`Test detenido. Total: ${this.reportCount} reportes (${this.successes} éxitos, ${this.errors} errores)`);
       this.log(`Usuarios únicos reportados: ${this.reportedUsers.size}`);
       this.log(`Rate de éxito: ${((this.successes/this.reportCount)*100).toFixed(1)}%`);
   }
   
   updateStats() {
       document.getElementById('sent-count').textContent = this.reportCount;
       document.getElementById('success-count-auto').textContent = this.successes;
       document.getElementById('error-count-auto').textContent = this.errors;
   }
   
   clearDebug() {
       this.debugLogs = [];
       this.updateDebugLog();
       document.getElementById('debug-log').innerHTML = '<div style="color: #7f8c8d;">Log limpiado</div>';
   }
}

// Limpieza e inicialización
if (window.autoStressTester) {
   console.log('Removiendo instancia anterior...');
   const oldPanel = document.getElementById('auto-stress-tester');
   if (oldPanel) oldPanel.remove();
}

console.log('Auto Report Stress Tester v8 - Advanced Controls');
window.autoStressTester = new AutoReportStressTester();
