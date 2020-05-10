{
  /**
   * Replacement of jQuery's document.ready (from http://youmightnotneedjquery.com/)
   * @param {Function} fn The function to call when document is ready
   */
  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  /**
   * Shuffles the provided array.
   * @param {Array} array An array containing the items.
   */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Gets the element height (from http://youmightnotneedjquery.com/)
   */
  function getHeight(element) {
    return parseFloat(getComputedStyle(element, null).height.replace("px", ""));
  }

  /**
   * Function used to filter for only images/videos that need to be changed.
   * Excludes images that have already been changed, and also small icon images
   * @param {Object} element
   * @param {String} newUrl The url of the replacement image or video
   * @param {Number} minHeight
   * @return Returns true if image fits criteria (needs to be changed)
   */
  function filterElements(element, newUrl, minHeight = 50) {
    return (
      getHeight(element) > minHeight &&
      ((element.getAttribute("src") && element.getAttribute("src") != newUrl) ||
        (element.style.backgroundImage &&
          !element.style.backgroundImage.includes(newUrl)))
    );
  }
}
