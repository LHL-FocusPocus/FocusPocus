/**
 * This script block is injected into the page to replace text.
 */
{
  const replaceTextContent = function (textTagElement, newText) {
    const existingText = textTagElement.textContent;
    const existingWordSet = [...new Set(existingText.split(" "))];
    const regex = /^[a-z]/;
    const filteredWordSet = existingWordSet.filter(word => regex.test(word));
    const shuffledWordSet = shuffle(filteredWordSet);

    // Stop when 15% of words are replaced
    const thresholdLength = shuffledWordSet.length * 0.85;
    // const replacementWords = [...new Set(newText.split(" "))];
    let replacementText = existingText;
    let timer = 0;
    while (shuffledWordSet.length > thresholdLength) {
      const randomWord = shuffledWordSet.pop();
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
      replaceTextContent,
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
