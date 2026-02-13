import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Table, Button } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching Activities from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Processed Activities Data:', activitiesData);
        
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Loading activities...</p>
    </Container>
  );
  
  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Error Loading Activities</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );

  return (
    <Container className="mt-4">
      <h2>📊 Activities</h2>
      {activities.length === 0 ? (
        <Alert variant="info" className="mt-4">
          <Alert.Heading>No Activities Found</Alert.Heading>
          <p>There are currently no activities available.</p>
        </Alert>
      ) : (
        <Card className="mt-4">
          <Card.Body className="p-0">
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>Activity Name</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Duration (min)</th>
                  <th>Calories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="fw-bold">{activity.name || activity.activity_type}</td>
                    <td>
                      <span className="badge bg-primary">
                        {activity.activity_type || 'General'}
                      </span>
                    </td>
                    <td>{activity.description || 'N/A'}</td>
                    <td className="text-center">{activity.duration || 'N/A'}</td>
                    <td className="text-center">{activity.calories_burned || 'N/A'}</td>
                    <td className="text-center">
                      <Button variant="info" size="sm" className="me-2">View</Button>
                      <Button variant="warning" size="sm" className="me-2">Edit</Button>
                      <Button variant="danger" size="sm">Delete</Button>
                    </td>
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

export default Activities;
