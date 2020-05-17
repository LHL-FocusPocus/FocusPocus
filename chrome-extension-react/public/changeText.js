/**
 * This script block is injected into the page to replace text.
 */
{
  /**
   * Further filtering for the nouns that postagger gives
   * @param {String} noun The word that postagger thinks is a noun
   * @return True if noun should survive the filtering
   */
  const nounFilter = function (noun) {
    // Require at least 3 letters to eliminates buggy noun tagging
    const regex = /^[a-z]{3,}/i;
    return regex.test(noun);
  };

  const replaceTextContent = function (textTagElement, newText) {
    // Get text, split into words with lexer, tag with postagger
    const existingText = textTagElement.textContent;
    const existingWords = new Lexer().lex(existingText);
    const taggedWords = new POSTagger().tag(existingWords);

    // Extract nouns by looking at the tag
    const nouns = [];
    taggedWords.forEach(taggedWord => {
      if (taggedWord[1] === "NN") {
        nouns.push(taggedWord[0]);
      }
    });

    // Deduplicates and further filter nouns
    const nounSet = [...new Set(nouns)];
    const filteredNounSet = nounSet.filter(nounFilter);

    // Randomize wordset order
    const shuffledNounSet = shuffle(filteredNounSet);

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

      // Testing the tagger
      var lexer = new Lexer();
      const lexedWords = lexer.lex(
        "Why ‘Pushing Daisies’ is the perfect quarantine show: it has pies, singalongs, and characters who can’t touch."
      );
      console.log(new POSTagger().tag(lexedWords));

      // Set up listener for DOM changes (infinite scroll websites) and clicks
      // (instagram like button)
      addListeners("body", () => {
        replaceAllTextOnPage();
      });
    }, 0);
  });
}
