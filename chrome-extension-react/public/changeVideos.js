/**
 * This script block is injected into the page to replace videos.
 */
{
  let newVideoGlobal = "https://rickrolled.fr/rickroll.mp4";
  let newImageGlobal =
    "https://memegen.link/bad/browsing_this_site_is_bad/and_you_should_feel_bad.jpg";

  // Listen for message from background.js to set the video and img url
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setImageUrl") {
      console.log("Got message from background to set image");
      newImageGlobal = request.imageUrl;
    }
    if (request.action === "setVideoUrl") {
      console.log("Got message from background to set video");
      newVideoGlobal = request.videoUrl;
    }
  });

  /**
   * Replaces src and similar attributes in video elements.
   */
  const replaceVideoTagSrc = function (videoTagElement, newVideo) {
    videoTagElement.setAttribute("muted", true);
    videoTagElement.setAttribute("src", newVideo);
    videoTagElement.setAttribute("autoplay", true);
    videoTagElement.setAttribute("poster", newImageGlobal);
    videoTagElement.removeAttribute("focuspocused");
  };

  /**
   * Replaces all videos from video tags and on the current page.
   * @param {String} newVideo An image url to be used as the replacement
   */
  const replaceAllVideosOnPage = function (
    interval = 0 // Immediately replace videos for now
  ) {
    replaceElementsOnPage(
      "video",
      newVideoGlobal,
      replaceVideoTagSrc,
      interval
    );
    replaceElementsOnPage(
      "iframe[allowfullscreen]",
      newVideoGlobal,
      replaceVideoTagSrc,
      interval
    );
  };

  // Wait 5 seconds after page is loaded then start replacing videos
  ready(() => {
    setTimeout(() => {
      replaceAllVideosOnPage();

      // Set up listener for DOM changes (infinite scroll websites)
      addListeners(
        "body",
        () => {
          replaceAllVideosOnPage();
        },
        5000,
        false
      );
    }, 5000);
  });
}
