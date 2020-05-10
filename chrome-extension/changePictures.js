{
  /**
   * Shuffles array
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
   * Replaces all images from img tags and "background-image" css attributes
   * @param {String} newImg An image url to be used as the replacement
   */
  const replaceImages = function (
    newImg = "https://memegen.link/bad/get_back_to_work/lazy_bum.jpg",
    interval = 200
  ) {
    // Replace images specified by img tags
    const imgTagElements = Array.from(document.querySelectorAll("img"));
    shuffle(imgTagElements);
    let timer = 0;
    for (const imgTagElement of imgTagElements) {
      setTimeout(() => {
        console.log(imgTagElement);
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
    shuffle(backgroundImageElements);
    let timer2 = 0;
    for (const bgImageElement of backgroundImageElements) {
      setTimeout(() => {
        bgImageElement.style.backgroundImage = `url("${newImg}")`;
      }, timer2);
      timer2 += interval;
    }
  };

  // Replacement of jQuery's document.ready
  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  ready(replaceImages(undefined, 100));
}
