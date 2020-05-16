/**
 * This script block is injected into the page to replace text.
 */
{
  const replaceAllTextOnPage = function () {};
  
  
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
