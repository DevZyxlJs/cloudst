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

## 🧩 Scrspers!

<details>
<summary><strong>🌵 Downloaders</summary>

```javascript
import { mediafiredl, fbDownloader, ytplay } from 'cloudst'

// - Ejemplo Mediafire
const mf = await mediafiredl('https://www.mediafire.com/file/xxxxxx')
console.log(mf)

// - Ejemplo Facebook
const fb = await fbDownloader('https://www.facebook.com/watch/?v=xxxxxx')
console.log(fb)

// - Ejemplo YouTube Play
const yt = await ytplay('Bad Bunny - Tití Me Preguntó', '320k')
console.log(yt)
```
</details>

<details>
<summary><strong>🌵 Searchs</summary>

```javascript
import { wiki } from 'cloudst'

// - Ejemplo Wikipedia
const results = await wiki('Colombia')
console.log(results)
```
</details>

---

> [!NOTE]
> Los scrapers usan cabeceras y técnicas específicas para obtener enlaces directos.  
> Algunos servicios pueden cambiar su HTML/API, por lo que el scraper podría necesitar ajustes.  
> `ytplay` soporta bitrate `128k` y `320k`.
