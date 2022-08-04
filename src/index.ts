import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const browser = async () => {
  let browser: any;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: false,
    });
  } catch (err) {
    console.log('Could not create a browser instance', err);
  }
  return browser;
};

const scraper = async (): Promise<any> => {
  const urls = process.env.CRAWL_URLS;

  if (!urls) {
    throw new Error('CRAWL_URLS undefined');
  }

  //for of loop over process.env.CRAWL_URLS which is a comma delimited string
  const urlList = urls.split(',');

  const browserInstance = await browser();

  for (const url of urlList) {
    const page = await browserInstance.newPage();

    const response = await page.goto(url);

    const responseHeaders = response.headers();

    const performance = await page.evaluate(() => {
      const { loadEventEnd, navigationStart } = performance.timing;

      return { loadTime: loadEventEnd - navigationStart };
    });

    console.log(
      `'${url}' took ${performance.loadTime} ms to load. responseHeaders.age=${responseHeaders.age}`,
    );
  }

  await browserInstance.close();
};

(async () => {
  await scraper();
})();
