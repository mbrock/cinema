# Cinema of Reactions

Hello! This is a very simple library I made to animate a React view
based on a timeline. You just pass a `t` parameter down through your
view hierarchy. The library helps you create and combine `t`-based
views. It can also run a `requestAnimationFrame` loop to update your
`t`.

Example:

```
var C = Cinema
var Movie = React.createClass({
  render: function () {
    return C.sequence(
      C.scene(1, function (t) { return <h1>{C.typing("Knock knock!", t)}</h1> }),
      C.scene(2, function (t) { return <h1>{C.typing("Who's there?", t)}</h1> }),
      C.scene(1, function (t) { return <h1>{C.typing("Cinema.js!", t)}</h1> })
    )(this.state.t)
  }
})

var m = React.render(<Movie/>, document.body)
C.play(m, C.scaled(5, C.looped(8, C.seconds)))
```

This is a view whose content is determined by a sequence of three
"scenes". A scene is just a function and a length. The length is
relative to the total length of the sequence; here we only say that
the `"Who's there?"` scene should be twice as long as the others. And
the functions simply return React views based on their `t` parameter,
which goes from `0` to `1`.

The `typing` function makes an animated string; in fact, it just
returns the prefix according to the `t` parameter. You can easily make
your own such functions.

And you can easily use `t` as a parameter to sub-views, creating a
nested movie.

The `play` function starts a render loop based on
`requestAnimationFrame`. It will set the `t` parameter on the state of
the given view at 60 FPS (or whatever). The second argument is a
function specifying how to calculate the `t` parameter given a time in
milliseconds.

You can implement arbitrary cool time mappings, but the library
provides some simple combinators, namely `scaled`, `looped`, and
`seconds`. Hopefully it's clear from the example what they do.

Happy animating!
