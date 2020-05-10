{
  /**
   * Shuffles the provided array.
   * @param {Array} array An array containing the items.
   */
  const shuffle = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  /**
   * Gets the element height (from http://youmightnotneedjquery.com/)
   */
  const getHeight = function (element) {
    return parseFloat(getComputedStyle(element, null).height.replace("px", ""));
  };

  /**
   * Function used to filter for only images to be changed. Min height is the
   * only criteria for now.
   * @param {Object} element
   * @param {Number} minHeight
   * @return Returns true if image fits criteria and needs to be changed
   */
  const filterElements = function (element, minHeight = 50) {
    return getHeight(element) > minHeight;
  };

  /**
   * Replaces src and similar attributes in img elements.
   */
  const replaceImgTagSource = function (imgTagElement, newImg) {
    imgTagElement.setAttribute("src", newImg);
    imgTagElement.setAttribute("data-src", newImg);
    imgTagElement.setAttribute("srcset", newImg);
  };

  /**
   * Replaces url of each background-image css attribute in elements that have
   * the background-image attribute.
   */
  const replaceBgImgTagSource = function (bgImageTagElement, newImg) {
    bgImageTagElement.style.backgroundImage = `url("${newImg}")`;
  };

  /**
   * Replaces all images from img tags and "background-image" css attributes
   * on the current page in a set interval.
   * @param {String} newImg An image url to be used as the replacement
   * @param {Number} interval Milliseconds between each image getting replaced
   */
  const replaceImages = function (
    newImg = "https://memegen.link/bad/get_back_to_work/lazy_bum.jpg",
    interval = 300
  ) {
    // Replace images specified by img tags
    const imgTagElements = Array.from(document.querySelectorAll("img"));
    // Filter out small-sized images
    const filteredImgTagElements = imgTagElements.filter((element) =>
      filterElements(element)
    );
    shuffle(filteredImgTagElements);

    // Replace them in a set time interval
    let timer = 0;
    for (const imgTagElement of filteredImgTagElements) {
      setTimeout(() => {
        replaceImgTagSource(imgTagElement, newImg);
      }, timer);
      timer += interval;
    }

    // Replace images specified by background-image css
    const bgImageElements = Array.from(
      document.querySelectorAll(
        // *= matches all style attributes containing "background-image"
        // in its value
        '[style*="background-image"]'
      )
    );

    // Ignore very small images
    const filteredBgImageElements = bgImageElements.filter((element) =>
      filterElements(element)
    );
    shuffle(filteredBgImageElements);
    let timer2 = 0;
    for (const bgImageTagElement of filteredBgImageElements) {
      setTimeout(() => {
        replaceBgImgTagSource(bgImageTagElement, newImg);
      }, timer2);
      timer2 += interval;
    }
  };

  /**
   * Replacement of jQuery's document.ready (from http://youmightnotneedjquery.com/)
   * @param {Function} fn The function to call when document is ready
   */
  const ready = function (fn) {
    console.log("function", fn);
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  };
  ready(replaceImages);
}
