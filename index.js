document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("globalVolume", (data) => {
    updateRange("volumeRange", Number(data.globalVolume * 100) ?? 100);
  });
});

document.querySelectorAll("input[type=range]").forEach((range) => {
  range.addEventListener("input", (e) => {
    updateRange(range.id, range.value);
  });
});

document.querySelectorAll("input[type=number]").forEach((input) => {
  input.addEventListener("input", (e) => {
    updateRange(input.name, input.value);
  });
});

document.querySelectorAll(".resetButton").forEach((reset) => {
  reset.addEventListener("click", (e) => {
    updateRange(`${reset.id}olumeRange`, 100);
  });
});

updateRange = (id, value) => {
  document.getElementById(id).style.setProperty("--value", `${value / 6}%`);
  document.getElementById(id).value = value;
  document.querySelector(`input[type=number][name=${id}]`).value = value;
  var volume = parseFloat(value / 100);
  chrome.storage.local.set({ globalVolume: volume });

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        action: "setVolumeBoost",
        value: volume,
      });
    });
  });
};
