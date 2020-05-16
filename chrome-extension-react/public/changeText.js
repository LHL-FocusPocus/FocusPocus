/**
 * This script block is injected into the page to replace text.
 */
{
  const replaceTextContent = function (textTagElement, newText) {
    textTagElement.textContent = newText;
  };

  const replaceAllTextOnPage = function () {
    replaceElementsOnPage(
      "p, span, h1, h2, h3, h4, h5, h6",
      "Get back to work!",
      replaceTextContent,
      300
    );
  };

  ready(() => {
    setTimeout(() => {
      replaceAllTextOnPage();

      // Set up listener for DOM changes (infinite scroll websites) and clicks
      // (instagram like button)
      addListeners("body", () => {
        replaceAllTextOnPage();
      });
    }, 3000);
  });
}
