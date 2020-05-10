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
}
