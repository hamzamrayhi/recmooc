import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, Card, CardHeader, CardContent, Grid, IconButton, Tooltip, Pagination, Box, Modal, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { CheckCircle, CheckCircleOutline, Chat } from '@mui/icons-material';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';
import Messages from '../../../components/Messages/Messages';
import CustomAlerts from '../../../components/CustomAlerts/CustomAlerts';
import './AdminInbox.css';

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [openChat, setOpenChat] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [messageToToggle, setMessageToToggle] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchMessages = async () => {
      const endpoint = 'http://localhost:5000/api/contactus';
      const params = currentTab === 0 ? { adminId: user.id } : { unhandled: 'true' };

      try {
        const response = await axios.get(endpoint, { params });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [currentTab, user.id]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setPage(1); // Reset pagination upon tab change
  };

  const handleOpenChat = (message) => {
    setSelectedMessage(message);
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
    setSelectedMessage(null);
  };

  const handleToggleSolved = (message) => {
    if (currentTab !== 0) {
      setAlertMessage("Only Handled requests messages can be marked as solved.");
      setAlertSeverity('warning');
      setAlertOpen(true);
      return;
    }
    setMessageToToggle(message);
    setOpenDialog(true);
  };

  const handleConfirmToggle = async () => {
    try {
      await axios.put(`http://localhost:5000/api/contactus/${messageToToggle.id}/solved`, { solved: !messageToToggle.solved });
      setMessages(messages.map(msg => 
        msg.id === messageToToggle.id ? { ...msg, solved: !msg.solved } : msg
      ));
      setAlertMessage('Message status updated successfully.');
      setAlertSeverity('success');
      setAlertOpen(true);
    } catch (error) {
      console.error('Error updating solved status:', error);
      setAlertMessage('Failed to update message status.');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
    setOpenDialog(false);
  };

  const handleCancelToggle = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedMessages = messages.filter(message => !message.solved).slice((page - 1) * pageSize, page * pageSize);

  return (
    <AdminNavbar>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Messages
        </Typography>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="inbox tabs">
          <Tab label="My tickets" />
          <Tab label="Unhandled Tickets" />
        </Tabs>

        {paginatedMessages.length === 0 && (
          <Typography variant="h5" style={{ marginTop: '20px' }}>
            There are no unhandled tickets.
          </Typography>
        )}

        <List>
          {paginatedMessages.map((message) => (
            <div key={message.id}>
              <Grid container spacing={2} style={{ marginBottom: '16px' }}>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader
                      avatar={
                        <img
                          src={`http://localhost:5000/api/${message.user_picture.replace(/\\/g, "/")}`}
                          alt={`${message.username}'s profile`}
                          style={{ width: "75px", height: "75px", objectFit: "cover", cursor: "pointer", borderRadius: "50%" }}
                        />
                      }
                      title={<Typography variant="h6" component="span">{message.username}</Typography>}
                      action={
                        <>
                          <Tooltip title="Open Chat">
                            <IconButton onClick={() => handleOpenChat(message)} style={{ fontSize: '2rem' }}>
                              <Chat fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={message.solved ? "Mark as Unsolved" : "Mark as Solved"}>
                            <IconButton onClick={() => handleToggleSolved(message)} style={{ fontSize: '2rem' }}>
                              {message.solved ? <CheckCircle fontSize="inherit" color="success" /> : <CheckCircleOutline fontSize="inherit" />}
                            </IconButton>
                          </Tooltip>
                        </>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1" component="p" style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                        <strong>Email:</strong> {message.email}
                      </Typography>
                      <Typography variant="body1" component="p" style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                        <strong>Subject:</strong> {message.subject}
                      </Typography>
                      <Typography variant="body1" component="p" style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                        <strong>About:</strong> {message.about}
                      </Typography>
                      <hr style={{ margin: '16px 0', borderColor: 'gray' }} />
                      <Typography variant="body1" component="p" className="message-text" style={{ fontSize: '1.3rem', marginBottom: '8px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' ,wordWrap:"break-word"}}>
                        {message.text}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" style={{ textAlign: 'right', fontSize: '1.3rem' }}>
                        {new Date(message.created_at).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          ))}
        </List>
        <Box display="flex" justifyContent="center" marginTop="16px">
          <Pagination
            count={Math.ceil(messages.length / pageSize)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            sx={{ 
              '& .MuiPaginationItem-root': {
                fontSize: '1.5rem',
                padding: '10px',
              }
            }}
          />
        </Box>

        <Modal open={openChat} onClose={handleCloseChat}>
          <Box sx={{ width: 500, bgcolor: 'background.paper', padding: 4, margin: 'auto', marginTop: '10%', borderRadius: 2, boxShadow : 24 }}>
            {selectedMessage && (
              <Messages issueId={selectedMessage.id} />
            )}
          </Box>
        </Modal>

        <Dialog open={openDialog} onClose={handleCancelToggle}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to mark this message as {messageToToggle?.solved ? "unsolved" : "solved"}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmToggle} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <CustomAlerts
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          message={alertMessage}
          severity={alertSeverity}
        />
      </Container>
    </AdminNavbar>
  );
};

export default AdminInbox;
