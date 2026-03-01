function postToPlugin(message: unknown) {
  parent.postMessage({ pluginMessage: message }, "*");
}

function init() {
  const generateButton = document.getElementById("generate");
  const closeButton = document.getElementById("close");

  generateButton?.addEventListener("click", () => {
    postToPlugin({ type: "generate-icons" });
  });

  closeButton?.addEventListener("click", () => {
    postToPlugin({ type: "close-plugin" });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

