# cloudst

> [!TIP]
> Scraper modular en Node.js para distintas plataformas (Wikipedia, Mediafire, Facebook, YouTube).  
Diseñado para ser usado como **módulo** con `import` o `require` y ejecutado con `await`.

---

## 📦 Instalación

```bash
npm install cloudst
```

---

## 🌱 Ejemplo en Package.json

```javascript
"cloudst": "github:DevZyxlJs/cloudst"
```

---

## 🧩 Scrapers!

<details>
<summary><strong>🌵 Downloaders</strong></summary>

```javascript
import { mediafiredl, fbDownloader, ytplay } from 'cloudst'

// - Ejemplo Mediafire
const mf = await mediafiredl('https://www.mediafire.com/file/xxxxxx')
console.log(mf)
/*
{
  filename: "archivo.zip",
  filetype: "ZIP",
  filesize: "15 MB",
  uploaded: "2024-05-10",
  download: "https://download.mediafire.com/xxxxxx/archivo.zip"
}
*/

// - Ejemplo Facebook
const fb = await fbDownloader('https://www.facebook.com/watch/?v=xxxxxx')
console.log(fb)
/*
[
  { quality: "720p", url: "https://fbcdn.net/video720.mp4" },
  { quality: "1080p", url: "https://fbcdn.net/video1080.mp4" }
]
*/

// - Ejemplo YouTube Play
const yt = await ytplay('Bad Bunny - Tití Me Preguntó', '320k')
console.log(yt)
/*
{
  title: "Bad Bunny - Tití Me Preguntó",
  channel: "Bad Bunny",
  duration: 240,
  views: 123456789,
  published: "2 years ago",
  cdnUrl: "https://files.catbox.moe/xxxxxx.mp3",
  fileName: "Tití_Me_Preguntó.mp3"
}
*/
</details>

<details>
<summary><strong>🌵 Searchs</summary>
import { wiki } from 'cloudst'

// - Ejemplo Wikipedia
const results = await wiki('Colombia')
console.log(results)
/*
[
  { title: "Colombia", snippet: "Colombia es un país situado en América del Sur..." },
  { title: "Historia de Colombia", snippet: "La historia de Colombia comienza con..." },
  { title: "Geografía de Colombia", snippet: "Colombia cuenta con regiones diversas..." }
]
*/
</details>

---

> [!NOTE]
> Los scrapers usan cabeceras y técnicas específicas para obtener enlaces directos.  
> Algunos servicios pueden cambiar su HTML/API, por lo que el scraper podría necesitar ajustes.  
> `ytplay` soporta bitrate `128k` y `320k`.
