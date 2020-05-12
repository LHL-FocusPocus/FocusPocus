{
  let newImgGlobal =
    "https://memegen.link/bad/get_back_to_work/you_lazy_bum.jpg";

  /**
   * Replaces src and similar attributes in img elements.
   */
  const replaceImgTagSrc = function (imgTagElement, newImg) {
    imgTagElement.setAttribute("src", newImg);
    imgTagElement.setAttribute("data-src", newImg);
    imgTagElement.setAttribute("srcset", newImg);
    imgTagElement.removeAttribute("focuspocused");
  };

  /**
   * Replaces url of each background-image style attribute
   */
  const replaceBgImgStyleUrl = function (bgImageTagElement, newImg) {
    bgImageTagElement.style.backgroundImage = `url("${newImg}")`;
  };

  /**
   * Replaces all images from img tags and "background-image" style attribute
   * on the current page in a set interval.
   * @param {String} newImg An image url to be used as the replacement
   * @param {Number} interval Milliseconds between each image getting replaced
   */
  const replaceAllImagesOnPage = function (
    newImg = newImgGlobal,
    interval = 300
  ) {
    console.log("called");
    // Replace images specified by img tags
    replaceElementsOnPage("img", newImg, replaceImgTagSrc, interval);

    // Replace images specified by background-image css
    replaceElementsOnPage(
      '[style*="background-image"]',
      newImg,
      replaceBgImgStyleUrl,
      interval
    );
  };

  // Wait 3 seconds after page is loaded then start replacing images
  ready(() => {
    setTimeout(() => {
      replaceAllImagesOnPage();

      // Set up listener for DOM changes (infinite scroll websites)
      onNewElementLoaded("body", () => {
        replaceAllImagesOnPage();
      });
    }, 3000);
  });
}
