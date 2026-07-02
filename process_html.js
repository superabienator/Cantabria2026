const fs = require('fs');

const rawHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Cantabria en Familia: Bitácora del Explorador</title>
    <link href="/src/index.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="p-2 md:p-6 pb-24">

    <!-- PANTALLA DE ACCESO PRIVADO -->
    <div id="privacy-gate" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="bg-white max-w-md w-full p-8 rounded-3xl border-8 border-emerald-400 shadow-2xl text-center flex flex-col items-center gap-5">
            <span class="text-6xl animate-bounce">🗝️</span>
            <h2 class="font-fun text-2xl md:text-3xl font-extrabold text-emerald-800">CAMPAMENTO BASE<br><span class="text-yellow-500 text-lg">Acceso Familiar</span></h2>
            <p class="text-xs text-gray-500">Por favor, introduce la clave secreta para abrir la Bitácora de Cantabria.</p>
            <input type="password" id="camp-password" placeholder="Palabra clave..." onkeydown="if(event.key === 'Enter') checkCampPassword()" class="w-full p-3 text-center border-4 border-dashed border-emerald-200 rounded-2xl outline-none focus:border-emerald-500 font-bold text-emerald-800">
            <button onclick="checkCampPassword()" class="w-full py-3 bg-emerald-500 text-white font-fun font-bold rounded-2xl border-b-4 border-emerald-700 shadow-md transition active:translate-y-1">🔓 Abrir Bitácora</button>
            <p class="text-[10px] text-gray-400 font-bold">Pista: cantabria2026</p>
        </div>
    </div>

    <!-- CABECERA DE LA APLICACIÓN -->
    <div class="max-w-6xl mx-auto mb-6 p-4 bg-white/95 rounded-3xl shadow-xl border-4 border-emerald-400 no-print">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <span class="text-4xl">🎒</span>
                <div>
                    <h1 class="text-xl font-bold text-emerald-800">Cantabria en Familia</h1>
                    <p class="text-[10px] uppercase font-extrabold text-emerald-500">Misiones para Exploradores de 4 y 7 años</p>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-2 justify-center">
                <button onclick="changeViewMode('digital')" id="btn-mode-digital" class="px-4 py-2 bg-emerald-600 text-white text-xs font-fun font-bold rounded-2xl border-b-4 border-emerald-800">📖 Digital</button>
                <button onclick="changeViewMode('print')" id="btn-mode-print" class="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-fun font-bold rounded-2xl border-b-4 border-gray-400">🖨️ Modo Impresión</button>
                <button onclick="window.print()" class="px-4 py-2 bg-blue-500 text-white text-xs font-fun font-bold rounded-2xl border-b-4 border-blue-700">🖨️ Imprimir Todo</button>
                <button onclick="openResetModal()" class="px-3 py-2 bg-red-100 text-red-700 font-bold rounded-xl text-xs hover:bg-red-200 transition">🗑️ Reiniciar</button>
            </div>
        </div>

        <!-- CONTROL DE NAVEGACIÓN DIARIA -->
        <div id="navigation-panel" class="mt-4 border-t-2 border-dashed border-gray-200 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2 overflow-x-auto w-full">
                <div class="flex gap-2" id="page-tabs-container"></div>
            </div>
            <!-- BARRA DE PROGRESO DE AVENTURAS -->
            <div class="w-full md:w-64 bg-gray-100 rounded-full h-5 border-2 border-gray-300 relative overflow-hidden">
                <div id="progress-bar" class="bg-gradient-to-r from-emerald-400 to-yellow-400 h-full transition-all duration-500" style="width: 0%"></div>
            </div>
        </div>
    </div>

    <!-- CONTENEDOR DEL CUADERNO -->
    <div class="max-w-4xl mx-auto" id="notebook-container">

        <!-- PÁGINA 1: PORTADA DEL CUADERNO -->
        <div id="page-1" class="page-sheet p-8 md:p-10 border-emerald-300 bg-emerald-50">
            <div class="flex flex-col items-center justify-between h-full relative z-10">
                <div class="text-center">
                    <div class="text-5xl mb-2 animate-bounce">🧭 🏕️ 🐾</div>
                    <h1 class="font-fun text-5xl md:text-7xl font-extrabold text-emerald-800 mb-2 leading-none">CANTABRIA<br><span class="text-yellow-500">EN FAMILIA</span></h1>
                    <p class="font-fun text-lg text-emerald-700 bg-white/80 px-6 py-2 rounded-full border-2 border-dashed border-emerald-300 inline-block">Guía de Ruta y Bitácora del Explorador</p>
                    <p class="text-xs font-bold text-emerald-600 mt-2">Arte, Naturaleza y Aventuras · 15 a 23 de Agosto</p>
                </div>

                <div class="w-full max-w-md polaroid-container my-4">
                    <div class="bg-white p-4 pb-12 rounded-xl shadow-2xl rotate-1 border-2 border-gray-100">
                        <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-sm mt-2">✨ ¡EQUIPO DE EXPEDICIÓN! ✨</p>
                    </div>
                </div>

                <div class="w-full max-w-xl bg-white/90 p-6 rounded-3xl border-4 border-dashed border-emerald-400">
                    <div class="grid gap-3 text-sm">
                        <div class="flex items-center gap-2"><span class="font-bold text-emerald-700">Explorador 1 (4a):</span><input type="text" id="p1-exp1" value="Peque" class="line-input" oninput="updateExplorerNames()"></div>
                        <div class="flex items-center gap-2"><span class="font-bold text-emerald-700">Explorador 2 (7a):</span><input type="text" id="p1-exp2" value="Grande" class="line-input" oninput="updateExplorerNames()"></div>
                        <div class="flex items-center gap-2"><span class="font-bold text-emerald-700">Base Secreta:</span><input type="text" id="p1-base" value="Penagos" class="line-input"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PÁGINA 2: DÍA 1 (SANTANDER) -->
        <div id="page-2" class="page-sheet p-6 md:p-8 border-sky-300 bg-sky-50 hidden">
            <!-- HEADER -->
            <div class="bg-sky-400 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🚗</span>
                    <h2 class="font-fun text-2xl font-bold">Día 1: Rumbo al Norte</h2>
                </div>
                <span class="text-xs font-bold bg-sky-600 px-3 py-1 rounded-full">Arguedas ➔ Penagos ➔ Santander</span>
            </div>

            <!-- BOTÓN DE CONSEGUIDO DIARIO -->
            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-sky-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-sky-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-2" class="w-6 h-6 text-sky-500 rounded-lg focus:ring-sky-400" onchange="toggleDayCompletion(2)">
                    <span class="font-fun text-xs font-bold text-sky-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <!-- CUERPO PRINCIPAL -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-sky-100 p-4 rounded-2xl border-2 border-sky-300 kids-missions">
                        <h3 class="font-fun text-sky-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-sky-700">Misión 1:</strong> ¡Despegue por carretera hasta la base en Penagos!</p>
                        <p class="text-xs italic mt-1"><strong class="text-sky-700">Misión 2:</strong> Subir al tren mágico "El Magdaleno" en la península.</p>
                        <p class="text-xs italic mt-1"><strong class="text-sky-700">Misión 3:</strong> Buscar pingüinos ninja y leones marinos en el minizoo.</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-sky-200 itinerary-box">
                        <h3 class="font-fun text-sky-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>10:00 - 13:00</strong> | Viaje desde Arguedas (~2h 45min). Almuerzo de exploradores al llegar.</p>
                        <p class="text-[11px] mt-1"><strong>16:00</strong> | Desembarco en Santander. Tren turístico del Palacio de la Magdalena y paseo por la playa de El Sardinero.</p>
                        <div class="mt-2 text-[10px] text-sky-700 bg-sky-50 border border-dashed border-sky-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> Probar un helado tradicional de dos bolas gigantes en la Heladería Regma durante el paseo marítimo de El Sardinero.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 rotate-1">
                        <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80" onerror="this.src='https://placehold.co/600x450/e0f2fe/0284c7?text=Tren+Magdalena'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">🚂 El Magdaleno en Santander</p>
                    </div>
                </div>
            </div>

            <!-- RINCON INFANTIL & DIBUJO -->
            <div class="mt-auto drawing-section border-4 border-dashed border-sky-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">¿De qué color era el tren "El Magdaleno" en el que nos hemos subido hoy? <input type="text" id="p2-q1" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-sky-700"></p>
                    <p class="mt-1">¿Cuántas focas o pingüinos habéis visto nadando? <input type="text" id="p2-q2" class="border-b border-dashed border-gray-400 w-12 bg-transparent px-1 text-center font-bold text-sky-700"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego del día: "Detector de Gaviotas" (¡Imita su graznido para hacer reír a la familia!)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(2, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-2-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-sky-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(2, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-2-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-amber-200 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(1)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

        <!-- PÁGINA 3: DÍA 2 (CABÁRCENO) -->
        <div id="page-3" class="page-sheet p-6 md:p-8 border-orange-300 bg-orange-50 hidden">
            <div class="bg-orange-400 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🐻</span>
                    <h2 class="font-fun text-2xl font-bold">Día 2: Reino de Cabárceno</h2>
                </div>
                <span class="text-xs font-bold bg-orange-600 px-3 py-1 rounded-full">Safari Salvaje</span>
            </div>

            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-orange-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-orange-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-3" class="w-6 h-6 text-orange-500 rounded-lg focus:ring-orange-400" onchange="toggleDayCompletion(3)">
                    <span class="font-fun text-xs font-bold text-orange-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-orange-100 p-4 rounded-2xl border-2 border-orange-300 kids-missions">
                        <h3 class="font-fun text-orange-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-orange-700">Misión 1:</strong> Descubrir a Bernardo el Oso Pardo y a sus hermanos.</p>
                        <p class="text-xs italic mt-1"><strong class="text-orange-700">Misión 2:</strong> Subir a la telecabina aérea para volar sobre los recintos.</p>
                        <p class="text-xs italic mt-1"><strong class="text-orange-700">Misión 3:</strong> Encontrar el elefante más gigante comiendo hojas.</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-orange-200 itinerary-box">
                        <h3 class="font-fun text-orange-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>09:30 - 18:30</strong> | Entrada temprana para ver los animales más activos. Recorrido en coche con paradas. Picnic familiar.</p>
                        <p class="text-[11px] mt-1"><strong>Consejo:</strong> Llevar agua de sobra y calzado súper cómodo. Reserva online obligatoria con antelación.</p>
                        <div class="mt-2 text-[10px] text-orange-700 bg-orange-50 border border-dashed border-orange-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> Si os sobra un poco de tarde y queréis relax, podéis visitar el bonito pueblo histórico de Penagos o jugar libremente en el jardín de vuestra casita base.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 -rotate-1">
                        <img src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80" onerror="this.src='https://placehold.co/600x450/ffedd5/ea580c?text=Oso+Pardo'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">🐻 Bernardo el Oso en Cabárceno</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto drawing-section border-4 border-dashed border-orange-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">¿Cuál ha sido el animal más gigante y con más pelo descubierto hoy? <input type="text" id="p3-q1" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-orange-700"></p>
                    <p class="mt-1">Dibuja una carita de cómo te sentiste volando en el teleférico sobre los osos: <input type="text" id="p3-q2" class="border-b border-dashed border-gray-400 w-12 bg-transparent px-1 text-center font-bold text-orange-700" placeholder="😀"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego: "El Rugido Salvaje" (¡Imita de forma graciosa el sonido de cada animal avistado!)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(3, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-3-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-orange-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(3, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-3-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-amber-200 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(2)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

        <!-- PÁGINA 4: DÍA 3 (POTES Y BOSQUES GIGANTES) -->
        <div id="page-4" class="page-sheet p-6 md:p-8 border-emerald-300 bg-emerald-50 hidden">
            <div class="bg-emerald-500 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🌲</span>
                    <h2 class="font-fun text-2xl font-bold">Día 3: Potes y Bosques Gigantes</h2>
                </div>
                <span class="text-xs font-bold bg-emerald-700 px-3 py-1 rounded-full">Montañas e Historia</span>
            </div>

            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-emerald-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-emerald-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-4" class="w-6 h-6 text-emerald-500 rounded-lg focus:ring-emerald-400" onchange="toggleDayCompletion(4)">
                    <span class="font-fun text-xs font-bold text-emerald-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-emerald-100 p-4 rounded-2xl border-2 border-emerald-300 kids-missions">
                        <h3 class="font-fun text-emerald-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-emerald-700">Misión 1:</strong> Asaltar y subir la Torre del Infantado en Potes.</p>
                        <p class="text-xs italic mt-1"><strong class="text-emerald-700">Misión 2:</strong> Abrazar un castaño milenario en El Habario.</p>
                        <p class="text-xs italic mt-1"><strong class="text-emerald-700">Misión 3:</strong> Descubrir Mogrovejo (¡el pueblo de Heidi!).</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-emerald-200 itinerary-box">
                        <h3 class="font-fun text-emerald-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>09:00 - 10:45</strong> | Viaje cruzando el Desfiladero de la Hermida (carretera de curvas cerradas y vistas impresionantes).</p>
                        <p class="text-[11px] mt-1"><strong>11:00 - 15:00</strong> | Paseo por Potes y asalto a la Torre del Infantado. Almuerzo montañés.</p>
                        <p class="text-[11px] mt-1"><strong>16:30 - 17:30</strong> | Paseo por el Castañar de El Habario.</p>
                        <div class="mt-2 text-[10px] text-emerald-700 bg-emerald-50 border border-dashed border-emerald-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> ¡Desvío súper recomendado a Mogrovejo! Es el pueblo donde se grabó la película de Heidi. Sus casitas de piedra y la gran montaña detrás os dejarán boquiabiertos.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 rotate-2">
                        <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80" onerror="this.src='https://placehold.co/600x450/d1fae5/047857?text=Potes'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">⛰️ Valle de Liébana</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto drawing-section border-4 border-dashed border-emerald-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">¿Cuántos pasos de gigante necesitas para rodear el castaño milenario más ancho? <input type="text" id="p4-q1" class="border-b border-dashed border-gray-400 w-12 bg-transparent px-1 text-center font-bold text-emerald-700"></p>
                    <p class="mt-1">¿Qué cosas divertidas se veían desde lo alto de la gran torre de Potes? <input type="text" id="p4-q2" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-emerald-700"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego: "Abraza-Árboles" (¿A cuántos miembros de la familia necesitas llamar para rodear el tronco?)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(4, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-4-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-emerald-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(4, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-4-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-emerald-200 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(3)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

        <!-- PÁGINA 5: DÍA 4 (BISONTES Y CASAS DE CHOCOLATE) -->
        <div id="page-5" class="page-sheet p-6 md:p-8 border-yellow-300 bg-yellow-50 hidden">
            <div class="bg-yellow-500 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🌻</span>
                    <h2 class="font-fun text-2xl font-bold">Día 4: Bisontes y Casas de Girasoles</h2>
                </div>
                <span class="text-xs font-bold bg-yellow-600 px-3 py-1 rounded-full">Altamira & Gaudí</span>
            </div>

            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-yellow-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-yellow-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-5" class="w-6 h-6 text-yellow-500 rounded-lg focus:ring-yellow-400" onchange="toggleDayCompletion(5)">
                    <span class="font-fun text-xs font-bold text-yellow-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-yellow-100 p-4 rounded-2xl border-2 border-yellow-300 kids-missions">
                        <h3 class="font-fun text-yellow-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-yellow-700">Misión 1:</strong> Encontrar el bisonte encogido en la cueva de Altamira.</p>
                        <p class="text-xs italic mt-1"><strong class="text-yellow-700">Misión 2:</strong> Probar el bizcocho tradicional de Santillana del Mar con un vaso de leche.</p>
                        <p class="text-xs italic mt-1"><strong class="text-yellow-700">Misión 3:</strong> Encontrar girasoles en la casa de chocolate (El Capricho).</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-yellow-200 itinerary-box">
                        <h3 class="font-fun text-yellow-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>10:00 - 12:15</strong> | Museo de Altamira. Visita interactiva a la Neocueva para descubrir el arte paleolítico.</p>
                        <p class="text-[11px] mt-1"><strong>12:15 - 15:15</strong> | Paseo medieval en Santillana. Almuerzo y merienda obligatoria.</p>
                        <p class="text-[11px] mt-1"><strong>15:30 - 18:30</strong> | Comillas. El Capricho de Gaudí y jardines de Sobrellano.</p>
                        <div class="mt-2 text-[10px] text-yellow-700 bg-yellow-50 border border-dashed border-yellow-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> Los acantilados y ruinas de cuento del Molino de El Bolao en Cóbreces están a un desvío cortísimo de Comillas. Es un sitio impresionante donde las olas rompen con una fuerza increíble al lado de un antiguo molino abandonado.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 -rotate-2">
                        <img src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1523531294919-4bea7c65e894?auto=format&fit=crop&w=600&q=80'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">🌻 El Capricho de Gaudí en Comillas</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto drawing-section border-4 border-dashed border-yellow-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">Si vivieras en Altamira, ¿qué animal pintarías en el techo? <input type="text" id="p5-q1" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-yellow-700"></p>
                    <p class="mt-1">La preciosa casa de Gaudí está decorada con flores amarillas, ¿cuál es? <input type="text" id="p5-q2" class="border-b border-dashed border-gray-400 w-24 bg-transparent px-1 font-bold text-yellow-700"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego: "Pintores de Cavernas" (Proyecta sombras con tu mano para crear un bisonte corriendo)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(5, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-5-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-yellow-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(5, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-5-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-yellow-200 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(4)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

        <!-- PÁGINA 6: DÍA 5 (TREN MINERO Y SECUOYAS GIGANTES) -->
        <div id="page-6" class="page-sheet p-6 md:p-8 border-amber-300 bg-amber-50/30 hidden">
            <div class="bg-amber-600 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🚂</span>
                    <h2 class="font-fun text-2xl font-bold">Día 5: Tren Minero y Secuoyas Gigantes</h2>
                </div>
                <span class="text-xs font-bold bg-amber-800 px-3 py-1 rounded-full">Bajo Tierra & Gigantes</span>
            </div>

            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-amber-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-amber-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-6" class="w-6 h-6 text-amber-500 rounded-lg focus:ring-amber-400" onchange="toggleDayCompletion(6)">
                    <span class="font-fun text-xs font-bold text-amber-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-amber-100 p-4 rounded-2xl border-2 border-amber-300 kids-missions">
                        <h3 class="font-fun text-amber-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-amber-700">Misión 1:</strong> Viajar al centro de la tierra en un tren minero en El Soplao.</p>
                        <p class="text-xs italic mt-1"><strong class="text-amber-700">Misión 2:</strong> Descubrir cabañas de paja de la Edad del Hierro en el Poblado Cántabro.</p>
                        <p class="text-xs italic mt-1"><strong class="text-amber-700">Misión 3:</strong> Tocar las nubes mirando las secuoyas gigantes del Monte Cabezón.</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-amber-200 itinerary-box">
                        <h3 class="font-fun text-amber-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>10:30 - 12:00</strong> | Cueva de El Soplao. Acceso en tren minero. <strong>¡Ojo! Hace 12°C dentro, abrigarse.</strong></p>
                        <p class="text-[11px] mt-1"><strong>12:30 - 14:15</strong> | Poblado Cántabro. Edad del Hierro reconstruida.</p>
                        <p class="text-[11px] mt-1"><strong>16:00 - 17:30</strong> | Bosque de Secuoyas de Cabezón de la Sal. Pasarelas mágicas.</p>
                        <div class="mt-2 text-[10px] text-amber-700 bg-amber-50 border border-dashed border-amber-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> Podéis visitar el precioso y rústico pueblo de Carmona, famoso por sus artesanos de madera tradicionales y sus pacíficas calles empedradas junto al río Saja.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 rotate-1">
                        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80" onerror="this.src='https://placehold.co/600x450/fef3c7/b45309?text=Secuoyas'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">🌲 Secuoyas de Cabezón de la Sal</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto drawing-section border-4 border-dashed border-amber-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">¿Hacía frío o calor dentro de la cueva? ¿Se te ha enfriado la nariz? <input type="text" id="p6-q1" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-amber-700"></p>
                    <p class="mt-1">Las secuoyas del bosque son tan altas que llegan hasta... <input type="text" id="p6-q2" class="border-b border-dashed border-gray-400 w-24 bg-transparent px-1 font-bold text-amber-700"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego: "Eco-Eco" (Dentro de la cueva susurra flojito y escucha cómo rebota tu voz)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(6, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-6-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-amber-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(6, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-6-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-amber-300 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(5)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

        <!-- PÁGINA 7: DÍA 6 (LABERINTOS DE ROCA Y MAR) -->
        <div id="page-7" class="page-sheet p-6 md:p-8 border-cyan-300 bg-cyan-50/30 hidden">
            <div class="bg-cyan-500 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🌊</span>
                    <h2 class="font-fun text-2xl font-bold">Día 6: Laberintos de Roca y Mar</h2>
                </div>
                <span class="text-xs font-bold bg-cyan-700 px-3 py-1 rounded-full">Costa Quebrada & Ferry</span>
            </div>

            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-cyan-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-cyan-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-7" class="w-6 h-6 text-cyan-500 rounded-lg focus:ring-cyan-400" onchange="toggleDayCompletion(7)">
                    <span class="font-fun text-xs font-bold text-cyan-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-cyan-100 p-4 rounded-2xl border-2 border-cyan-300 kids-missions">
                        <h3 class="font-fun text-cyan-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-cyan-700">Misión 1:</strong> Encontrar cangrejos ninja en las pozas de Liencres.</p>
                        <p class="text-xs italic mt-1"><strong class="text-cyan-700">Misión 2:</strong> Subir a la pasarela flotante de cristal del Centro Botín.</p>
                        <p class="text-xs italic mt-1"><strong class="text-cyan-700">Misión 3:</strong> Cruzar en el mítico Ferry "Los Reginas" hasta Somo.</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-cyan-200 itinerary-box">
                        <h3 class="font-fun text-cyan-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>10:00 - 13:30</strong> | Dunas y Costa Quebrada de Liencres. Explorar con marea baja.</p>
                        <p class="text-[11px] mt-1"><strong>15:30 - 19:30</strong> | Santander. Centro Botín y viaje en Ferry Los Reginas.</p>
                        <div class="mt-2 text-[10px] text-cyan-700 bg-cyan-50 border border-dashed border-cyan-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> Durante la visita a Liencres, no os perdáis el bosque de pinos colindante a las dunas. Hay senderos de arena fantásticos a la sombra para caminar y jugar a los exploradores espías.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 -rotate-1">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" onerror="this.src='https://placehold.co/600x450/cffafe/0891b2?text=Costa+Quebrada'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">🌊 Costa Quebrada</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto drawing-section border-4 border-dashed border-cyan-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">¿Cuántos cangrejos ninja habéis visto ocultos entre las rocas de la playa? <input type="text" id="p7-q1" class="border-b border-dashed border-gray-400 w-12 bg-transparent px-1 text-center font-bold text-cyan-700"></p>
                    <p class="mt-1">¿Al navegar en el ferry os salpicaba el agua fresca del mar? <input type="text" id="p7-q2" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-cyan-700"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego: "Cazadores de Tesoros" (Encuentra una concha vacía, una piedra lisa y un alga)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(7, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-7-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-cyan-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(7, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-7-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-cyan-300 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(6)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

        <!-- PÁGINA 8: DÍA 7 (CASCADAS Y EL HOMBRE PEZ) -->
        <div id="page-8" class="page-sheet p-6 md:p-8 border-teal-300 bg-teal-50/30 hidden">
            <div class="bg-teal-500 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🐟</span>
                    <h2 class="font-fun text-2xl font-bold">Día 7: Cascadas y el Hombre Pez</h2>
                </div>
                <span class="text-xs font-bold bg-teal-700 px-3 py-1 rounded-full">Valles Pasiegos & Liérganes</span>
            </div>

            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-teal-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-teal-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-8" class="w-6 h-6 text-teal-500 rounded-lg focus:ring-teal-400" onchange="toggleDayCompletion(8)">
                    <span class="font-fun text-xs font-bold text-teal-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-teal-100 p-4 rounded-2xl border-2 border-teal-300 kids-missions">
                        <h3 class="font-fun text-teal-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-teal-700">Misión 1:</strong> Recorrer la senda secreta hasta el Churrón de Borleña.</p>
                        <p class="text-xs italic mt-1"><strong class="text-teal-700">Misión 2:</strong> Probar un sobao gigante tradicional pasiego.</p>
                        <p class="text-xs italic mt-1"><strong class="text-teal-700">Misión 3:</strong> Buscar al Hombre Pez escondido bajo el puente romano.</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-teal-200 itinerary-box">
                        <h3 class="font-fun text-teal-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>09:30 - 11:30</strong> | Conducción por los Valles Pasiegos (mirador del Alto de la Braguía).</p>
                        <p class="text-[11px] mt-1"><strong>11:30 - 13:00</strong> | Senda corta y sombreada a la cascada de Borleña.</p>
                        <p class="text-[11px] mt-1"><strong>16:00 - 19:30</strong> | Liérganes. Visitar la estatua del Hombre Pez y merendar churros.</p>
                        <div class="mt-2 text-[10px] text-teal-700 bg-teal-50 border border-dashed border-teal-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> Al coronar el Alto de la Braguía en coche, hay un mirador espectacular. Merece la pena parar 5 minutos para sacar una foto familiar de los prados con vacas e infinitas laderas pasiegas verdes.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 rotate-2">
                        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80" onerror="this.src='https://placehold.co/600x450/ccfbf1/0f766e?text=Cascada+Lierganes'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">🌲 Senda de los Valles Pasiegos</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto drawing-section border-4 border-dashed border-teal-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">¿Os daría un poco de miedo ver al Hombre Pez nadando por debajo del puente? <input type="text" id="p8-q1" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-teal-700"></p>
                    <p class="mt-1">¿A qué sabe el chocolate con churros de Liérganes? <input type="text" id="p8-q2" class="border-b border-dashed border-gray-400 w-24 bg-transparent px-1 font-bold text-teal-700"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego: "El Invento del Sobao" (Si fueras súper chef, ¿qué ingrediente loco le añadirías?)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(8, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-8-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-teal-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(8, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-8-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-teal-300 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(7)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

        <!-- PÁGINA 9: DÍA 8 (CASTILLOS DE ARENA Y ARTE LOCO) -->
        <div id="page-9" class="page-sheet p-6 md:p-8 border-sky-200 bg-sky-50/20 hidden">
            <div class="bg-sky-400 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🏖️</span>
                    <h2 class="font-fun text-2xl font-bold">Día 8: Castillos de Arena y Arte Loco</h2>
                </div>
                <span class="text-xs font-bold bg-sky-600 px-3 py-1 rounded-full">Santoña, Laredo & Ajo</span>
            </div>

            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-sky-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-sky-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-9" class="w-6 h-6 text-sky-500 rounded-lg focus:ring-sky-400" onchange="toggleDayCompletion(9)">
                    <span class="font-fun text-xs font-bold text-sky-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-sky-100 p-4 rounded-2xl border-2 border-sky-300 kids-missions">
                        <h3 class="font-fun text-sky-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-sky-700">Misión 1:</strong> Dar un paseo en barco rodeando el Monte Buciero in Santoña.</p>
                        <p class="text-xs italic mt-1"><strong class="text-sky-700">Misión 2:</strong> Construir el castillo de arena más alto del norte en Laredo.</p>
                        <p class="text-xs italic mt-1"><strong class="text-cyan-700">Misión 3:</strong> Encontrar círculos y estrellas de colores en el Faro de Okuda.</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-sky-200 itinerary-box">
                        <h3 class="font-fun text-sky-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>10:30 - 13:00</strong> | Paseo por Santoña. Opcional barco al Monte Buciero.</p>
                        <p class="text-[11px] mt-1"><strong>15:30 - 18:30</strong> | Playa de la Salvé en Laredo. Juegos libres en la arena.</p>
                        <p class="text-[11px] mt-1"><strong>Extra:</strong> Visita al Faro de Ajo pintado por Okuda San Miguel.</p>
                        <div class="mt-2 text-[10px] text-sky-700 bg-sky-50 border border-dashed border-sky-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> ¡El Faro de Ajo es la joya oculta de este día! Al estar pintado íntegramente de colores psicodélicos por Okuda, es un espectáculo visual divertidísimo para los niños que parece salido de un dibujo animado.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 -rotate-2">
                        <img src="https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=600&q=80" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">🎨 Faro de Ajo Multicolor (Okuda)</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto drawing-section border-4 border-dashed border-sky-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">¿Qué altura tenía la torre del súper castillo de arena de hoy? <input type="text" id="p9-q1" class="border-b border-dashed border-gray-400 w-24 bg-transparent px-1 font-bold text-sky-700"></p>
                    <p class="mt-1">¿Qué animal de colores os recordó el Faro pintado por Okuda? <input type="text" id="p9-q2" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-sky-700"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego: "El Faro Geométrico" (Intenta localizar círculos, triángulos y estrellas en el faro)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(9, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-9-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-sky-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(9, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-9-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-sky-300 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(8)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

        <!-- PÁGINA 10: DÍA 9 (EL REGRESO DE LA EXPEDICIÓN) -->
        <div id="page-10" class="page-sheet p-6 md:p-8 border-amber-300 bg-amber-50/10 hidden">
            <div class="bg-amber-600 text-white p-4 rounded-2xl flex justify-between items-center shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-4xl">🚀</span>
                    <h2 class="font-fun text-2xl font-bold">Día 9: El Regreso de la Expedición</h2>
                </div>
                <span class="text-xs font-bold bg-amber-800 px-3 py-1 rounded-full">Soria ➔ Valencia</span>
            </div>

            <div class="mt-4 flex justify-end no-print">
                <label class="flex items-center gap-3 bg-white border-2 border-amber-400 px-4 py-2 rounded-2xl cursor-pointer hover:bg-amber-50 transition shadow-sm">
                    <input type="checkbox" id="complete-day-10" class="w-6 h-6 text-amber-500 rounded-lg focus:ring-amber-400" onchange="toggleDayCompletion(10)">
                    <span class="font-fun text-xs font-bold text-amber-700">🏆 ¡SÍ, DÍA COMPLETADO!</span>
                </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="space-y-4">
                    <div class="bg-amber-100 p-4 rounded-2xl border-2 border-amber-300 kids-missions">
                        <h3 class="font-fun text-amber-800 text-sm mb-2 flex items-center gap-2"><span>🎮</span> ¡Misiones de Súper Explorador!</h3>
                        <p class="text-xs italic"><strong class="text-amber-700">Misión 1:</strong> Guardar en tu mochila tus conchas y amuletos del norte.</p>
                        <p class="text-xs italic mt-1"><strong class="text-amber-700">Misión 2:</strong> Explorar el laberinto mágico de arcos medievales de piedra en Soria.</p>
                        <p class="text-xs italic mt-1"><strong class="text-amber-700">Misión 3:</strong> ¡Convertirse en cohete espacial y aterrizar de vuelta en Valencia!</p>
                    </div>

                    <div class="bg-white/80 p-4 rounded-2xl border-2 border-amber-200 itinerary-box">
                        <h3 class="font-fun text-amber-800 text-sm flex items-center gap-2 mb-2"><span>📋</span> Bitácora Logística de los Papás</h3>
                        <p class="text-[11px]"><strong>10:00</strong> | Despedida de Penagos y maletas a bordo. Viaje por carretera.</p>
                        <p class="text-[11px] mt-1"><strong>13:15 - 16:00</strong> | Parada intermedia en Soria. Visita a los arcos entrelazados de San Juan de Duero y juegos libres.</p>
                        <p class="text-[11px] mt-1"><strong>16:00 - 19:30</strong> | Autovía de regreso A-23 a Valencia. ¡Misión cumplida!</p>
                        <div class="mt-2 text-[10px] text-amber-700 bg-amber-50 border border-dashed border-amber-300 p-2 rounded-xl">
                            <strong>📍 Recomendación por Cercanía:</strong> El espectacular Parque de la Dehesa en Soria tiene amplias zonas de césped, columpios gigantes y mucha sombra, ideal para que los niños estiren las piernas y quemen algo de energía antes del tramo final de coche.
                        </div>
                    </div>
                </div>
                <div class="polaroid-container">
                    <div class="bg-white p-3 pb-8 rounded-xl shadow-lg border-2 border-gray-100 rotate-1">
                        <img src="https://images.unsplash.com/photo-1548680325-1e3c837cb8e2?auto=format&fit=crop&w=600&q=80" onerror="this.src='https://placehold.co/600x450/fef3c7/92400e?text=Soria+Arcos'" class="w-full aspect-[4/3] object-cover rounded shadow-inner">
                        <p class="text-center font-fun text-gray-400 text-[10px] mt-2">📍 San Juan de Duero, Soria</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto drawing-section border-4 border-dashed border-amber-200 rounded-3xl p-4 bg-white/50">
                <div class="bg-yellow-50 border-2 border-yellow-200 p-3 rounded-2xl mb-3 text-xs">
                    <h4 class="font-bold text-amber-800">🔍 Rincón de Preguntas y Juegos</h4>
                    <p class="mt-1">¿Qué canción graciosa ha sido la que más habéis cantado en el coche? <input type="text" id="p10-q1" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-amber-700"></p>
                    <p class="mt-1">¿Qué ha sido lo más emocionante y favorito de toda la expedición? <input type="text" id="p10-q2" class="border-b border-dashed border-gray-400 w-32 bg-transparent px-1 font-bold text-amber-700"></p>
                    <p class="mt-1 font-semibold text-[10px] text-emerald-700">🎮 Minijuego: "La Dehesa Espacial" (Carrera de cohetes listos para volver a casa)</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-sky-600 name-exp1">Peque</span> <button onclick="clearCanvas(10, 'peque')" class="text-[8px] bg-sky-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-10-peque" class="drawing-canvas w-full h-24 border-2 border-dashed border-amber-200 rounded-xl"></canvas>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between items-center"><span class="canvas-label font-bold text-[10px] text-amber-600 name-exp2">Grande</span> <button onclick="clearCanvas(10, 'grande')" class="text-[8px] bg-amber-100 px-2 rounded no-print">Limpiar</button></div>
                        <canvas id="canvas-10-grande" class="drawing-canvas w-full h-24 border-2 border-dashed border-amber-300 rounded-xl"></canvas>
                    </div>
                </div>
                <div class="no-print mt-2 flex justify-center"><button onclick="generateAIBedtimeStory(9)" class="bg-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold shadow hover:bg-violet-600 transition">✨ Generar Cuento Nocturno</button></div>
            </div>
        </div>

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

    </div>

    <!-- WIDGET FLOATING DE BERNARDO EL OSO -->
    <div id="bernardo-widget-container" class="no-print fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <div id="bernardo-chatbox" class="hidden w-80 parchment-bg border-4 border-emerald-400 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-3">
            <div class="bg-emerald-500 p-3 text-white flex justify-between items-center border-b-2 border-emerald-600">
                <div class="flex items-center gap-2">
                    <span class="text-xl">🐻</span>
                    <h4 class="font-bold text-xs">Bernardo el Oso Guía</h4>
                </div>
                <button onclick="toggleBernardoChat()" class="text-white hover:text-amber-100 font-extrabold">✕</button>
            </div>
            <div id="bernardo-messages" class="h-64 p-4 overflow-y-auto space-y-2 text-[10px] flex flex-col bg-white/70">
                <div class="bg-emerald-100 p-2 rounded-2xl self-start max-w-[85%] text-emerald-950 font-medium">¡Hola exploradores! Soy Bernardo, vuestro guía secreto de Cabárceno. Preguntadme lo que queráis de Cantabria o contadme vuestras misiones del día. 🏕️🐾</div>
            </div>
            <div class="p-2 border-t flex gap-2 bg-white">
                <input id="bernardo-input" type="text" placeholder="Pregunta a Bernardo..." class="flex-grow p-1 text-xs border rounded-lg outline-none focus:border-emerald-500" onkeydown="if(event.key === 'Enter') sendBernardoMessage()">
                <button onclick="sendBernardoMessage()" class="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Enviar</button>
            </div>
        </div>
        <button onclick="toggleBernardoChat()" class="bg-emerald-500 text-white py-3 px-5 rounded-full shadow-2xl font-fun font-bold text-xs flex items-center gap-2 border-b-4 border-emerald-700 transition active:translate-y-1">🐻 PREGUNTAR IA</button>
    </div>

    <!-- MODAL DE REINICIAR PROGRESO INTEGRADO -->
    <div id="reset-confirm-modal" class="fixed inset-0 z-[120] bg-black/70 hidden flex items-center justify-center p-4">
        <div class="bg-white max-w-sm w-full p-6 rounded-3xl border-4 border-dashed border-red-500 text-center flex flex-col items-center gap-4">
            <span class="text-5xl animate-pulse">🗑️</span>
            <h3 class="font-fun text-red-700 text-lg font-bold">¿Reiniciar Bitácora?</h3>
            <p class="text-xs text-gray-600 leading-relaxed">¡Atención Exploradores! Si aceptáis, se borrarán de forma definitiva todos vuestros dibujos interactivos, respuestas y días completados para empezar la aventura de Cantabria desde cero.</p>
            <div class="flex gap-3 w-full mt-2">
                <button onclick="confirmResetProgress()" class="w-1/2 py-2 bg-red-500 hover:bg-red-600 text-white font-fun font-bold rounded-xl border-b-4 border-red-700 text-xs">¡Sí, vaciar todo!</button>
                <button onclick="closeResetModal()" class="w-1/2 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-fun font-bold rounded-xl text-xs">Cancelar</button>
            </div>
        </div>
    </div>

    <!-- VISUALIZADOR DE CUENTOS DE BUENAS NOCHES -->
    <div id="story-display" class="no-print fixed inset-0 bg-black/65 z-[105] hidden flex items-center justify-center p-4">
        <div class="bg-white max-w-lg w-full p-6 rounded-3xl border-4 border-dashed border-violet-400 max-h-[80vh] overflow-y-auto flex flex-col gap-4">
            <div class="flex justify-between items-center border-b pb-2">
                <h3 class="font-fun text-violet-700 text-lg font-bold flex items-center gap-2">✨ Cuento de Buenas Noches IA</h3>
                <button onclick="closeStoryDisplay()" class="text-gray-400 hover:text-gray-700 font-extrabold text-lg">✕</button>
            </div>
            <div id="story-text" class="text-xs text-gray-700 leading-relaxed italic parchment-bg p-4 rounded-2xl whitespace-pre-line border">Cargando el cuento nocturno de vuestras misiones... 🪄🌟</div>
            <div class="flex gap-2 justify-end">
                <button id="btn-listen" onclick="speakStory()" class="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-fun text-xs font-bold rounded-xl flex items-center gap-2 shadow border-b-4 border-violet-800">🔊 Escuchar Cuento</button>
                <button onclick="closeStoryDisplay()" class="px-4 py-2 bg-gray-100 text-gray-600 font-fun text-xs font-bold rounded-xl">Cerrar</button>
            </div>
        </div>
    </div>

    <!-- Entry point para Vite -->
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
`;
fs.writeFileSync('index.html', rawHtml);
