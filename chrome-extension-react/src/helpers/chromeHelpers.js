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
  chrome.storage.sync.get("timerInSeconds", function (data) {
    callback(data.timerInSeconds);
  });
}
