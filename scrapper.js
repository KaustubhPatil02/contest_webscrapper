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

  