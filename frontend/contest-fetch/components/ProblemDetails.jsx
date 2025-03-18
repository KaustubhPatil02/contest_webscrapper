import { useEffect, useState } from "react";
import axios from "axios";

const ProblemDetails = ({ contestUrl, onBack }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/leetcode-contest-problems", {
          params: { contestUrl },
        });
        setProblems(response.data.problems);
      } catch (error) {
        console.error("Error fetching contest problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [contestUrl]);

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-blue-500 underline">
        Back to Contests
      </button>
      <h2 className="text-2xl font-bold mb-4">Problems in Contest</h2>
      {loading ? (
        <p>Loading problems...</p>
      ) : problems.length === 0 ? (
        <p>No problems found for this contest.</p>
      ) : (
        <ul className="list-disc pl-5">
          {problems.map((problem, index) => (
            <li key={index}>
              <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {problem.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProblemDetails;