import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Spinner, Alert, Button, Badge } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching Workouts from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed Workouts Data:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return <Badge bg="success">Easy</Badge>;
      case 'medium':
        return <Badge bg="warning">Medium</Badge>;
      case 'hard':
        return <Badge bg="danger">Hard</Badge>;
      case 'extreme':
        return <Badge bg="dark">Extreme</Badge>;
      default:
        return <Badge bg="secondary">{difficulty || 'N/A'}</Badge>;
    }
  };

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Loading workouts...</p>
    </Container>
  );
  
  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Error Loading Workouts</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );

  return (
    <Container className="mt-4">
      <h2>💪 Workouts</h2>
      {workouts.length === 0 ? (
        <Alert variant="info" className="mt-4">
          <Alert.Heading>No Workouts Found</Alert.Heading>
          <p>There are currently no workouts available.</p>
        </Alert>
      ) : (
        <div className="row mt-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
              <Card className="h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{workout.name || workout.workout_type}</h5>
                  {workout.difficulty && getDifficultyBadge(workout.difficulty)}
                </Card.Header>
                <Card.Body>
                  {workout.description && (
                    <p className="text-muted mb-3">{workout.description}</p>
                  )}
                  <ListGroup variant="flush">
                    {workout.workout_type && (
                      <ListGroup.Item className="border-0 px-0">
                        <strong>Type:</strong> <Badge bg="primary">{workout.workout_type}</Badge>
                      </ListGroup.Item>
                    )}
                    {workout.duration && (
                      <ListGroup.Item className="border-0 px-0">
                        <strong>Duration:</strong> {workout.duration} minutes
                      </ListGroup.Item>
                    )}
                    {workout.instructions && (
                      <ListGroup.Item className="border-0 px-0">
                        <strong>Instructions:</strong> {workout.instructions}
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

export default Workouts;
