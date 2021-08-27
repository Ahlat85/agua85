const agua85 = {
  sort_list: list_parent => {
    list_parent = $(list_parent)
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
    })
  }
}