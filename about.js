document.getElementById("copyEmail").addEventListener("click", copyEmail);

document.querySelector("[value='" + localStorage.getItem("prefferedLanguage") + "']").selected = true;

document.getElementById("languageSelect").addEventListener("change", function() {
  var language = this.value;
  localStorage.setItem("prefferedLanguage", language);
  location.reload();
});

document.getElementById("version").textContent = "v" + chrome.runtime.getManifest().version;

function copyEmail() {
  const email = "devfurk@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    alert("Email copied to clipboard");
  });
}