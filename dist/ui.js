"use strict";
function postToPlugin(message) {
    parent.postMessage({ pluginMessage: message }, "*");
}
function init() {
    const generateButton = document.getElementById("generate");
    const closeButton = document.getElementById("close");
    generateButton === null || generateButton === void 0 ? void 0 : generateButton.addEventListener("click", () => {
        postToPlugin({ type: "generate-icons" });
    });
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener("click", () => {
        postToPlugin({ type: "close-plugin" });
    });
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
}
else {
    init();
}
