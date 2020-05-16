/**
 * This script block is injected into the page to replace text.
 */
{
  const replaceTextContent = function (textTagElement, newText) {
    textTagElement.textContent = newText;
  };

  const replaceAllTextOnPage = function () {
    replaceElementsOnPage("p", "Get back to work!", replaceTextContent, 0);
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
