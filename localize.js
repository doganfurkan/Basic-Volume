if (localStorage.getItem("prefferedLanguage") === null) {
  localStorage.setItem("prefferedLanguage", "default");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-i18n]").forEach(async (el) => {
    const messageKey = el.getAttribute("data-i18n");
    var localizedText = await localize(messageKey);
    if (localizedText) {
      if (el.hasAttribute("placeholder")) {
        el.setAttribute("placeholder", localizedText);
      } else {
        el.innerText = localizedText;
      }
    }
  });
  document.documentElement.setAttribute(
    "dir",
    localStorage.getItem("prefferedLanguage") === "ar" ? "rtl" : "ltr"
  );
});

async function localize(messageKey) {
  var localized;
  if (localStorage.getItem("prefferedLanguage") === "default" || messageKey === "defaultLanguage") {
    localized = chrome.i18n.getMessage(messageKey);
  } else {
    await fetch(
      chrome.runtime.getURL(
        `_locales/${localStorage.getItem("prefferedLanguage")}/messages.json`
      )
    )
      .then((response) => response.json())
      .then((messages) => {
        localized = messages[messageKey].message;
      });
  }
  checkRTL();
  return localized;
}

function checkRTL() {
  if (localStorage.getItem("prefferedLanguage") === "ar") {
    document.body.style.direction = "rtl";
  } else {
    document.body.style.direction = "ltr";
  }
}
