# funce-emitter [![Build Status](https://travis-ci.org/alanshaw/funce-emitter.svg?branch=master)](https://travis-ci.org/alanshaw/funce-emitter) [![devDependency Status](https://david-dm.org/alanshaw/funce-emitter/dev-status.svg)](https://david-dm.org/alanshaw/funce-emitter#info=devDependencies)
Register a one time listener for an event, fired only when the filter function returns true.

[![browser support](https://ci.testling.com/alanshaw/funce-emitter.png)](https://ci.testling.com/alanshaw/funce-emitter)

## Example

Swapper.js

```js
var inherits = require("util").inherits
var FunceEmitter = require("funce-emitter")

function Swapper (items) {
  FunceEmitter.call(this)
  this.items = items.slice()
}

inherits(Swapper, FunceEmitter)

Swapper.prototype.swap = function (index, item) {
  var removed = this.items[index]
  this.items[index] = item
  this.emit("swap", {removed: removed, added: item})
}

module.exports = Swapper
```

main.js

```js
var Swapper = require("./Swapper.js")

var items = [
  {id: 1, name: "One"},
  {id: 2, name: "Two"},
  {id: 3, name: "Three"}
]

var swapper = new Swapper(items)

// One time listener for when item with id 3 is removed
swapper.funce(
  "swap",
  function (e) {
    return e.removed.id == 3
  },
  function (e) {
    console.log("Item with ID 3 was removed!")
  }
)
```

## API
FunceEmitter is an [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

### FunceEmitter.funce(eventName, filter, handler)
Register a one time listener for the event `eventName`. De-registered and handled by the `handler` only when `filter` function returns *true*.

