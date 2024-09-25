// src/components/TaskItem.js
import React from 'react';

function TaskItem({ task }) {
    return (
        <li>
            <span>{task.title}</span>
            <span>Status: {task.status}</span>
        </li>
    );
}

export default TaskItem;
