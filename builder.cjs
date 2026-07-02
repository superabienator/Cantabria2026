const fs = require('fs');

const days = [
  {
    page: 2, day: 1, color: "sky", bgColor: "sky-50", rotate: "rotate-1", icon: "🚗",
    title: "Día 1: Rumbo al Norte", subtitle: "Arguedas ➔ Penagos ➔ Santander",
    m1: "¡Despegue por carretera hasta la base en Penagos!", m2: "Subir al tren mágico \"El Magdaleno\" en la península.", m3: "Buscar pingüinos ninja y leones marinos en el minizoo.",
    itinerary: `<p class="text-[11px]"><strong>10:00 - 13:00</strong> | Viaje desde Arguedas (~2h 45min). Almuerzo de exploradores al llegar.</p><p class="text-[11px] mt-1"><strong>16:00</strong> | Desembarco en Santander. Tren turístico del Palacio de la Magdalena y paseo por la playa de El Sardinero.</p><div class="mt-2 text-[10px] text-sky-700 bg-sky-50 border border-dashed border-sky-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> Probar un helado tradicional de dos bolas gigantes en la Heladería Regma durante el paseo marítimo de El Sardinero.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.src='https://placehold.co/600x450/e0f2fe/0284c7?text=Tren+Magdalena'",
    imgCaption: "🚂 El Magdaleno en Santander",
    q1Text: "¿De qué color era el tren \"El Magdaleno\" en el que nos hemos subido hoy?", q1Extra: "w-32",
    q2Text: "¿Cuántas focas o pingüinos habéis visto nadando?", q2Extra: "w-12 text-center",
    minigame: "\"Detector de Gaviotas\" (¡Imita su graznido para hacer reír a la familia!)"
  },
  {
    page: 3, day: 2, color: "orange", bgColor: "orange-50", rotate: "-rotate-1", icon: "🐻",
    title: "Día 2: Reino de Cabárceno", subtitle: "Safari Salvaje",
    m1: "Descubrir a Bernardo el Oso Pardo y a sus hermanos.", m2: "Subir a la telecabina aérea para volar sobre los recintos.", m3: "Encontrar el elefante más gigante comiendo hojas.",
    itinerary: `<p class="text-[11px]"><strong>09:30 - 18:30</strong> | Entrada temprana para ver los animales más activos. Recorrido en coche con paradas. Picnic familiar.</p><p class="text-[11px] mt-1"><strong>Consejo:</strong> Llevar agua de sobra y calzado súper cómodo. Reserva online obligatoria con antelación.</p><div class="mt-2 text-[10px] text-orange-700 bg-orange-50 border border-dashed border-orange-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> Si os sobra un poco de tarde y queréis relax, podéis visitar el bonito pueblo histórico de Penagos o jugar libremente en el jardín de vuestra casita base.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.src='https://placehold.co/600x450/ffedd5/ea580c?text=Oso+Pardo'",
    imgCaption: "🐻 Bernardo el Oso en Cabárceno",
    q1Text: "¿Cuál ha sido el animal más gigante y con más pelo descubierto hoy?", q1Extra: "w-32",
    q2Text: "Dibuja una carita de cómo te sentiste volando en el teleférico sobre los osos:", q2Extra: "w-12 text-center\" placeholder=\"😀",
    minigame: "\"El Rugido Salvaje\" (¡Imita de forma graciosa el sonido de cada animal avistado!)"
  },
  {
    page: 4, day: 3, color: "emerald", bgColor: "emerald-50", rotate: "rotate-2", icon: "🌲",
    title: "Día 3: Potes y Bosques Gigantes", subtitle: "Montañas e Historia",
    m1: "Asaltar y subir la Torre del Infantado en Potes.", m2: "Abrazar un castaño milenario en El Habario.", m3: "Descubrir Mogrovejo (¡el pueblo de Heidi!).",
    itinerary: `<p class="text-[11px]"><strong>09:00 - 10:45</strong> | Viaje cruzando el Desfiladero de la Hermida (carretera de curvas cerradas y vistas impresionantes).</p><p class="text-[11px] mt-1"><strong>11:00 - 15:00</strong> | Paseo por Potes y asalto a la Torre del Infantado. Almuerzo montañés.</p><p class="text-[11px] mt-1"><strong>16:30 - 17:30</strong> | Paseo por el Castañar de El Habario.</p><div class="mt-2 text-[10px] text-emerald-700 bg-emerald-50 border border-dashed border-emerald-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> ¡Desvío súper recomendado a Mogrovejo! Es el pueblo donde se grabó la película de Heidi. Sus casitas de piedra y la gran montaña detrás os dejarán boquiabiertos.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.src='https://placehold.co/600x450/d1fae5/047857?text=Potes'",
    imgCaption: "⛰️ Valle de Liébana",
    q1Text: "¿Cuántos pasos de gigante necesitas para rodear el castaño milenario más ancho?", q1Extra: "w-12 text-center",
    q2Text: "¿Qué cosas divertidas se veían desde lo alto de la gran torre de Potes?", q2Extra: "w-32",
    minigame: "\"Abraza-Árboles\" (¿A cuántos miembros de la familia necesitas llamar para rodear el tronco?)"
  },
  {
    page: 5, day: 4, color: "yellow", bgColor: "yellow-50", rotate: "-rotate-2", icon: "🌻",
    title: "Día 4: Bisontes y Casas de Girasoles", subtitle: "Altamira & Gaudí",
    m1: "Encontrar el bisonte encogido en la cueva de Altamira.", m2: "Probar el bizcocho tradicional de Santillana del Mar con un vaso de leche.", m3: "Encontrar girasoles en la casa de chocolate (El Capricho).",
    itinerary: `<p class="text-[11px]"><strong>10:00 - 12:15</strong> | Museo de Altamira. Visita interactiva a la Neocueva para descubrir el arte paleolítico.</p><p class="text-[11px] mt-1"><strong>12:15 - 15:15</strong> | Paseo medieval en Santillana. Almuerzo y merienda obligatoria.</p><p class="text-[11px] mt-1"><strong>15:30 - 18:30</strong> | Comillas. El Capricho de Gaudí y jardines de Sobrellano.</p><div class="mt-2 text-[10px] text-yellow-700 bg-yellow-50 border border-dashed border-yellow-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> Los acantilados y ruinas de cuento del Molino de El Bolao en Cóbreces están a un desvío cortísimo de Comillas. Es un sitio impresionante donde las olas rompen con una fuerza increíble al lado de un antiguo molino abandonado.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.onerror=null; this.src='https://images.unsplash.com/photo-1523531294919-4bea7c65e894?auto=format&fit=crop&w=600&q=80'",
    imgCaption: "🌻 El Capricho de Gaudí en Comillas",
    q1Text: "Si vivieras en Altamira, ¿qué animal pintarías en el techo?", q1Extra: "w-32",
    q2Text: "La preciosa casa de Gaudí está decorada con flores amarillas, ¿cuál es?", q2Extra: "w-24",
    minigame: "\"Pintores de Cavernas\" (Proyecta sombras con tu mano para crear un bisonte corriendo)"
  },
  {
    page: 6, day: 5, color: "amber", bgColor: "amber-50/30", rotate: "rotate-1", icon: "🚂",
    title: "Día 5: Tren Minero y Secuoyas Gigantes", subtitle: "Bajo Tierra & Gigantes",
    m1: "Viajar al centro de la tierra en un tren minero en El Soplao.", m2: "Descubrir cabañas de paja de la Edad del Hierro en el Poblado Cántabro.", m3: "Tocar las nubes mirando las secuoyas gigantes del Monte Cabezón.",
    itinerary: `<p class="text-[11px]"><strong>10:30 - 12:00</strong> | Cueva de El Soplao. Acceso en tren minero. <strong>¡Ojo! Hace 12°C dentro, abrigarse.</strong></p><p class="text-[11px] mt-1"><strong>12:30 - 14:15</strong> | Poblado Cántabro. Edad del Hierro reconstruida.</p><p class="text-[11px] mt-1"><strong>16:00 - 17:30</strong> | Bosque de Secuoyas de Cabezón de la Sal. Pasarelas mágicas.</p><div class="mt-2 text-[10px] text-amber-700 bg-amber-50 border border-dashed border-amber-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> Podéis visitar el precioso y rústico pueblo de Carmona, famoso por sus artesanos de madera tradicionales y sus pacíficas calles empedradas junto al río Saja.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.src='https://placehold.co/600x450/fef3c7/b45309?text=Secuoyas'",
    imgCaption: "🌲 Secuoyas de Cabezón de la Sal",
    q1Text: "¿Hacía frío o calor dentro de la cueva? ¿Se te ha enfriado la nariz?", q1Extra: "w-32",
    q2Text: "Las secuoyas del bosque son tan altas que llegan hasta...", q2Extra: "w-24",
    minigame: "\"Eco-Eco\" (Dentro de la cueva susurra flojito y escucha cómo rebota tu voz)"
  },
  {
    page: 7, day: 6, color: "cyan", bgColor: "cyan-50/30", rotate: "-rotate-1", icon: "🌊",
    title: "Día 6: Laberintos de Roca y Mar", subtitle: "Costa Quebrada & Ferry",
    m1: "Encontrar cangrejos ninja en las pozas de Liencres.", m2: "Subir a la pasarela flotante de cristal del Centro Botín.", m3: "Cruzar en el mítico Ferry \"Los Reginas\" hasta Somo.",
    itinerary: `<p class="text-[11px]"><strong>10:00 - 13:30</strong> | Dunas y Costa Quebrada de Liencres. Explorar con marea baja.</p><p class="text-[11px] mt-1"><strong>15:30 - 19:30</strong> | Santander. Centro Botín y viaje en Ferry Los Reginas.</p><div class="mt-2 text-[10px] text-cyan-700 bg-cyan-50 border border-dashed border-cyan-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> Durante la visita a Liencres, no os perdáis el bosque de pinos colindante a las dunas. Hay senderos de arena fantásticos a la sombra para caminar y jugar a los exploradores espías.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.src='https://placehold.co/600x450/cffafe/0891b2?text=Costa+Quebrada'",
    imgCaption: "🌊 Costa Quebrada",
    q1Text: "¿Cuántos cangrejos ninja habéis visto ocultos entre las rocas de la playa?", q1Extra: "w-12 text-center",
    q2Text: "¿Al navegar en el ferry os salpicaba el agua fresca del mar?", q2Extra: "w-32",
    minigame: "\"Cazadores de Tesoros\" (Encuentra una concha vacía, una piedra lisa y un alga)"
  },
  {
    page: 8, day: 7, color: "teal", bgColor: "teal-50/30", rotate: "rotate-2", icon: "🐟",
    title: "Día 7: Cascadas y el Hombre Pez", subtitle: "Valles Pasiegos & Liérganes",
    m1: "Recorrer la senda secreta hasta el Churrón de Borleña.", m2: "Probar un sobao gigante tradicional pasiego.", m3: "Buscar al Hombre Pez escondido bajo el puente romano.",
    itinerary: `<p class="text-[11px]"><strong>09:30 - 11:30</strong> | Conducción por los Valles Pasiegos (mirador del Alto de la Braguía).</p><p class="text-[11px] mt-1"><strong>11:30 - 13:00</strong> | Senda corta y sombreada a la cascada de Borleña.</p><p class="text-[11px] mt-1"><strong>16:00 - 19:30</strong> | Liérganes. Visitar la estatua del Hombre Pez y merendar churros.</p><div class="mt-2 text-[10px] text-teal-700 bg-teal-50 border border-dashed border-teal-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> Al coronar el Alto de la Braguía en coche, hay un mirador espectacular. Merece la pena parar 5 minutos para sacar una foto familiar de los prados con vacas e infinitas laderas pasiegas verdes.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.src='https://placehold.co/600x450/ccfbf1/0f766e?text=Cascada+Lierganes'",
    imgCaption: "🌲 Senda de los Valles Pasiegos",
    q1Text: "¿Os daría un poco de miedo ver al Hombre Pez nadando por debajo del puente?", q1Extra: "w-32",
    q2Text: "¿A qué sabe el chocolate con churros de Liérganes?", q2Extra: "w-24",
    minigame: "\"El Invento del Sobao\" (Si fueras súper chef, ¿qué ingrediente loco le añadirías?)"
  },
  {
    page: 9, day: 8, color: "sky", bgColor: "sky-50/20", rotate: "-rotate-2", icon: "🏖️",
    title: "Día 8: Castillos de Arena y Arte Loco", subtitle: "Santoña, Laredo & Ajo",
    m1: "Dar un paseo en barco rodeando el Monte Buciero in Santoña.", m2: "Construir el castillo de arena más alto del norte en Laredo.", m3: "Encontrar círculos y estrellas de colores en el Faro de Okuda.",
    itinerary: `<p class="text-[11px]"><strong>10:30 - 13:00</strong> | Paseo por Santoña. Opcional barco al Monte Buciero.</p><p class="text-[11px] mt-1"><strong>15:30 - 18:30</strong> | Playa de la Salvé en Laredo. Juegos libres en la arena.</p><p class="text-[11px] mt-1"><strong>Extra:</strong> Visita al Faro de Ajo pintado por Okuda San Miguel.</p><div class="mt-2 text-[10px] text-sky-700 bg-sky-50 border border-dashed border-sky-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> ¡El Faro de Ajo es la joya oculta de este día! Al estar pintado íntegramente de colores psicodélicos por Okuda, es un espectáculo visual divertidísimo para los niños que parece salido de un dibujo animado.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.onerror=null; this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'",
    imgCaption: "🎨 Faro de Ajo Multicolor (Okuda)",
    q1Text: "¿Qué altura tenía la torre del súper castillo de arena de hoy?", q1Extra: "w-24",
    q2Text: "¿Qué animal de colores os recordó el Faro pintado por Okuda?", q2Extra: "w-32",
    minigame: "\"El Faro Geométrico\" (Intenta localizar círculos, triángulos y estrellas en el faro)"
  },
  {
    page: 10, day: 9, color: "amber", bgColor: "amber-50/10", rotate: "rotate-1", icon: "🚀",
    title: "Día 9: El Regreso de la Expedición", subtitle: "Soria ➔ Valencia",
    m1: "Guardar en tu mochila tus conchas y amuletos del norte.", m2: "Explorar el laberinto mágico de arcos medievales de piedra en Soria.", m3: "¡Convertirse en cohete espacial y aterrizar de vuelta en Valencia!",
    itinerary: `<p class="text-[11px]"><strong>10:00</strong> | Despedida de Penagos y maletas a bordo. Viaje por carretera.</p><p class="text-[11px] mt-1"><strong>13:15 - 16:00</strong> | Parada intermedia en Soria. Visita a los arcos entrelazados de San Juan de Duero y juegos libres.</p><p class="text-[11px] mt-1"><strong>16:00 - 19:30</strong> | Autovía de regreso A-23 a Valencia. ¡Misión cumplida!</p><div class="mt-2 text-[10px] text-amber-700 bg-amber-50 border border-dashed border-amber-300 p-2 rounded-xl"><strong>📍 Recomendación por Cercanía:</strong> El espectacular Parque de la Dehesa en Soria tiene amplias zonas de césped, columpios gigantes y mucha sombra, ideal para que los niños estiren las piernas y quemen algo de energía antes del tramo final de coche.</div>`,
    imgSrc: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80",
    imgOnError: "this.src='https://placehold.co/600x450/fef3c7/92400e?text=Soria+Arcos'",
    imgCaption: "📍 San Juan de Duero, Soria",
    q1Text: "¿Qué canción graciosa ha sido la que más habéis cantado en el coche?", q1Extra: "w-32",
    q2Text: "¿Qué ha sido lo más emocionante y favorito de toda la expedición?", q2Extra: "w-32",
    minigame: "\"La Dehesa Espacial\" (Carrera de cohetes listos para volver a casa)"
  }
];

let daysHtml = days.map(d => `
        <!-- PÁGINA ${d.page}: DÍA ${d.day} -->
        <div id="page-${d.page}" class="page-sheet p-6 md:p-8 border-${d.color}-300 bg-${d.bgColor} hidden">
            <!-- HEADER -->
            <div class="bg-${d.color}-400 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">${d.icon}</span>
                    <h2 class="font-fun text-2xl font-bold">${d.title}</h2>
                </div>
                <span class="text-xs font-bold bg-${d.color}-600 px-3 py-1 rounded-full">${d.subtitle}</span>
            </div>

            <!-- BOTÓN DE CONSEGUIDO DIARIO -->
            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-${d.color}-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-${d.color}-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-${d.page}" class="w-6 h-6 text-${d.color}-500 rounded-lg focus:ring-${d.color}-400" onchange="toggleDayCompletion(${d.page})">
                    <span class="font-fun text-xs font-bold text-${d.color}-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <!-- CUERPO PRINCIPAL -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-${d.color}-100 p-4 rounded-2xl border-2 border-${d.color}-300 kids-missions">
                        <h3 class="font-fun text-${d.color}-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-${d.color}-700">Misión 1:</strong> ${d.m1}</p>
                        <p class="text-xs italic mt-1"><strong class="text-${d.color}-700">Misión 2:</strong> ${d.m2}</p>
                        <p class="text-xs italic mt-1"><strong class="text-${d.color}-700">Misión 3:</strong> ${d.m3}</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-${d.color}-200 itinerary-box">
                        <h3 class="font-fun text-${d.color}-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        ${d.itinerary}
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 ${d.rotate}">
                        <img src="${d.imgSrc}" onerror="${d.imgOnError}" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">${d.imgCaption}</p>
                    </div>
                </div>
            </div>

            <!-- RINCON INFANTIL & DIBUJO -->
            <div class="mt-auto drawing-section border-4 border-dashed border-${d.color}-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">${d.q1Text} <input type="text" id="p${d.page}-q1" class="border-b border-dashed border-gray-400 bg-transparent px-1 font-bold text-${d.color}-700 ${d.q1Extra}"></p>
                    <p class="mt-1">${d.q2Text} <input type="text" id="p${d.page}-q2" class="border-b border-dashed border-gray-400 bg-transparent px-1 font-bold text-${d.color}-700 ${d.q2Extra}"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego del día: ${d.minigame}</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(${d.page}, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-${d.page}-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-${d.color}-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(${d.page}, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-${d.page}-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-${d.color}-300 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(${d.day})" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>
`).join('\n');

const page11 = `
        <!-- PÁGINA 11: SECCIÓN EXTRA · EL GRAN RETO DEL EXPLORADOR -->
        <div id="page-11" class="page-sheet p-6 md:p-8 border-amber-400 bg-amber-50 hidden">
            <div class="bg-amber-500 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg mb-4">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🕵️‍♂️</span>
                    <h2 class="font-fun text-2xl font-bold">El Gran Desafío de Cantabria</h2>
                </div>
                <span class="text-xs font-bold bg-amber-700 px-3 py-1 rounded-full">Retos & Trofeos</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div class="p-6 parchment-bg rounded-3xl border-2 border-amber-300">
                    <h3 class="font-fun text-amber-900 text-lg mb-3 flex items-center gap-2">🔍 Desafíos de Arte e Historia</h3>
                    <div class="space-y-3 text-xs text-amber-950 font-medium">
                        <div class="flex items-start gap-2"><input type="checkbox" id="challenge-1" class="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" onchange="saveProgress()"><label for="challenge-1"><strong>El Bisonte Oculto:</strong> Localiza el bisonte encogido en la Neocueva de Altamira.</label></div>
                        <div class="flex items-start gap-2"><input type="checkbox" id="challenge-2" class="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" onchange="saveProgress()"><label for="challenge-2"><strong>El Secreto Floral:</strong> Encuentra un girasol de azulejo en El Capricho de Gaudí.</label></div>
                        <div class="flex items-start gap-2"><input type="checkbox" id="challenge-3" class="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" onchange="saveProgress()"><label for="challenge-3"><strong>Casas del Pastado:</strong> Entra en la cabaña circular de paja del Poblado Cántabro.</label></div>
                        <div class="flex items-start gap-2"><input type="checkbox" id="challenge-4" class="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" onchange="saveProgress()"><label for="challenge-4"><strong>Mitología Submarina:</strong> Descubre la estatua del Hombre Pez en Liérganes.</label></div>
                        <div class="flex items-start gap-2"><input type="checkbox" id="challenge-5" class="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" onchange="saveProgress()"><label for="challenge-5"><strong>El Laberinto de Piedra:</strong> Cruza los arcos entrelazados de San Juan de Duero.</label></div>
                    </div>
                </div>

                <div class="p-6 bg-white/80 rounded-3xl border-2 border-emerald-300">
                    <h3 class="font-fun text-emerald-900 text-lg mb-3 flex items-center gap-2">📸 Misiones Fotográficas Rápidas</h3>
                    <div class="space-y-3 text-xs text-emerald-950 font-medium">
                        <div class="flex items-start gap-2"><input type="checkbox" id="photo-1" class="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" onchange="saveProgress()"><label for="photo-1">Foto a un gran oso pardo desde la cabina aérea de Cabárceno.</label></div>
                        <div class="flex items-start gap-2"><input type="checkbox" id="photo-2" class="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" onchange="saveProgress()"><label for="photo-2">Foto familiar dentro del tronco gigante de una secuoya americana.</label></div>
                        <div class="flex items-start gap-2"><input type="checkbox" id="photo-3" class="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" onchange="saveProgress()"><label for="photo-3">Primer plano de los infinitos patrones de colores de Okuda en Ajo.</label></div>
                        <div class="flex items-start gap-2"><input type="checkbox" id="photo-4" class="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" onchange="saveProgress()"><label for="photo-4">Foto de la espuma marina rompiendo con fuerza en Liencres.</label></div>
                        <div class="flex items-start gap-2"><input type="checkbox" id="photo-5" class="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" onchange="saveProgress()"><label for="photo-5">Foto comiendo churros calientes con chocolate en Liérganes.</label></div>
                    </div>
                </div>
            </div>

            <div class="w-full text-center mt-6 p-4 border-4 border-dashed border-amber-300 rounded-3xl bg-white">
                <span class="text-4xl animate-bounce block">🏆</span>
                <h4 class="font-fun text-amber-800 text-sm font-bold">Rango de la Familia Exploradora</h4>
                <p id="explorer-rank" class="text-xs italic text-gray-500 mt-1">¡Rellena los retos para subir de nivel!</p>
            </div>
        </div>
`;

const page12 = `
        <!-- PÁGINA 12: EL COFRE DEL TESORO (RESERVAS Y COSTES) -->
        <div id="page-12" class="page-sheet p-6 md:p-8 border-yellow-400 bg-yellow-50 hidden">
            <div class="bg-yellow-500 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg mb-6">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">💰</span>
                    <h2 class="font-fun text-2xl font-bold">El Cofre de las Reservas</h2>
                </div>
                <span class="text-xs font-bold bg-yellow-700 px-3 py-1 rounded-full">Presupuesto Familiar</span>
            </div>

            <div class="overflow-x-auto rounded-3xl border-2 border-yellow-300 shadow-md">
                <table class="min-w-full bg-white text-xs">
                    <thead class="bg-yellow-100 font-fun text-yellow-800">
                        <tr>
                            <th class="p-3 text-left">Elemento / Monumento</th>
                            <th class="p-3 text-left">Gestión de Reserva</th>
                            <th class="p-3 text-left">Coste Familia</th>
                            <th class="p-3 text-center">Estado Misión</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 font-medium text-gray-700" id="reservations-table-body">
                        <tr><td class="p-3 font-bold">🐻 Parque Cabárceno</td><td class="p-3 text-[10px]">🚨 Crítica Online con antelación</td><td class="p-3">140,00 € (Cabina incl.)</td><td class="p-3 text-center"><input type="checkbox" id="res-1" class="w-4 h-4 text-emerald-600 rounded" onchange="saveProgress()"></td></tr>
                        <tr><td class="p-3 font-bold">🚂 Cueva de El Soplao</td><td class="p-3 text-[10px]">🚨 Crítica Online con antelación</td><td class="p-3">55,00 € (Tren minero)</td><td class="p-3 text-center"><input type="checkbox" id="res-2" class="w-4 h-4 text-emerald-600 rounded" onchange="saveProgress()"></td></tr>
                        <tr><td class="p-3 font-bold">🦬 Museo de Altamira</td><td class="p-3 text-[10px]">📅 Muy Recomendada Online</td><td class="p-3">6,00 € (Niños gratis)</td><td class="p-3 text-center"><input type="checkbox" id="res-3" class="w-4 h-4 text-emerald-600 rounded" onchange="saveProgress()"></td></tr>
                        <tr><td class="p-3 font-bold">🌻 El Capricho de Gaudí</td><td class="p-3 text-[10px]">📅 Recomendada Web Oficial</td><td class="p-3">17,00 € (Menores 7 gratis)</td><td class="p-3 text-center"><input type="checkbox" id="res-4" class="w-4 h-4 text-emerald-600 rounded" onchange="saveProgress()"></td></tr>
                        <tr><td class="p-3 font-bold">🏕️ Poblado Cántabro</td><td class="p-3 text-[10px]">🟢 Directo en taquilla o web</td><td class="p-3">13,00 € (Menores 7 gratis)</td><td class="p-3 text-center"><input type="checkbox" id="res-5" class="w-4 h-4 text-emerald-600 rounded" onchange="saveProgress()"></td></tr>
                        <tr><td class="p-3 font-bold">🏰 Torre del Infantado</td><td class="p-3 text-[10px]">🟢 Directo en taquilla (Potes)</td><td class="p-3">6,00 € (Menores 12 gratis)</td><td class="p-3 text-center"><input type="checkbox" id="res-6" class="w-4 h-4 text-emerald-600 rounded" onchange="saveProgress()"></td></tr>
                        <tr><td class="p-3 font-bold">⛴️ Ferry Los Reginas</td><td class="p-3 text-[10px]">🟢 Taquilla directa muelle</td><td class="p-3">~20,00 €</td><td class="p-3 text-center"><input type="checkbox" id="res-7" class="w-4 h-4 text-emerald-600 rounded" onchange="saveProgress()"></td></tr>
                        <tr><td class="p-3 font-bold">⛪ San Juan de Duero</td><td class="p-3 text-[10px]">🟢 Entrada directa en Soria</td><td class="p-3">2,00 € (Niños gratis)</td><td class="p-3 text-center"><input type="checkbox" id="res-8" class="w-4 h-4 text-emerald-600 rounded" onchange="saveProgress()"></td></tr>
                        <tr><td class="p-3 font-bold text-emerald-600">🌴 Bosque de Secuoyas</td><td class="p-3 text-[10px] text-emerald-600">🌴 Acceso y parking gratuito</td><td class="p-3 text-emerald-600">0,00 €</td><td class="p-3 text-center font-bold text-emerald-600">¡Libre!</td></tr>
                        <tr class="bg-emerald-50"><td class="p-3 font-bold text-emerald-800">💰 COFRE TOTAL</td><td class="p-3 text-[10px] text-emerald-700">Entradas Generales Familia</td><td class="p-3 font-extrabold text-emerald-800">~259,00 €</td><td class="p-3 text-center font-bold text-emerald-800 text-[10px]">¡Listo para la Aventura!</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
`;

let originalHtml = fs.readFileSync('index.html', 'utf8');

// Insert after page-1
const parts = originalHtml.split('<!-- PÁGINA 2: DÍA 1 (SANTANDER) -->');
let page1End = parts[0];

// The second part goes after page 3 in the current index.html
const p3parts = parts[1].split('</div>\n    </div>\n\n    <!-- WIDGET FLOATING DE BERNARDO EL OSO -->');
const scriptEnd = '</div>\n    </div>\n\n    <!-- WIDGET FLOATING DE BERNARDO EL OSO -->' + p3parts[1];

let finalHtml = page1End + daysHtml + page11 + page12 + scriptEnd;

// Now we need to update the JavaScript loop to support 12 pages instead of 3
finalHtml = finalHtml.replace(/for \(let i = 2; i <= 3; i\+\+\)/g, "for (let i = 2; i <= 10; i++)");
finalHtml = finalHtml.replace(/for \(let i = 1; i <= 3; i\+\+\)/g, "for (let i = 1; i <= 12; i++)");
finalHtml = finalHtml.replace("1: '🎒', 2: '🚗', 3: '🐻'", "1: '🎒', 2: '🚗', 3: '🐻', 4: '🌲', 5: '🌻', 6: '🚂', 7: '🌊', 8: '🐟', 9: '🏖️', 10: '🚀', 11: '🕵️‍♂️', 12: '💰'");

fs.writeFileSync('index.html', finalHtml);
