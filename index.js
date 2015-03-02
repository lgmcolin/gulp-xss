'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var xssFilter = require('xss');

module.exports = function(opts) {
  opts = opts || {};

  return through.obj(function (file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }

      if (file.isStream()) {
        cb(new gutil.PluginError('gulp-xss', 'Streaming not supported'));
        return;
      }

      try {
        var res = xssFilter(file.contents.toString(), opts);

        file.contents = new Buffer(res);
        this.push(file);
      } catch (err) {
        this.emit('error', new gutil.PluginError('gulp-xss', err, {fileName: file.path}));
      }

  });
}