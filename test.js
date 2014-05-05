var test = require("tape")
  , FunceEmitter = require("./")

test("One time listener is de-registered when filter becomes true", function (t) {
  t.plan(4)
  var emitter = new FunceEmitter()

  var e0 = {name: "event1"}
  var e1 = {name: "event2"}

  emitter.funce("testEvent", function (e) {return e.name == e1.name}, function (e) {
    t.equal(e.name, e1.name)
  })

  t.equal(emitter.listeners("testEvent").length, 1)

  emitter.emit("testEvent", e0)

  t.equal(emitter.listeners("testEvent").length, 1)

  emitter.emit("testEvent", e1)

  t.equal(emitter.listeners("testEvent").length, 0)
})