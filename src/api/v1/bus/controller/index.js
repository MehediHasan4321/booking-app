const findAll = require('./findAll')
const create = require('./create')
const findSingle = require('./findSingle')
const updateOrCreate = require('./updateOrCreate')
const updateByPatch = require('./updateByPatch')
const removeItem = require('./removeItems')
module.exports = {
    findAll,
    create,
    findSingle,
    updateOrCreate,
    updateByPatch,
    removeItem,
}