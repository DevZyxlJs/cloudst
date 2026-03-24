const { wiki } = require('./cloud/wiki')
const { mediafiredl, fbDownloader, ytplay } = require('./cloud/dl')
const { tiktokSearch, pinterestSearch } = require('./cloud/searchs')
const { Copilot, ai } = require('./cloud/ais')

module.exports = {
  wiki,
  mediafiredl,
  fbDownloader,
  ytplay,
  tiktokSearch,
  pinterestSearch,
  Copilot, 
  ai
}