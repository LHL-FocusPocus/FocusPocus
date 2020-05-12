{
  let newVideoGlobal = "https://rickrolled.fr/rickroll.mp4";
  /**
   * Replaces src and similar attributes in video elements.
   */
  const replaceVideoTagSource = function (videoTagElement, newVideo) {
    videoTagElement.setAttribute("src", newVideo);
    videoTagElement.setAttribute("autoplay", true);
  };

  /**
   * Replaces all videos from video tags and on the current page.
   * @param {String} newVideo An image url to be used as the replacement
   */
  const replaceAllVideosOnPage = function (newVideo = newVideoGlobal) {
    const videoTagElements = Array.from(document.querySelectorAll("video"));

    // Exclude already-replaced videos from being altered
    const filteredVideoTagElements = videoTagElements.filter(
      (element) => element.getAttribute("src") != newVideo
    );
    tagElementsForReplacement(filteredVideoTagElements);
    for (const videoTagElement of filteredVideoTagElements) {
      replaceVideoTagSource(videoTagElement, newVideo);
    }
  };

  // Wait 5 seconds after page is loaded then start replacing videos
  ready(() => {
    setTimeout(() => {
      replaceAllVideosOnPage();

      // Set up listener for DOM changes (infinite scroll websites)
      onNewElementLoaded("body", replaceAllVideosOnPage);
    }, 5000);
  });
}
