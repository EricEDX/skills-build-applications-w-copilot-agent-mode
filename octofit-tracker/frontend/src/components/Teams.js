import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Spinner, Alert, Button, Badge } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching Teams from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Processed Teams Data:', teamsData);
        
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Loading teams...</p>
    </Container>
  );
  
  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Error Loading Teams</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );

  return (
    <Container className="mt-4">
      <h2>👥 Teams</h2>
      {teams.length === 0 ? (
        <Alert variant="info" className="mt-4">
          <Alert.Heading>No Teams Found</Alert.Heading>
          <p>There are currently no teams available.</p>
        </Alert>
      ) : (
        <div className="row mt-4">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <Card className="h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{team.name}</h5>
                  <Badge bg="primary">{team.members?.length || 0} Members</Badge>
                </Card.Header>
                <Card.Body>
                  {team.description && (
                    <p className="text-muted mb-3">{team.description}</p>
                  )}
                  <ListGroup variant="flush">
                    {team.created_by && (
                      <ListGroup.Item className="border-0 px-0">
                        <strong>Created By:</strong> {team.created_by?.username || team.created_by}
                      </ListGroup.Item>
                    )}
                    {team.created_at && (
                      <ListGroup.Item className="border-0 px-0">
                        <strong>Created:</strong> {new Date(team.created_at).toLocaleDateString()}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
                <Card.Footer className="bg-transparent">
                  <Button variant="info" size="sm" className="me-2">View</Button>
                  <Button variant="warning" size="sm" className="me-2">Edit</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Teams;
