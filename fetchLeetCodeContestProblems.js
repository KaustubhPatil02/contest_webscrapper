const puppeteer = require('puppeteer');

async function fetchLeetCodeContestProblems(contestUrl) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the contest page
    await page.goto(contestUrl, { waitUntil: 'networkidle2' });

    // Scrape the problem titles and URLs
    const problems = await page.evaluate(() => {
      const problemElements = Array.from(document.querySelectorAll('.table-responsive tbody tr'));
      return problemElements.map(row => {
        const titleElement = row.querySelector('td:nth-child(2) a');
        const title = titleElement ? titleElement.textContent.trim() : null;
        const url = titleElement ? titleElement.href : null;
        return { title, url };
      }).filter(problem => problem.title && problem.url); // Filter out invalid entries
    });

    await browser.close();
    return problems;
  } catch (error) {
    console.error('Error fetching contest problems:', error.message);
    return [];
  }
}

module.exports = fetchLeetCodeContestProblems;

// const puppeteer = require('puppeteer');

// async function fetchLeetCodeContestProblems(contestUrl) {
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     console.log(`Navigating to: ${contestUrl}`);
//     await page.goto(contestUrl, { waitUntil: 'networkidle2' });

//     // Scrape the problem titles and URLs
//     const problems = await page.evaluate(() => {
//       const problemRows = Array.from(document.querySelectorAll('.table-responsive tbody tr'));
//       return problemRows.map(row => {
//         const titleElement = row.querySelector('td:nth-child(2) a');
//         const title = titleElement ? titleElement.textContent.trim() : null;
//         const url = titleElement ? titleElement.href : null;
//         return { title, url };
//       }).filter(problem => problem.title && problem.url); // Filter out invalid entries
//     });

//     console.log('Scraped problems:', problems);
//     await browser.close();
//     return problems;
//   } catch (error) {
//     console.error('Error fetching contest problems:', error.message);
//     return [];
//   }
// }

// module.exports = fetchLeetCodeContestProblems;