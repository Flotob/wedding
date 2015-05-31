var
  // wedding = 'W E D D I N G', // this needs no further comment
  wedding = '',

  animation = (function () { // animation control
    var transitionSpeed = 1000; // in ms

    // settings
    $.fx.speeds._default = transitionSpeed;
    $.fn.setCursorPosition = function(pos) {
      this.each(function(index, elem) {
        if (elem.setSelectionRange) {
          elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      });
      return this;
    };          

    // handlers
    function reset (o) {
      o = $(o).stop();

      if ( o.css('opacity') > 0) {
        o.transition({opacity: 0}, function () {
          o.value = o.value || wedding;
        });
      }
      else o.value = o.value || wedding;
    }

    function start (o) {
      $(o)
        .transition({opacity: 1})
        .typed({
          strings: [
            'people',
            'events',
            'locations',
            'subscribe now',
            ''
          ],
          contentType: 'html',
          typeSpeed: 50,
          startDelay: transitionSpeed/2,
          loop: false,
          showCursor: true,
          cursorChar: '|',
          callback: function () {
            input(o);
          },
          preStringTyped: function () {
            $(o).addClass('animation')
          },
          resetCallback: function () {
            $(o).removeClass('animation')
          }
        });
    }

    function input (o) {
      o.value = '@';
      o.focus();
      $(o).setCursorPosition(0);
    }

    // api
    return {
      start: start,
      reset: reset,
      input: input
    }
  })(),

  // the canvas for the animation (=input field)
  canvas = $('<input type="text" name="email" dir="ltr" value="' + wedding + '">')
    .prependTo('body')
    .on('click', function () {
      animation.start(this);
    })
    // .on('mouseover', function () {
    //   animation.start(this);
    // });

  // initialize canvas
  animation.reset(canvas);