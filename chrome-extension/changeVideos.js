{
  let newVideoGlobal = "https://rickrolled.fr/rickroll.mp4";
  /**
   * Replaces src and similar attributes in video elements.
   */
  const replaceVideoTagSrc = function (videoTagElement, newVideo) {
    videoTagElement.setAttribute("src", newVideo);
    videoTagElement.setAttribute("autoplay", true);
    videoTagElement.removeAttribute("focuspocused");
  };

  /**
   * Replaces all videos from video tags and on the current page.
   * @param {String} newVideo An image url to be used as the replacement
   */
  const replaceAllVideosOnPage = function (
    newVideo = newVideoGlobal,
    interval = 0 // Immediately replace videos for now
  ) {
    replaceElementsOnPage("video", newVideo, replaceVideoTagSrc, interval);
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
        true
      );
    }, 5000);
  });
}
