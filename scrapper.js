const axios = require('axios');

async function leetcodefetchUpcomingContests() {
  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query {
          upcomingContests {
            title
            startTime
          }
        }
      `,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com/contest/',
        'Origin': 'https://leetcode.com'
      }
    });

    const contests = response.data.data.upcomingContests.map(contest => ({
      title: contest.title,
      time: new Date(contest.startTime * 1000).toLocaleString(),
    }));
    console.log("upcomingContests")
    console.log(contests);
  } catch (error) {
    console.error('Error fetching contests:', error.response?.data || error.message);
  }
}

leetcodefetchUpcomingContests();




async function leetcodefetchPreviousContests() {
  try {
    const response = await axios.post(
      'https://leetcode.com/graphql',
      {
        query: `
          query {
            pastContests(pageNo: 1, numPerPage: 10) {
              data {
                title
                startTime
              }
            }
          }
        `,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com/contest/',
          'Origin': 'https://leetcode.com',
        },
      }
    );

    const contests = response.data.data.pastContests.data.map((contest) => ({
      title: contest.title,
      time: new Date(contest.startTime * 1000).toLocaleString(),
    }));
    console.log("PreviousContests")
    console.log(contests);
  } catch (error) {
    console.error('Error fetching previous contests:', error.response?.data || error.message);
  }
}

leetcodefetchPreviousContests();

  
// const puppeteer = require('puppeteer');

// async function fetchLeetCodeContestProblems(contestUrl) {
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     // Navigate to the contest page
//     await page.goto(contestUrl, { waitUntil: 'networkidle2' });

//     // Scrape the problem titles and URLs
//     const problems = await page.evaluate(() => {
//       const problemElements = Array.from(document.querySelectorAll('.table-responsive tbody tr'));
//       return problemElements.map(row => {
//         const titleElement = row.querySelector('td:nth-child(2) a');
//         const title = titleElement ? titleElement.textContent.trim() : null;
//         const url = titleElement ? titleElement.href : null;
//         return { title, url };
//       }).filter(problem => problem.title && problem.url); // Filter out invalid entries
//     });

//     await browser.close();
//     return problems;
//   } catch (error) {
//     console.error('Error fetching contest problems:', error.message);
//     return [];
//   }
// }

// module.exports = fetchLeetCodeContestProblems;