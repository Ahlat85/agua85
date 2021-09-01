const agua85 = {
  id: length => {
    let result = '';
    const CHARS = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
    for (let i = 0; i < length; i++) {
      result += CHARS.charAt(Math.floor(Math.random() *
        CHARS.length));
    }
    return result;
  },
  sort_list: list_parent => {
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
  var_dump: (data, output, key) => {
    const tData = typeof data;
    let result = $.parseHTML(`<div class="var_dump"></div>`);

    switch (tData) {
      case "number":
        $(result).append(`<p>number: ${data} </p>`);
        break;
      case "string":
        $(result).append(`<p>string (${data.length}): ${data} </p>`);
        break;
      case "boolean":
        $(result).append(`<p>boolean: <span class="boolean">${data}</span> </p>`);
        break;
      case "function":
        $(result).append(`<p>function: ${data.name} </p>`);
        break;
      case "object":
        const id = agua85.id(50) + Date.now();
        if (data == null) {
          $(result).append(`null`);
        } else if (Object.prototype.toString.call(data) === '[object Array]') {
          const div = $.parseHTML(`<p>array (${data.length}): <button class="btn btn-info m-2" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">>Detail</button> </p>`);

          const collapse = $.parseHTML(`<div class="collapse" id="${id}"></div>`);
          $(div).append(collapse);
          const body = $.parseHTML(`<div class="var_dump"></div>`);
          $(collapse).append(body);
          for (const i in data) {
            agua85.var_dump(data[i], body);
          }

          $(result).append(div);
        } else {
          let div;
          if (key) {
            div = $.parseHTML(`<p>${key}: <button class="btn btn-info m-2" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">>Detail</button> </p>`);
          } else {
            div = $.parseHTML(`<p>object: <button class="btn btn-info m-2" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">>Detail</button> </p>`);
          }
          const collapse = $.parseHTML(`<div class="collapse" id="${id}"></div>`);
          $(div).append(collapse);
          const body = $.parseHTML(`<div class="var_dump"></div>`);
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
