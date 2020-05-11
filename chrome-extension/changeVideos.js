{
  /**
   * Replaces src and similar attributes in video elements.
   */
  const replaceVideoTagSource = function (videoTagElement, newVideo) {
    videoTagElement.setAttribute("src", newVideo);
    videoTagElement.setAttribute("autoplay", true);
  };

  const replaceAllVideosOnPage = function (
    newVideo = "https://rickrolled.fr/rickroll.mp4"
  ) {
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

  // Wait 5 seconds after page is loaded then start replacing images
  ready(() => {
    setInterval(() => {
      replaceAllVideosOnPage();
    }, 5000);
  });
}
