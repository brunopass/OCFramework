const { sha256 } = require("js-sha256")
const { ulid } = require("ulid")

module.exports = generateId = () => {
    return sha256(ulid())
}