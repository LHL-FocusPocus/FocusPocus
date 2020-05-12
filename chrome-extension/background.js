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

let timerInSeconds = 0;

setInterval(() => {
  timerInSeconds++;
  console.log(timerInSeconds);
}, 1000);

let lastDomain;

// Triggers when page loads in current tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    handleBrowsing(tabId);
    changePictures(tabId);
  }
});

// Triggers when user goes to a different tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  handleBrowsing(activeInfo.tabId);
});

/**
 * Function that is to be called when user navigates to a new site. Resets
 * the timer and gets the url.
 * @param {Number} tabId
 */
function handleBrowsing(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    console.log("domain was at", lastDomain);
    console.log("timer was at", timerInSeconds);
    console.log("tab is now", tabId);
    console.log("domain is now", tab.url);
    lastDomain = tab.url;
    timerInSeconds = 0;
  });
}

function getDomainFromCurrentTab() {
  let domain;
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    // Will be null on chrome settings page etc
    if (!tabs[0] || !tabs[0].url) {
      domain = "other";
    }
    const url = new URL(tabs[0].url);
    domain = url.hostname.split("www.").join("");
  });
  return domain;
}

/**
 * Checks if current tab's url is on the blacklist then injects content
 * replacement scripts.
 * @param {Number} tabId - The id of the current tab
 * @param {[String]} blackList - A list of blacklisted website domains
 */
function changePictures(
  tabId,
  blackList = [
    "reddit.com",
    "facebook.com",
    "tsn.ca",
    "instagram.com",
    "pinterest.ca",
    "youtube.com",
  ]
) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    // Will be null on chrome settings page etc
    if (!tabs[0] || !tabs[0].url) {
      return;
    }
    const url = new URL(tabs[0].url);
    const domain = url.hostname.split("www.").join("");

    if (blackList.includes(domain)) {
      chrome.tabs.executeScript(tabId, { file: "helpers.js" });

      // These can be run conditionally depending on user options
      chrome.tabs.executeScript(tabId, { file: "changePictures.js" });
      chrome.tabs.executeScript(tabId, { file: "changeVideos.js" });
    }
  });
}
