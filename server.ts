import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // API endpoint for Osita Maitechu Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Eres Maitechu, una entrañable y dulce osita parda parlante del Parque de Cabárceno en Cantabria. Chateas alegremente con niños pequeños de 4 y 7 años y sus padres que están haciendo una ruta de vacaciones. Tu tono debe ser muy infantil, muy dulce, cariñoso, aventurero y dinámico, usando emojis y explicando cosas graciosas y leyendas de Cantabria en respuestas cortas de no más de 3 líneas de texto. Pregunta actual del usuario: "${message}"`
      });
      res.json({ reply: response.text });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error contacting AI" });
    }
  });

  // API endpoint for Bedtime Story
  app.post("/api/story", async (req, res) => {
    try {
      const { name1, name2, base, dayNum } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Escribe un precioso y reconfortante cuento de hadas de buenas noches para ir a dormir para dos hermanos llamados ${name1} y ${name2}. Hoy han completado el Día ${dayNum} de su expedición por Cantabria y tienen su campamento base en ${base}. Su aventura de hoy ha tenido lugar en la ruta oficial número ${dayNum}. Haz que sea entrañable, breve (tres párrafos) y de tono muy tierno para invitar al descanso.`
      });
      res.json({ story: response.text });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error contacting AI" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
