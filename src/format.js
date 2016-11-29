(function (global) {

  var format = {};

  format.trimmed = {

    parse: function (value) {
      return (value || "").trim();
    }

  }

  global.format = format;

})(window);