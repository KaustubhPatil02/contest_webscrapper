const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for frontend requests

// Route to fetch LeetCode contests
app.get('/api/leetcode-contests', async (req, res) => {
  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query {
          upcomingContests {
            title
            startTime
          }
          pastContests(pageNo: 1, numPerPage: 100) {
            data {
              title
              startTime
            }
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

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const upcomingContests = response.data.data.upcomingContests.map(contest => ({
      title: contest.title,
      time: new Date(contest.startTime * 1000).toLocaleString(),
      url: `https://leetcode.com/contest/${contest.title.replace(/\s+/g, '-').toLowerCase()}`
    }));

    const pastContests = response.data.data.pastContests.data
      .filter(contest => new Date(contest.startTime * 1000) >= twelveMonthsAgo)
      .map(contest => ({
        title: contest.title,
        time: new Date(contest.startTime * 1000).toLocaleString(),
        url: `https://leetcode.com/contest/${contest.title.replace(/\s+/g, '-').toLowerCase()}`
      }));

    res.json({ upcomingContests, pastContests });
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// Route to fetch Codeforces contests
app.get('/api/codeforces-contests', async (req, res) => {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list');
    const contests = response.data.result;

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const upcomingContests = contests.filter(contest => contest.phase === 'BEFORE').map(contest => ({
      id: contest.id,
      name: contest.name,
      startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
      url: `https://codeforces.com/contest/${contest.id}`
    }));

    const pastContests = contests.filter(contest => contest.phase === 'FINISHED' && new Date(contest.startTimeSeconds * 1000) >= twelveMonthsAgo).map(contest => ({
      id: contest.id,
      name: contest.name,
      startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
      url: `https://codeforces.com/contest/${contest.id}`
    }));

    res.json({ upcomingContests, pastContests });
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});