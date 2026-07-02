const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The first time we did the replacement for i <= 3, it caught some loops.
// Let's ensure the progress update loop goes up to 10 as well.
html = html.replace(/i <= 3/g, "i <= 10");

// However, page-tabs-container needs to loop up to 12.
html = html.replace(/for \(let i = 1; i <= 10; i\+\+\) \{\n                const isCompleted/g, "for (let i = 1; i <= 12; i++) {\n                const isCompleted");

// And updateGlobalProgress needs to account for pages 11 and 12 checkboxes.
const progressReplace = `            document.querySelectorAll('#page-11 input[type="checkbox"], #page-12 input[type="checkbox"]').forEach(chk => {
                totalTasks++;
                if (chk.checked) {
                    completedTasks++;
                }
            });

            for (let i = 2; i <= 10; i++) {`;

html = html.replace(/for \(let i = 2; i <= 10; i\+\+\) \{\n                totalTasks \+= 10;/, progressReplace + "\n                totalTasks += 10;");

// Update rank text in progress bar
const rankUpdate = `const rankLabel = document.getElementById('explorer-rank');
            if (rankLabel) {
                if (percent < 20) rankLabel.innerText = "⭐ Grado: Grumete de Carretera (¡Fuerza con las misiones!)";
                else if (percent < 50) rankLabel.innerText = "⭐⭐ Grado: Aventurero Forestal (¡Cabárceno os aguarda!)";
                else if (percent < 80) rankLabel.innerText = "⭐⭐⭐ Grado: Explorador de Leyenda (¡Casi todo dominado!)";
                else rankLabel.innerText = "👑 SÚPER EXPEDICIONARIOS DE CANTABRIA ¡Misión Cumplida!";
            }`;
html = html.replace(/if \(bar\) bar\.style\.width = \`\$\{percent\}%\`;/, `if (bar) bar.style.width = \`\$\{percent\}%\`;\n            ${rankUpdate}`);

// And the page check inside buildTabs loop:
html = html.replace(/if \(isCompleted && i >= 2 && i <= 3\)/g, "if (isCompleted && i >= 2 && i <= 10)");
html = html.replace(/if \(isCompleted && i >= 2 && i <= 10\)/g, "if (isCompleted && i >= 2 && i <= 10)"); // If it already got replaced

// Password check function is already there, but let's make sure it handles localStorage properly
fs.writeFileSync('index.html', html);
