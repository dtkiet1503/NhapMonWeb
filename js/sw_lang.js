jQuery(function () {
  let lang = getLang()
  changeLang(lang)
})

function changeLang(lang) {
  $(".multilang").each((index, element) => {
    let elementNode = $(element)
    let id = elementNode.prop("id");
    let label = labels[id][lang];
    // Neu la nut submit thi thay doi value
    if(elementNode.is("input[type=submit]")) {
        elementNode.val(label)
    }
    // Neu la input khong phai submit thi thay doi placeholder
    else if(elementNode.is("input")) {
        elementNode.attr("placeholder", label)
    }
    else {
        elementNode.html(label);
    }
  })
  setLang(lang); // set item in local storage
}

function setLang(lang) {
  window.localStorage.setItem("lang", lang);
}

function getLang() {
  if (!window.localStorage.getItem("lang")) {
    setLang("vi-VN"); // dat ngon ngu mac dinh khi truy cap trang web lan dau
  }
  return window.localStorage.getItem("lang");
}
