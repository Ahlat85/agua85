const agua85 = {
  init: () => {
    const styles = [
      ["https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css", "bootstrap"]
    ];
    const scripts = [
      ["https://code.jquery.com/jquery-3.6.0.js", "jquery"]
    ];
    
    styles.forEach(e => agua85.css.load(e[1], e[0]));
    
    scripts.forEach(e => agua85.js.load(e[1], e[0]));
  },
  css: {
    load: (name, src) => {
      const data = agua85.str_to_html(`<link style-name="${name}" rel="stylesheet" href="${src}">`);
      document.getElementsByTagName("head")[0].append(data);
    },
    get: (name=undefined) => {
      if (name) {
        return $(`link[style-name=${name}]`);
      } else {
        return $(`link`);
      }
    }
  },
  js: {
    load: (name, src) => {
      const data = agua85.str_to_html(`<script script-name="${name}" src=${src}"></script>`);
      document.getElementsByTagName("body")[0].append(data);
    },
    get: (name=undefined) => {
      if (name) {
        return $(`script[script-name=${name}]`);
      } else {
        return $(`script`);
      }
    }
  },
  str_to_html: str => {
    const div = document.createElement("div");
    const data = document.createDocumentFragment();
    
    div.innerHTML = str;
    let i;
    while (i=div.firstChild) {
      data.appendChild(i);
    }
    
    return data;
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
    if (lists_parent instanceof HTMLUListElement) {
      agua85.sort_list(lists_parent);
      return;
    }
    $.each(lists_parent, (i, e) => {
      agua85.sort_list(e)
    });
  }
}

agua85.init();