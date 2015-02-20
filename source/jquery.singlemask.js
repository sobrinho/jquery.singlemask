/*
  Character mask for jQuery.
  https://github.com/sobrinho/jquery.singlemask

  Copyright (c) 2011-2013 Gabriel Sobrinho (http://gabrielsobrinho.com/).
  Released under the MIT license
*/
(function ($) {
  function getPasteEvent() {
    var el = document.createElement('input'),

    name = 'onpaste';
    el.setAttribute(name, '');
    return (typeof el[name] === 'function') ? 'paste' : 'input';
  }

  var pasteEventName = getPasteEvent();

  $.fn.singlemask = function (mask) {
    $(this).keydown(function (event) {
      var key = event.keyCode;

      if (key < 16 || (key > 16 && key < 32) || (key > 32 && key < 41)) {
        return;
      }

      // Numpad key numbers starts on 96 (0) and ends on 105 (9)
      // Somehow the String.fromCharCode doesn't knows that
      // Subtracting 48 we have the 'standard' number code
      if (key >= 96 && key <= 105) {
        key = key - 48;
      }

      if (!String.fromCharCode(key).match(mask)) {
        event.preventDefault();
      };
    }).bind(pasteEventName, function () {
      this.value = $.grep(this.value, function (character) {
        return character.match(mask);
      }).join('');
    });
  }
})(jQuery);
