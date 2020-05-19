/**
 * This script block is injected into the page to replace images.
 */
{
  let newImageGlobal =
    "https://memegen.link/bad/browsing_this_site_is_bad/and_you_should_feel_bad.jpg";

  // Listen for message from background.js to set the img url
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setImageUrl") {
      console.log("Got message from background");
      newImageGlobal = request.imageUrl;
    }
  });
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
    bgImageTagElement.removeAttribute("focuspocused");
  };

  /**
   * Replaces all images from img tags and "background-image" style attribute
   * on the current page in a set interval.
   * @param {String} newImg An image url to be used as the replacement
   * @param {Number} interval Milliseconds between each image getting replaced
   */
  const replaceAllImagesOnPage = function (interval = 300) {
    // Replace images specified by img tags
    replaceElementsOnPage("img", newImageGlobal, replaceImgTagSrc, interval);

    // Replace images specified by background-image css
    replaceElementsOnPage(
      '[style*="background-image"]',
      newImageGlobal,
      replaceBgImgStyleUrl,
      interval
    );
  };

  // Wait 3 seconds after page is loaded then start replacing images
  ready(() => {
    setTimeout(() => {
      replaceAllImagesOnPage();

      // Set up listener for DOM changes (infinite scroll websites) and clicks
      // (instagram like button)
      addListeners("body", () => {
        replaceAllImagesOnPage();
      });
    }, 3000);
  });
}
