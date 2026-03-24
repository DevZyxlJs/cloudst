# cloudst

Scraper modular en Node.js para distintas plataformas (Wikipedia, Mediafire, Facebook, YouTube).  
Diseñado para ser usado como **módulo** con `import` o `require` y ejecutado con `await`.

---

## 📦 Instalación

```bash
npm install cloudst
```

## 📂 Uso básico

import { wiki, mediafiredl, fbDownloader, ytplay } from 'cloudst'

// Ejemplo Wikipedia (usa req/res de Express)
await wiki(req, res)

// Ejemplo Mediafire
const mf = await mediafiredl('https://www.mediafire.com/file/xxxxxx')
console.log(mf)

// Ejemplo Facebook
const fb = await fbDownloader('https://www.facebook.com/watch/?v=xxxxxx')
console.log(fb)

// Ejemplo YouTube Play
const yt = await ytplay('Bad Bunny - Tití Me Preguntó', '320k')
console.log(yt)

## 🔎 Scrapers disponibles

### 1. `wiki`
Busca artículos en Wikipedia y devuelve resultados con título y snippet.  

**Devuelve:**
- `title`: título del artículo  
- `snippet`: resumen corto del contenido  

---

### 2. `mediafiredl`
Obtiene información de un archivo alojado en Mediafire.  

**Devuelve:**
- `filename`: nombre del archivo  
- `filetype`: tipo de archivo  
- `filesize`: tamaño  
- `uploaded`: fecha de subida  
- `download`: enlace directo de descarga  

---

### 3. `fbDownloader`
Extrae enlaces de descarga de videos de Facebook en distintas calidades.  

**Devuelve:** array de objetos con:
- `quality`: calidad del video (ej. 720p, 1080p)  
- `url`: enlace directo de descarga  

---

### 4. `ytplay`
Convierte un video de YouTube a audio MP3 y lo sube a Catbox.  

**Devuelve:**
- `title`: título del video  
- `channel`: canal de YouTube  
- `duration`: duración en segundos  
- `views`: número de vistas  
- `published`: fecha de publicación  
- `cdnUrl`: enlace al archivo MP3 en Catbox  
- `fileName`: nombre del archivo generado

## ⚙️ Notas
- Los scrapers usan cabeceras y técnicas específicas para obtener enlaces directos.  
- Algunos servicios pueden cambiar su HTML/API, por lo que el scraper podría necesitar ajustes.  
- `ytplay` soporta bitrate `128k` y `320k`.

## 📜 Licencia
MIT © DevZyxlJs