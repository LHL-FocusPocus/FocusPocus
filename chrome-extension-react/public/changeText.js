/**
 * This script block is injected into the page to replace text.
 */
{
  const replaceTextContent = function (textTagElement, newText) {
    // Get text, split into words with lexer, tag with postagger
    const existingText = textTagElement.textContent;
    const existingWords = new Lexer().lex(existingText);
    const taggedWords = new POSTagger().tag(existingWords);

    // extract nouns
    const nouns = [];
    taggedWords.forEach(taggedWord => {
      if (taggedWord[1] === "NN") {
        nouns.push(taggedWord[0]);
      }
    });

    const nounSet = [...new Set(nouns)];
    // Randomize wordset order
    const shuffledNounSet = shuffle(nounSet);

    // Stop when 25% of nouns are replaced
    const thresholdLength = shuffledNounSet.length * 0.75;

    // Replace a random word with "snake" every few seconds
    let replacementText = existingText;
    let timer = 0;
    while (shuffledNounSet.length > thresholdLength) {
      const randomWord = shuffledNounSet.pop();
      setTimeout(() => {
        replacementText = replacementText.replace(randomWord, "snake");
        textTagElement.textContent = replacementText;
      }, timer);
      timer += 500;
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
