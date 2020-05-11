{
  console.log("executing changePictures");

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
  const replaceAllImagesOnPage = function (
    newImg = "https://memegen.link/bad/get_back_to_work/you_lazy_bum.jpg",
    interval = 300
  ) {
    // Replace images specified by img tags
    const imgTagElements = Array.from(document.querySelectorAll("img"));
    // Filter out small-sized images and already processed images
    const filteredImgTagElements = imgTagElements.filter((element) =>
      filterElements(element, newImg)
    );
    tagElementsForReplacement(filteredImgTagElements);
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
      filterElements(element, newImg)
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

  // Wait 3 seconds after page is loaded then start replacing images
  ready(() => {
    setInterval(() => {
      replaceAllImagesOnPage();
    }, 3000);
  });
}
