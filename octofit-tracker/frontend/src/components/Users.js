import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Table, Button } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching Users from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Processed Users Data:', usersData);
        
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Loading users...</p>
    </Container>
  );
  
  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Error Loading Users</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );

  return (
    <Container className="mt-4">
      <h2>👤 Users</h2>
      {users.length === 0 ? (
        <Alert variant="info" className="mt-4">
          <Alert.Heading>No Users Found</Alert.Heading>
          <p>There are currently no users available.</p>
        </Alert>
      ) : (
        <Card className="mt-4">
          <Card.Body className="p-0">
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th className="text-center" style={{ width: '180px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="fw-bold">{user.username || 'N/A'}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>
                        {user.email || 'N/A'}
                      </a>
                    </td>
                    <td>{user.first_name || 'N/A'}</td>
                    <td>{user.last_name || 'N/A'}</td>
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

export default Users;
