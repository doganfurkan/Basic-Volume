(function () {
  if (window.hasVolumeBooster) return;
  window.hasVolumeBooster = true;

  function boostVolume(element, gainValue) {
    if (!element.audioContext) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = gainValue;
  
      const source = audioCtx.createMediaElementSource(element);
      source.connect(gainNode);
      gainNode.connect(audioCtx.destination);
  
      element.audioContext = { audioCtx, gainNode };
  
      if (audioCtx.state === "suspended") {
        document.addEventListener(
          "click",
          () => {
            audioCtx.resume();
          },
          { once: true }
        );
      }
    } else {
      element.audioContext.gainNode.gain.value = gainValue;
    }
  }
  
  function applyBoost(gainValue) {
    document.querySelectorAll("audio, video").forEach((element) => {
      boostVolume(element, gainValue);
    });
  }

  chrome.storage.local.get("globalVolume", (data) => {
    const volume = data.globalVolume ?? 2.0;
    applyBoost(volume);
  });

  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "setVolumeBoost") {
      applyBoost(request.value);
    }
  });
})();
