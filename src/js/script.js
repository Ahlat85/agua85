/* repeatString() returns a string which has been repeated a set number of times */
function repeatString(str, num) {
  out = '';
  for (var i = 0; i < num; i++) {
    out += str;
  }
  return out;
}

/*
dump() displays the contents of a variable like var_dump() does in PHP. dump() is
better than typeof, because it can distinguish between array, null and object.
Parameters:
    v:              The variable
    howDisplay:     "none", "body", "alert" (default)
    recursionLevel: Number of times the function has recursed when entering nested
                    objects or arrays. Each level of recursion adds extra space to the
                    output to indicate level. Set to 0 by default.
Return Value:
    A string of the variable's contents
Limitations:
    Can't pass an undefined variable to dump().
    dump() can't distinguish between int and float.
    dump() can't tell the original variable type of a member variable of an object.
    These limitations can't be fixed because these are *features* of JS. However, dump()
*/
function dump(v, howDisplay, recursionLevel) {
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
          out += repeatString('   ', recursionLevel) + "   [" + i + "]:  " +
          dump(v[i], "none", recursionLevel + 1) + "\n";
        }
        out += repeatString('   ', recursionLevel) + "}";
      } else {
        //if object
        let sContents = "{\n";
        let cnt = 0;
        for (var member in v) {
          //No way to know the original data type of member, since JS
          //always converts it to a string and no other way to parse objects.
          sContents += repeatString('   ', recursionLevel) + "   " + member +
          ":  " + dump(v[member], "none", recursionLevel + 1) + "\n";
          cnt++;
        }
        sContents += repeatString('   ', recursionLevel) + "}";
        out += "(" + cnt + "): " + sContents;
      }
      break;
    default:
      out = v;
      break;
  }

  if (howDisplay == 'body') {
    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre);
  } else if (howDisplay == 'alert') {
    alert(out);
  }

  return out;
}



const agua85 = {
  id: length => {
    let result = '';
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += CHARS.charAt(Math.floor(Math.random() *
        CHARS.length));
    }
    return result;
  },
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
  getAllMethods: object => {
    return Object.getOwnPropertyNames(object).filter(function(property) {
      return typeof object[property] == 'function';
    });
  },
  var_dump: (data, output, key) => {
    const tData = typeof data;
    let result = $.parseHTML(`<div class="var_dump card card-body"></div>`);

    switch (tData) {
      case "number":
        $(result).append(`<p>number: ${data} </p>`);
        break;
      case "string":
        $(result).append(`<p>string (${data.length}): ${data} </p>`);
        break;
      case "boolean":
        $(result).append(`<p>boolean: ${data} </p>`);
        break;
      case "function":
        $(result).append(`<p>function: ${data.name} </p>`);
        break;
      case "object":
        if (data == null) {
          $(result).append(`null`);
        } else if (Object.prototype.toString.call(data) === '[object Array]') {
          const id = agua85.id(20);
          const div = $.parseHTML(`<p>array (${data.length}): <button class="btn btn-info m-2" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">>Detail</button> </p>`);

          const collapse = $.parseHTML(`<div class="collapse" id="${id}"></div>`);
          $(div).append(collapse);
          const body = $.parseHTML(`<div class="card card-body"></div>`);
          $(collapse).append(body);
          for (const i in data) {
            agua85.var_dump(data[i], body);
          }

          $(result).append(div);
        } else {
          const id = agua85.id(5) + Date.now() + agua85.id(5);
          let div;
          if (key) {
            div = $.parseHTML(`<p>${key}: <button class="btn btn-info m-2" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">>Detail</button> </p>`);
          } else {
            div = $.parseHTML(`<p>object: <button class="btn btn-info m-2" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">>Detail</button> </p>`);
          }
          const collapse = $.parseHTML(`<div class="collapse" id="${id}"></div>`);
          $(div).append(collapse);
          const body = $.parseHTML(`<div class="card card-body"></div>`);
          $(collapse).append(body);
          for (const [key, value] of Object.entries(data)) {
            agua85.var_dump(value, body, key);
          }
          $(result).append(div);
        }
    }

    $(output).append(result);
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