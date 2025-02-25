import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminLogs.css';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://192.168.100.35/api/admin_logs');
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };
        
        fetchLogs();
    }, []);

    const formatLogMessage = (log) => {
        // Extracting ID and entity name if available in the string (expected format: "entity name (ID: xyz)")
        let entityDetails = log.coursename || "";
        let entityId = entityDetails.match(/\(ID: (\d+)\)/);
        let entityName = entityDetails.replace(/\s\(ID: \d+\)/, '');
        entityId = entityId ? entityId[1] : 'Unknown';

        if (log.reviewid) {
            return `${log.name} ${log.action}  (Review ID: ${log.reviewid})`;
        } else if (log.username) {
            return `${log.name} ${log.action}  ${log.username}`;
        } else if (log.coursename) {
            return `${log.name} ${log.action}  '${entityName}' (Course ID: ${entityId})`;
        } else {
            return `${log.name} performed an action`;
        }
    };

    return (
        <AdminNavbar>
        <div className='admin-logs-container'>
        
        
        <div className="chat-container">
        <h1 className="admin-logs-title">Admin Logs</h1>
        
            {logs.map(log => (
                <div key={log.id} className="bubble">
                    {formatLogMessage(log)} at {new Date(log.timestamp).toLocaleString()}
                </div>
            ))}
        </div>
        </div>
        </AdminNavbar>
    );
};

export default AdminLogs;
