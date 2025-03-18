import { useEffect, useState } from "react";
import axios from "axios";
import ProblemDetails from "./ProblemDetails";

const ContestCard = () => {
  const [upcomingLeetCodeContests, setUpcomingLeetCodeContests] = useState([]);
  const [pastLeetCodeContests, setPastLeetCodeContests] = useState([]);
  const [upcomingCodeforcesContests, setUpcomingCodeforcesContests] = useState([]);
  const [pastCodeforcesContests, setPastCodeforcesContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContestUrl, setSelectedContestUrl] = useState(null);

  useEffect(() => {
    const fetchLeetCodeContests = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/leetcode-contests");
        setUpcomingLeetCodeContests(response.data.upcomingContests);
        setPastLeetCodeContests(response.data.pastContests);
      } catch (error) {
        console.error("Error fetching LeetCode contests:", error);
      }
    };

    const fetchCodeforcesContests = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/codeforces-contests");
        setUpcomingCodeforcesContests(response.data.upcomingContests);
        setPastCodeforcesContests(response.data.pastContests);
      } catch (error) {
        console.error("Error fetching Codeforces contests:", error);
      }
    };

    const fetchAllContests = async () => {
      setLoading(true);
      await Promise.all([fetchLeetCodeContests(), fetchCodeforcesContests()]);
      setLoading(false);
    };

    fetchAllContests();
  }, []);

  if (selectedContestUrl) {
    return (
      <ProblemDetails
        contestUrl={selectedContestUrl}
        onBack={() => setSelectedContestUrl(null)}
      />
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Past LeetCode Contests</h2>
      {loading ? (
        <p>Loading contests...</p>
      ) : pastLeetCodeContests.length === 0 ? (
        <p>No contests available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pastLeetCodeContests.map((contest, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => setSelectedContestUrl(contest.url)}
            >
              <h3 className="text-xl font-semibold">{contest.title}</h3>
              <p className="text-gray-500">{contest.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContestCard;