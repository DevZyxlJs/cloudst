"use strict";

const { wiki } = require('./cloud/wiki')
const { mediafiredl, fbDownloader, ytplay } = require('./cloud/dl')
const { pinterestSearch, tiktokSearch } = require('./cloud/searchs')

module.exports = {
  wiki,
  mediafiredl,
  fbDownloader,
  ytplay,
  tiktokSearch,
  pinterestSearch
}