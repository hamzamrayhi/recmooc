import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import './chatbot.css';
import { isAuthenticated } from '../../config/Auth';

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#005387',
  headerFontColor: 'white',
  headerFontSize: '15px',
  botBubbleColor: '#005387',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  const toggleChatbot = () => setOpen(!open);

  const CustomComponent = ({ steps, triggerNextStep }) => {
    const userMessage = steps['2'] ? steps['2'].value : null;
  
    useEffect(() => {
      if (userMessage) {
        handleUserMessage();
      }
    }, [userMessage]);
  
    const handleUserMessage = async () => {
      try {
        if (isAuthenticated()){
          const user = JSON.parse(window.localStorage.getItem("user"));
          const response = await axios.post(`${process.env.REACT_APP_API_KEY}/chatbot`, { message: userMessage, user: user });
          triggerNextStep({ value: response.data.response, trigger: '4' });
        }
        else{
          const response = await axios.post(`${process.env.REACT_APP_API_KEY}/chatbot`, { message: userMessage });
        triggerNextStep({ value: response.data.response, trigger: '4' });
        }
        
      } catch (error) {
        console.error('Error fetching response:', error);
        triggerNextStep({ value: 'Sorry, I could not process your request. Please try again.', trigger: '4' });
      }
    };
  
    return null;
  };
  


  const steps = [
    {
      id: '1',
      message: 'Hello, what can I help you with today?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      component: <CustomComponent />,
      waitAction: true,
      asMessage: true,
      replace: true,
    },
    {
      id: '4',
      message: ({ previousValue }) => previousValue,
      trigger:'5',
    },
    {
      id: '5',
      message: 'do you wanna keep going?',
      trigger:'6',
    },

    {
      id: '6',
      options: [
        { value: 'yes', label: 'Yes', trigger: '1' }, // Restart conversation
        { value: 'no', label: 'No', trigger: 'end' }, // End conversation
      ],
    },
    {
      id: 'end',
      message: 'Thank you for using our chatbot. Have a great day!',
    },
  ];


  return (
    <ThemeProvider theme={theme}>
      <div className="chatbot">
        {!open && <img src="images/chatbot/chatbot.png" alt="Chatbot" onClick={toggleChatbot} className="chatbot-icon" />}
        {open && (
          <div>
            <ChatBot steps={steps} handleEnd={() => setOpen(false)} />
            <button onClick={toggleChatbot} style={{
              position: 'absolute',
              right: '20px',
              top: '10px',
              cursor: 'pointer',
              color: '#fff',
              background: 'transparent',
              border: 'none',
              fontSize: '16px',
              padding: '2px 6px',
              borderRadius: '4px',
              zIndex: '10000',
            }}>X</button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Chatbot;
