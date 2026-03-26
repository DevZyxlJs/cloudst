const { wiki } = require('./cloud/wiki')
const { mediafiredl, fbDownloader, ytplay } = require('./cloud/dl')
const { tiktokSearch, pinterestSearch } = require('./cloud/searchs')
const { Copilot, ai } = require('./cloud/ais')
const { stickerlySearch, stickerlyDetail } = require('./cloud/stickerly')
const { ytmp4, ytmp3 } = require('./cloud/ytdls')

module.exports = {
  wiki,
  mediafiredl,
  fbDownloader,
  ytplay,
  tiktokSearch,
  pinterestSearch,
  Copilot,
  ai,
  stickerlySearch,
  stickerlyDetail,
  ytmp4,
  ytmp3
}