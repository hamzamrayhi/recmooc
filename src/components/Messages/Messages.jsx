import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Card, CardHeader, CardContent, TextField, Button, Divider, Paper } from '@mui/material';
import "./messages.css"
const Messages = ({ issueId }) => {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://192.168.100.35/api/contactus/${issueId}/replies`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [issueId]);

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleSendReply = async () => {
    try {
      if (!replyText.trim()) {
        // If replyText is empty or only contains whitespace, return early
        return;
      }
  
      const payload = {
        replyText,
      };
      if (role === 'admin') {
        payload.adminId = user.id;
      } else {
        payload.userId = user.id;
      }
  
      await axios.post(`http://192.168.100.35/api/contactus/${issueId}/response`, payload);
      setReplyText('');
      const response = await axios.get(`http://192.168.100.35/api/contactus/${issueId}/replies`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };
  

  return (
    <Container style={{ maxWidth: '90%', margin: 'auto', padding:'-50px' }}> {/* Make the modal larger */}
      <Typography variant="h4" component="h1" gutterBottom style={{ fontSize: '24px' }}>
        Issue Details
      </Typography>
      <Paper style={{ maxHeight: '70vh', overflowY: 'auto', padding: '16px', marginBottom: '16px', fontSize: '18px' }}>
        {messages.map((message, index) => (
          <React.Fragment key={message.id}>
            <Card style={{ marginBottom: '16px', fontSize: '18px', maxWidth: '100%' }}> {/* Make the message boxes larger */}
              <CardHeader
                title={message.user_name || message.admin_name}
                subheader={`From: ${message.user_name ? 'User' : 'Admin'} | Date: ${new Date(
                  message.created_at
                ).toLocaleString()}`}
              />
              <CardContent style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                <Typography variant="body1" style={{ fontSize: '18px' }}>{message.reply_text}</Typography>
              </CardContent>
            </Card>
            {index !== messages.length - 1 && <Divider />} {/* Divider between messages */}
          </React.Fragment>
        ))}
      </Paper>
      <Box>
        <TextField
          label="Your Reply"
          multiline
          rows={4}
          value={replyText}
          onChange={handleReplyChange}
          variant="outlined"
          fullWidth
          style={{ fontSize: '18px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSendReply} style={{ marginTop: '8px', fontSize: '18px' }}>
          Send Reply
        </Button>
      </Box>
    </Container>
  );
};

export default Messages;
