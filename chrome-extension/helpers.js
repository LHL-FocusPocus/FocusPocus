{
  /**
   * Replacement of jQuery's document.ready (from youmightnotneedjquery.com).
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
   * @param {Array} array An array containing the items
   */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Gets the element height (from http://youmightnotneedjquery.com/).
   */
  function getHeight(element) {
    const height = parseFloat(
      getComputedStyle(element, null).height.replace("px", "")
    );
    return height;
  }

  /**
   * Function used to filter for only images/videos that need to be replaced.
   * Excludes elements already replaced, and also small icon-sized images.
   * @param {Object} element   
   * @param {Number} minHeight
   * @return Returns true if image fits criteria (needs to be changed)
   */
  function shouldBeReplaced(element, minHeight = 50) {
    return (
      !element.getAttribute("focuspocused") &&
      getHeight(element) > minHeight
    );
  }

  /**
   * Tags a list of elements to let script know that they have already been
   * queued for replacement.
   */
  function tagElementsForReplacement(elements) {
    for (element of elements) {
      element.setAttribute("focuspocused", true);
    }
  }

  /**
   * Modifies the cb function so it is called max of once every [delay] ms.
   */
  function debounce(cb, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => cb(...args), delay);
    };
  }

  /**
   * Set up listener for DOM change event when new elements are added, such
   * as on sites with infinite scrolling.
   * @param {String} element The parent element to listen for changes
   * @param {Function} cb The callback function
   */
  function onNewElementLoaded(element, cb) {
    const targetNode = document.querySelector(element);
    const observerOptions = {
      childList: true,
      subtree: true,
    };
    const observer = new MutationObserver(
      // Debounce cb so it runs maximum of once every 0.5 s
      debounce(() => {
        cb();
      }, 500)
    );
    observer.observe(targetNode, observerOptions);
  }
}
