$(document).ready(function() {
  var
    wedding = '',
    animation = (function () { // animation control
      var transitionSpeed = 1000, // in ms
          bgcanvas = $('body'),
          img_path = 'img/';

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
              // 'faces',
              // 'events',
              // 'locations',
              // 'subscribe now',
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
        var submission = false,
            form = $(o).parent('form');

        $(o)
          .val('@')
          .setCursorPosition(0)
          .on('keypress', function (event) {
            if (event.keyCode == 13 && !submission) {
              submission = true;
              $(o).attr('type', 'email');
              $(o).prop('disabled', true);

              form.ajaxChimp({
                url: 'http://wedding.us11.list-manage.com/subscribe/post?u=e47873f5433b478ab722f8608&amp;id=a4d95778c2',
                // language: window.navigator.userLanguage || window.navigator.language,
                callback: function (resp) {
                  if (resp.result === 'success')
                    thankyou(form);
                  else {
                    submission = false;
                    $(o).attr('type', 'text');
                    $(o).prop('disabled', false);
                    console.log('error');
                  }
                }
              })
            }
          })
          .focus();
      }

      function bg (img) {
        bgcanvas.css({
          'backgroundImage': 'url(' + img_path + img + ')',
          'backgroundSize': '100%',
          'backgroundPosition': '0 0'
        });
      }

      function thankyou(o) {
        bg('kiss.png');
        var msg = $('<div class="thanks">thank you</div>')
          .typed({
            strings: [
              'we sent you a confirmation email', 
              'thank you',
              ':)'
            ],
            contentType: 'html',
            typeSpeed: 50,
            startDelay: 0,
            loop: false,
            showCursor: true,
            cursorChar: '|'
          });

        $(o).replaceWith(msg);
      }

      // api
      return {
        start: start,
        reset: reset,
        input: input
      }
    })(),

    // the canvas for the animation (=input field)
    canvas = $('<input type="text" id="mc-email" dir="ltr" value="' + wedding + '">')
      .prependTo('body')
      .on('click', function () {
        animation.start(this);
      })
      .wrap('<form id="mc-form" />')

    // initialize canvas
    animation.reset(canvas);
});