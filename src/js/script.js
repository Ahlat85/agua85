const agua85 = {
  sort_list: list_parent => {
    alert(list_parent)
    list_parent = $(list_parent);
    const list_items = list_parent.children("li").get();
    list_items.sort((a, b) => {
      return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    });
    $.each(list_items, (i, e) => {
      list_parent.append(e);
    });
  },
  sort_lists: lists_parent => {
    lists_parent = $(lists_parent);
    if (lists_parent instanceof HTMLUListElement) {
      agua85.sort_list(lists_parent);
      return;
    }
    $.each(lists_parent, (i, e) => {
      agua85.sort_list(e);
    });
  },
  repeatString: (str, num) => {
    let out = "";
    for (let i = 0; i < num; i++) {
      out += str;
    }
    return out;
  },
  // https://stackoverflow.com/questions/603987/what-is-the-javascript-equivalent-of-var-dump-or-print-r-in-php
  var_dump: (v, howDisplay, recursionLevel) => {
    howDisplay = (typeof howDisplay === 'undefined') ? "alert": howDisplay;
    recursionLevel = (typeof recursionLevel !== 'number') ? 0: recursionLevel;

    var vType = typeof v;
    var out = vType;

    switch (vType) {
      case "number":
        /* there is absolutely no way in JS to distinguish 2 from 2.0
           so 'number' is the best that you can do. The following doesn't work:
           var er = /^[0-9]+$/;
           if (!isNaN(v) && v % 1 === 0 && er.test(3.0)) {
               out = 'int';
           }
        */
        break;
      case "boolean":
        out += ": " + v;
        break;
      case "string":
        out += "(" + v.length + '): "' + v + '"';
        break;
      case "object":
        //check if null
        if (v === null) {
          out = "null";
        }
        //If using jQuery: if ($.isArray(v))
        //If using IE: if (isArray(v))
        //this should work for all browsers according to the ECMAScript standard:
        else if (Object.prototype.toString.call(v) === '[object Array]') {
          out = 'array(' + v.length + '): {\n';
          for (var i = 0; i < v.length; i++) {
            out += agua85.repeatString('   ', recursionLevel) + "   [" + i + "]:  " +
            agua85.var_dump(v[i], "none", recursionLevel + 1) + "\n";
          }
          out += agua85.repeatString('   ', recursionLevel) + "}";
        } else {
          //if object
          let sContents = "{\n";
          let cnt = 0;
          for (var member in v) {
            //No way to know the original data type of member, since JS
            //always converts it to a string and no other way to parse objects.
            sContents += agua85.repeatString('   ', recursionLevel) + "   " + member +
            ":  " + agua85.var_dump(v[member], "none", recursionLevel + 1) + "\n";
            cnt++;
          }
          sContents += agua85.repeatString('   ', recursionLevel) + "}";
          out += "(" + cnt + "): " + sContents;
        }
        break;
      default:
        out = v;
        break;
    }

    if (howDisplay != "none") {
      if (howDisplay == "alert") {
        alert(out);
      }

      var pre = document.createElement('pre');
      pre.innerHTML = out;
      $(howDisplay).append(pre);
    }

    return out;
  }

}

//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null)
      throw new TypeError('can\'t convert ' + this + ' to object');

    var str = '' + this;
    // To convert string to integer.
    count = +count;
    // Check NaN
    if (count != count)
      count = 0;

    if (count < 0)
      throw new RangeError('repeat count must be non-negative');

    if (count == Infinity)
      throw new RangeError('repeat count must be less than infinity');

    count = Math.floor(count);
    if (str.length == 0 || count == 0)
      return '';

    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28)
      throw new RangeError('repeat count must not overflow maximum string size');

    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
      str += str;
      count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  }
}