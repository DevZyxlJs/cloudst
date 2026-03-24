## 🫛 **CloudST - MODULO**

> [!TIP]
> Scraper modular en Node.js para distintas plataformas (Wikipedia, Mediafire, Facebook, YouTube, Pinterest y más...).  
Diseñado para ser usado como **módulo** con `import` o `require` y ejecutado con `await`.

---

> [!CAUTION]  
> El bot [Alya](https://github.com/DevZyxlJs/AlyaBot-MD) ya utiliza nuestro módulo en producción.  
> Si encuentras algún error al implementarlo, puedes guiarte con su código como referencia práctica para la integración.

---

## 📦 Instalación

```bash
npm install cloudst
```

---

## 🌱 Ejemplo en Package.json

```javascript
"cloudst": "^1.0.0"
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
```
</details>

<details>
<summary><strong>🌵 Searchs</summary>

```javascript
import { wiki, tiktokSearch, pinterestSearch } from 'cloudst'

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

// TikTok
const tk = await tiktokSearch('Bad Bunny')
console.log(tk)
/*
{
  "status": true,
  "data": [
    {
      "title": "Funny dance",
      "id": "7234567890",
      "dl": "https://tikcdn.com/play/xxxx.mp4",
      "watermark": "https://tikcdn.com/wmplay/xxxx.mp4",
      "music": {
        "title": "Dance Song",
        "author": "DJ Test",
        "url": "https://tikcdn.com/music/xxxx.mp3"
      },
      "duration": "0:30",
      "cover": "https://tikcdn.com/cover/xxxx.jpg",
      "author": {
        "nickname": "user123",
        "unique_id": "user12345"
      },
      "stats": {
        "likes": 1200,
        "comments": 45,
        "shares": 10,
        "views": 5000,
        "downloads": 200
      }
    }
  ]
}
*/

// Pinterest
const pin = await pinterestSearch('paisajes', 10)
console.log(pin)
/*
{
  "status": true,
  "data": [
    {
      "title": "Paisaje de montaña",
      "id": "987654321",
      "description": "Hermoso paisaje al amanecer",
      "username": "naturelover",
      "full_name": "Nature Lover",
      "followers": 1200,
      "likes": 300,
      "created": "2024-05-10",
      "hd": "https://pinterest.com/img/large.jpg",
      "mini": "https://pinterest.com/img/small.jpg"
    }
  ]
}
*/
```
</details>

---

> [!IMPORTANT]
> Los scrapers generan **JSON dinámicos** que dependen de la estructura actual del servicio.  
> Ten en cuenta que estos datos **no siempre son precisos ni estables**, ya que las plataformas pueden cambiar su HTML o API en cualquier momento.  
> Para depurar y validar la salida, se recomienda usar `console.log` y revisar los objetos completos antes de integrarlos en tu bot.

---

> [!NOTE]
> Los scrapers usan cabeceras y técnicas específicas para obtener enlaces directos.  
> Algunos servicios pueden cambiar su HTML/API, por lo que el scraper podría necesitar ajustes.  
> `ytplay` soporta bitrate `128k` y `320k`.
