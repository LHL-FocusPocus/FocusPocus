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
    const videoTagElements = document.querySelectorAll("video");
    for (const videoTagElement of videoTagElements) {
      replaceVideoTagSource(videoTagElement, newVideo);
    }
  };

  // Wait 5 seconds after page is loaded then start replacing images
  ready(() => {
    setTimeout(() => {
      replaceAllVideosOnPage();
    }, 5000);
  });
}
