const puppeteer = require("puppeteer");
const Product = require("../mongo/product");

async function scrapFlipkart(searchItem) {
  console.log(`scrapping ${searchItem} on flipkart`);
  const browser = await puppeteer.launch({ headless: "true" });
  const page = await browser.newPage();

  // Increase the timeout value (in milliseconds)
  await page.setDefaultNavigationTimeout(0); // unlimited
  // Navigate to Flipkart's website
  await page.goto(
    // "https://www.flipkart.com/"
    `https://www.flipkart.com/search?q=${searchItem}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`
  );
  // await page.screenshot({ path: "iphone1.png" });

  //   await page.evaluate(() => {
  //     const allDivs = document.querySelectorAll("._2KpZ6l");
  //     const randomElement = allDivs[Math.floor(Math.random() * allDivs.length)];
  //     randomElement.click();
  //   });
  //   await page.click("._2KpZ6l");
  //   // Enter the search item in the input field and submit the form
  //   await page.type('input[name="q"]', searchItem);
  //   console.log("text entered");
  //   await page.keyboard.press("Enter");
  //   console.log("enter pressed");
  await page.screenshot({ path: "iphone2.png" });

  // Wait for the search results to load
  await page.waitForSelector("div._1AtVbE", { timeout: 60000 });
  // Extract the search results
  const results = await page.$$eval(
    "div._1AtVbE",
    (items, searchItem) => {
      const searchResults = [];

      // Iterate over each search result item
      items.forEach((item) => {
        const titleElement = item.querySelector("._4rR01T");
        const priceElement = item.querySelector("div._3I9_wc._27UcVY");
        const offerPriceElement = item.querySelector("div._30jeq3._1_WHN1");
        const imageElement = item.querySelector("img._396cs4");
        const ratingElement = item.querySelector("div._3LWZlK");

        if (titleElement && priceElement) {
          const imageUrl = imageElement.src;
          const title = titleElement.textContent.trim();
          const rating = ratingElement.textContent.trim();
          const price = priceElement.textContent.trim();
          const offerPrice = offerPriceElement.textContent.trim();

          searchResults.push({
            platform: "flipkart",
            product: searchItem,
            title,
            image: imageUrl,
            rating,
            price,
            offer_price: offerPrice,
          });
        }
      });

      return searchResults;
    },
    searchItem
  );

  await browser.close();

  return results;
}

module.exports = scrapFlipkart;
