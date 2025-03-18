const fetchLeetCodeContestProblems = require('./fetchLeetCodeContestProblems');

(async () => {
  const contestUrl = 'https://leetcode.com/contest/biweekly-contest-101';
  const problems = await fetchLeetCodeContestProblems(contestUrl);
  console.log(problems);
})();