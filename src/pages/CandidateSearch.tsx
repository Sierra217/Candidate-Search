import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [, setLoading] = useState<boolean>(false);
  const [candidateQueue, setCandidateQueue] = useState<Candidate[]>([]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const users = await searchGithub();
      console.log("Fetching users:", users);

        if (users.length > 0) {
          const userDetails = await searchGithubUser(users[0].login);
          const candidate: Candidate = {
            name: userDetails.login,
            username: userDetails.login,  // Map login to username
            location: userDetails.location,
            avatar_url: userDetails.avatar_url,
            email: userDetails.email,
            html_url: userDetails.html_url,
            company: userDetails.company,
          };

          setCandidateQueue((prevQueue) => [...prevQueue, candidate]);
          if (!candidateQueue.length) {
            setCandidate(candidate);
          }
        } else {
          setCandidate(null);
      }
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setLoading(false);
    }
  };

  const loadNextCandidate = () => {
    if (candidateQueue.length > 0) {
      const nextCandidate = candidateQueue[0]
      setCandidate(nextCandidate);

      setCandidateQueue((prevQueue) => prevQueue.slice(1));
    } else {
      fetchCandidates();
    }
  };

  const handleSaveCandidate = () => {
    if (!candidate) return;

    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    const isAlreadySaved = savedCandidates.some((c: Candidate) => c.username === candidate.username);

    if (!isAlreadySaved) {
      savedCandidates.push(candidate);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    }

    loadNextCandidate();
  };

  const handleSkipCandidate = () => {
    loadNextCandidate();
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (!candidate) {
    return (
      <div>
        <h1>CandidateSearch</h1>
        <p>No more candidates available.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>CandidateSearch</h1>
      <div>
        <img src={candidate.avatar_url} alt={candidate.name} />
        <p><strong>Name:</strong> {candidate.name}</p>
        <p><strong>Username:</strong> {candidate.username}</p>
        <p><strong>Location:</strong> {candidate.location}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Company:</strong> {candidate.company}</p>
      </div>
      <button onClick={handleSaveCandidate}>+</button>
      <button onClick={handleSkipCandidate}>-</button>
      </div>
    );
  };


export default CandidateSearch;
