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

      return String.fromCharCode(key).match(mask);
    }).bind(pasteEventName, function () {
      this.value = $.grep(this.value, function (character) {
        return character.match(mask);
      }).join('');
    });
  }
})(jQuery);
