var inherits = require("util").inherits
var EventEmitter = require("events").EventEmitter

function FunceEmitter () {
  EventEmitter.call(this)
}

inherits(FunceEmitter, EventEmitter)

FunceEmitter.prototype.funce = function (name, filter, handler) {
  var self = this

  function funceHandler () {
    var args = Array.prototype.slice.call(arguments)
    if (filter.apply(self, args)) {
      self.removeListener(name, funceHandler)
      handler.apply(self, args)
    }
  }

  return self.on(name, funceHandler)
}

module.exports = FunceEmitter
