# funce-emitter
Register a one listener for an event, fired only when the filter function returns true.

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

