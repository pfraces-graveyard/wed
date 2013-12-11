var each = require('u.each');

var mixin = function (a, b) {
  each(b, function (item, index) {
    a[index] = item;
  });

  return a;
};

var Mix = function (sources) {
  this.sources = sources;
};

Mix.prototype.in = function (target) {
  target = target || {};

  each(this.sources, function (source) {
    mixin(target, source);
  });

  return target;
};

module.exports = function () {
  return new Mix([].slice.apply(arguments));
};
