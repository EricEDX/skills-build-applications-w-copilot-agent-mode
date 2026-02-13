import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Table, Badge } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching Leaderboard from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed Leaderboard Data:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Loading leaderboard...</p>
    </Container>
  );
  
  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Error Loading Leaderboard</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return <Badge bg="warning" text="dark">🥇 1st</Badge>;
      case 1:
        return <Badge bg="secondary">🥈 2nd</Badge>;
      case 2:
        return <Badge bg="danger">🥉 3rd</Badge>;
      default:
        return <Badge bg="primary">{index + 1}th</Badge>;
    }
  };

  return (
    <Container className="mt-4">
      <h2>🏆 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <Alert variant="info" className="mt-4">
          <Alert.Heading>No Leaderboard Data</Alert.Heading>
          <p>There is currently no leaderboard data available.</p>
        </Alert>
      ) : (
        <Card className="mt-4">
          <Card.Body className="p-0">
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: '80px' }}>Rank</th>
                  <th>User</th>
                  <th className="text-center" style={{ width: '120px' }}>Points</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id || index}>
                    <td className="text-center fw-bold">{getRankBadge(index)}</td>
                    <td className="fw-bold">{entry.user?.username || entry.name || 'N/A'}</td>
                    <td className="text-center">
                      <span className="badge bg-success fs-6">{entry.points || entry.score || 0}</span>
                    </td>
                    <td>{entry.team?.name || entry.team || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Leaderboard;
