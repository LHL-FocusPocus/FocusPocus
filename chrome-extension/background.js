// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            // Make extension active on all webpages
            pageUrl: { schemes: ["https", "http"] },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

// Triggers when page loads in current tabl
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    chrome.tabs.executeScript(tabId, { file: "changePictures.js" });
  }
});

// Triggers when user goes to a different tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.executeScript(activeInfo.tabId, { file: "changePictures.js" });
});
