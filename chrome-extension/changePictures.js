// Replace images specified by img tags
const imgTagElements = document.querySelectorAll("img");
for (const imgTagElement of imgTagElements) {
  imgTagElement.setAttribute(
    "src",
    "https://memegen.link/bad/get_back_to_work/lazy_bum.jpg"
  );
  imgTagElement.setAttribute(
    "data-src",
    "https://memegen.link/bad/get_back_to_work/lazy_bum.jpg"
  );
}

// Replace images specified by background-image css
const backgroundImageElements = document.querySelectorAll(
  '[style*="background-image"]'
);
for (const bgImageElement of backgroundImageElements) {
  bgImageElement.style.backgroundImage =
    'url("https://memegen.link/bad/get_back_to_work/lazy_bum.jpg")';
}
