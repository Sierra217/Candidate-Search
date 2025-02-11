import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);



  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
    setCandidate(storedCandidates.length > 0 ? storedCandidates[0] : null);
  }, []);

  const handleSkipCandidate = () => {
    if (!candidate) return;

    const currentIndex = savedCandidates.findIndex((c) => c.username === candidate.username);
    
    if (currentIndex + 1 < savedCandidates.length) {
      setCandidate(savedCandidates[currentIndex + 1]);
    } else {
      setCandidate(null);
    }
  }

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <div>
        {candidate && (
          <div>
          <img src={candidate.avatar_url} alt={candidate.name} />
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Username:</strong> {candidate.username}</p>
          <p><strong>Location:</strong> {candidate.location}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
          <p><strong>Company:</strong> {candidate.company}</p>
          <button onClick={handleSkipCandidate}>-</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default SavedCandidates;
