/*global chrome*/
export function getCurrentTab(callback) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      callback(tabs[0]);
    }
  );
}

export function getCurrentTimer(callback) {
  chrome.storage.local.get("timerInSeconds", function (data) {
    callback(data.timerInSeconds);
  });
}

export function recheckTab() {
  chrome.runtime.sendMessage({ action: "recheck" });
}
