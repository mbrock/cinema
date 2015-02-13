;(function () {

  function scene (duration, render) {
    return { duration: duration, render: render };
  }

  function seq (scenes) {
    if (arguments.length > 1)
      return seq(Array.prototype.slice.call(arguments));

    var total = scenes.reduce(function (a, x) { return a + x.duration }, 0)

    // XXX: refactor this ugly mess
    return function (t) {
      var i = 0, a = 0, an
      for (;;) {
        if (i >= scenes.length)
          return scenes[i - 1].render(1)
        an = a + (scenes[i].duration / total)
        if (t < an)
          return scenes[i].render((t - a) / (an - a))
        a = an
        i++
      }
    }
  }

  function typing (text, t) {
    return text.substr(0, Math.round(text.length * (t * 1.5)))
  }

  function play (component, timeTransform) {
    var t0 = null, t;
    timeTransform = timeTransform || function (t) { return t }
    requestAnimationFrame(step);

    function step (now) {
      if (t0 === null)
        t0 = now
        
      t = (now - t0)
      component.setState({ t: timeTransform(t) })

      requestAnimationFrame(step)
    }
  }

  var seconds = function (t) { return t / 1000 }
 
  function scaled (k, f) {
    return function (t) { return f(t) / k }
  }

  function looped (modulo, f) {
    return function (t) { return f(t) % modulo }
  }

  var exports = {
    scene: scene,
    seq: seq,
    typing: typing,
    seconds: seconds,
    scaled: scaled,
    looped: looped,
    play: play
  };

  window.Movie = exports;

  return exports;

})()
