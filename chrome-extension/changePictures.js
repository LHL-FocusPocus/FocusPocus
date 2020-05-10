{
  /**
   * Shuffles array
   * @param {Array} array An array containing the items.
   */
  const shuffle = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Gets the element height (from http://youmightnotneedjquery.com/)
  const getHeight = function (element) {
    return parseFloat(getComputedStyle(element, null).height.replace("px", ""));
  };

  // Function used to select only images to be changed. Min height is the
  // only criteria for now
  const filterElements = function (element, minHeight = 100) {
    return getHeight(element) > minHeight;
  };

  /**
   * Replaces all images from img tags and "background-image" css attributes
   * @param {String} newImg An image url to be used as the replacement
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
    let timer = 0;
    for (const imgTagElement of filteredImgTagElements) {
      setTimeout(() => {
        imgTagElement.setAttribute("src", newImg);
        imgTagElement.setAttribute("data-src", newImg);
      }, timer);
      timer += interval;
    }

    // Replace images specified by background-image css
    const backgroundImageElements = Array.from(
      document.querySelectorAll(
        // *= matches all style attribute containing "background-image" in its value
        '[style*="background-image"]'
      )
    );
    const filteredBackgroundImageElements = backgroundImageElements.filter(
      (element) => filterElements(element)
    );
    shuffle(filteredBackgroundImageElements);
    let timer2 = 0;
    for (const bgImageElement of filteredBackgroundImageElements) {
      setTimeout(() => {
        bgImageElement.style.backgroundImage = `url("${newImg}")`;
      }, timer2);
      timer2 += interval;
    }
  };

  // Replacement of jQuery's document.ready
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
