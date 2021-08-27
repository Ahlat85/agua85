const agua85 = {
  init: () => {
    const head = document.getElementsByTagName("head")[0];
    const body = document.getElementsByTagName("body")[0];
    
    const styles = [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    ];
    const scripts = [
      "https://code.jquery.com/jquery-3.6.0.js"
    ];
    
    styles.forEach(e => {
      e = agua85.str_to_html(`<link rel="stylesheet" href="${e}">`);
      head.prepend(e);
    });
    
    scripts.forEach(e => {
      e = agua85.str_to_html(`<script src=${e}"></script>`);
      body.prepend(e);
    });
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