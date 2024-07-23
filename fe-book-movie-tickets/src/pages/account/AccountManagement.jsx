import { useEffect, useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function AccountManagement() {
    const [accounts, setAccounts] = useState([]);
    const [newAccount, setNewAccount] = useState({
        email: '',
        fullname: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // State for success message

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/accounts');
            setAccounts(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addAccount = async () => {
        try {
            const accountToCreate = {
                ...newAccount,
                password: '123456789'
            };
            await axios.post('http://localhost:8080/api/v1/accounts', accountToCreate);
            setNewAccount({ email: '', fullname: '', role: '' });
            fetchAccounts(); // Re-fetch the accounts list to update the UI
            setSuccessMessage('Account added successfully!'); // Set the success message
            setTimeout(() => setSuccessMessage(null), 3000); // Clear the success message after 3 seconds
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="mt-0">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="text-dark text-lg-start">Account Management</h1>
                </div>
            </div>
            <div className="row mt-0">
                <div className="col-10">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">Create New Account</Card.Title>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="newAccountEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={newAccount.email}
                                                onChange={(e) => setNewAccount(prev => ({ ...prev, email: e.target.value }))}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="newAccountFullname">
                                            <Form.Label>Fullname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter fullname"
                                                value={newAccount.fullname}
                                                onChange={(e) => setNewAccount(prev => ({ ...prev, fullname: e.target.value }))}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="newAccountRole">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Select
                                                value={newAccount.role}
                                                onChange={(e) => setNewAccount(prev => ({ ...prev, role: e.target.value }))}
                                            >
                                                <option value="">Select role</option>
                                                <option value="ADMIN">ADMIN</option>
                                                <option value="STAFF">STAFF</option>
                                                <option value="USER">USER</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Button variant="primary" onClick={addAccount}>
                                            Add Account
                                        </Button>
                                    </Form>
                                    {successMessage && (
                                        <Alert variant="success" className="mt-3">
                                            {successMessage}
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-md-8">
                            <Card className="col-12 mx-auto">
                                <Card.Body>
                                    <Card.Title className="text-center fs-1 mb-4">Account List</Card.Title>
                                    <table className="table table-bordered mt-4">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>Fullname</th>
                                            <th>Role</th>
                                            <th>Enabled</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {accounts.length > 0 ? (
                                            accounts.map((account) => (
                                                <tr key={account.id}>
                                                    <td>{account.id}</td>
                                                    <td>{account.email}</td>
                                                    <td>{account.fullname}</td>
                                                    <td>{account.role}</td>
                                                    <td>{account.enabled ? 'Yes' : 'No'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    No accounts found
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountManagement;
