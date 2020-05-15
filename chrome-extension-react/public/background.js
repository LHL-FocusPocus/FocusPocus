// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ color: "#3aa757" }, function () {
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

// Increment timer and store current value inside chrome to be used by UI
setInterval(() => {
  timerInSeconds++;
  chrome.storage.local.set({ timerInSeconds });
}, 1000);

let lastDomain;
let isOverQuota = false;
let blacklistDomains = [];
getUserData();

/**
 * GET request to the server to retrieve userData
 */
function getUserData() {
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:9000/api/data/dashboard", true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      const data = JSON.parse(this.response);
      console.log(data);
      parseAndStoreUserData(data);
    } else {
      const error = JSON.parse(this.response);
      console.log(error);
    }
  };
  request.onerror = function () {
    console.log("Could not connect to server");
  };
  request.send();
}

function parseAndStoreUserData(userData) {
  // Extract used and allotted quotas to determine if quota is exceeded
  const {
    quota_today: {
      allotment: { hours: quota_allotment_hours },
      used: { minutes: used_minutes },
    },
    blacklist: blacklistObj,
  } = userData;
  if (used_minutes / 60 > quota_allotment_hours) {
    isOverQuota = true;
  }

  // Map blacklists into array of domain names
  blacklistDomains = blacklistObj.map((blacklist) => blacklist.hostname);
  console.log(blacklistDomains);
}

// Triggers when page loads in current tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    handleBrowsing(tabId);
    changePictures(tabId, blacklistDomains);
  }
});

// Triggers when user goes to a different tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  handleBrowsing(activeInfo.tabId);
});

/**
 * Function that is to be called when user clicks a new tab or visits a new
 * page in the current tab. Gets the url and current timer to make POST
 * request to add browsing time to db. Resets the timer.
 * @param {Number} tabId
 */
function handleBrowsing(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    // tab.url will be undefined on chrome settings page etc.
    const currentDomain = tab.url ? getDomainFromUrl(tab.url) : undefined;
    // console.log(`domain was at ${lastDomain} for ${timerInSeconds} seconds`);
    postBrowseTime(lastDomain, timerInSeconds);
    lastDomain = currentDomain;
    timerInSeconds = 0;
    chrome.storage.local.set({ timerInSeconds });
    //login(); // uncomment if you want to login
  });
}

/**
 * Sends post request to server to add the browse session to browse_times table
 */
function postBrowseTime(hostName, durationInSeconds) {
  const request = new XMLHttpRequest();
  request.open(
    "POST",
    "http://localhost:9000/api/extension/add_browse_time",
    true
  );
  request.onload = function () {
    const data = JSON.parse(this.response);

    if (this.status >= 200 && this.status < 400) {
      console.log(data);
    } else {
      console.log(data);
    }
  };
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({ hostName, durationInSeconds }));
}

/**
 * Logs into the server
 */
function login() {
  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:9000/api/user/login", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({ email: "a@a.com", password: "password" }));
}

function getDomainFromUrl(url) {
  const urlObj = new URL(url);
  const domain = urlObj.hostname.split("www.").join("");
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
