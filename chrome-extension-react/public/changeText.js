/**
 * This script block is injected into the page to replace text.
 */
{
  const replaceTextContentLoop = function (textTagElement, newText) {
    const existingText = textTagElement.textContent;
    const existingWords = shuffle([...new Set(existingText.split(" "))]);
    const thresholdLength = existingWords.length / 2;
    const replacementWords = [...new Set(newText.split(" "))];
    let replacementText = existingText;
    let timer = 0;
    while (existingWords.length > thresholdLength) {
      const randomWord = existingWords.pop();
      setTimeout(() => {
        replacementText = replacementText.replace(randomWord, "snake");
        textTagElement.textContent = replacementText;
      }, timer);
      timer += 4000;
    }
  };

  const replaceAllTextOnPage = function () {
    replaceElementsOnPage(
      "p, span, h1, h2, h3, h4, h5, h6",
      "Get back to work!",
      replaceTextContentLoop,
      0
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
    }, 0);
  });
}
