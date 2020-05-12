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

  function replaceElementsOnPage(
    elementTag,
    newUrl,
    replacementFn,
    interval = 0
  ) {
    // Replace images specified by tag
    const elements = Array.from(document.querySelectorAll(elementTag));

    // Filter out small-sized elements and already processed elements
    const elementsToBeReplaced = elements.filter((element) =>
      shouldBeReplaced(element, newUrl)
    );
    tagElementsForReplacement(elementsToBeReplaced);
    shuffle(elementsToBeReplaced);

    // Replace elements in a set time interval
    let timer = 0;
    for (const element of elementsToBeReplaced) {
      setTimeout(() => {
        replacementFn(element, newUrl);
      }, timer);
      timer += interval;
    }
  }

  /**
   * Function used to filter for only images/videos that need to be replaced.
   * Excludes elements already replaced, and also small icon-sized images.
   * @param {Object} element
   * @param {Number} minHeight
   * @return Returns true if image fits criteria (needs to be changed)
   */
  function shouldBeReplaced(element, newUrl, minHeight = 50) {
    return (
      !element.getAttribute("focuspocused") &&
      getHeight(element) > minHeight &&
      ((element.getAttribute("src") && element.getAttribute("src") != newUrl) ||
        (element.style.backgroundImage &&
          !element.style.backgroundImage.includes(newUrl)))
    );
  }

  /**
   * Adds the "focuspocused" attribute to a list of elements to let script
   * know that they have already been queued for replacement.
   */
  function tagElementsForReplacement(elements) {
    for (element of elements) {
      element.setAttribute("focuspocused", true);
    }
  }

  /**
   * Modifies the cb function so it only gets called if it doesn't get called
   * in [delay] ms. Replaced with throttle as it makes more sense.
   */
  function debounce(cb, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => cb(...args), delay);
    };
  }

  /**
   * Modifies the cb function so it is called max of once every [limit] ms.
   * @param {Function} cb The callback
   * @param {Number} limit The limit in milliseconds
   */
  function throttle(cb, limit) {
    let isInThrottle;
    return (...args) => {
      if (!isInThrottle) {
        cb(...args);
        isInThrottle = true;
        setTimeout(() => (isInThrottle = false), limit);
      }
    };
  }

  /**
   * Set up listener for DOM change event when new elements are added, such
   * as on sites with infinite scrolling. Also listens for clicks.
   * @param {String} element The parent element to listen for changes
   * @param {Function} cb The callback function
   * @param {Number} minInterval Time in ms to use for throttling/debounce
   * @param {Boolean} useDebounce Set to true to guarantee min delay delay
   */
  function addListeners(
    element,
    cb,
    minInterval = 1000,
    useDebounce = false
  ) {
    const targetNode = document.querySelector(element);
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true,
    };
    let observer;
    if (useDebounce) {
      observer = new MutationObserver(
        debounce(() => {
          cb();
        }, minInterval)
      );
    } else {
      observer = new MutationObserver(
        // Throttle cb so it runs maximum of once every second instead of on
        // every element added, which could be dozens of times per second
        throttle(() => {
          cb();
        }, minInterval)
      );
    }
    observer.observe(targetNode, observerOptions);

    // Add click listener to solve instagram like-button bug
    targetNode.addEventListener("click", () => {
      debounce(() => {
        cb();
      }, minInterval);
    });
  }
}
