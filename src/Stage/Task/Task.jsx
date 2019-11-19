import './Task.css';
import React from "react";

export const Task = ({ taskText }) => (
    <div className="task">
        {taskText}
    </div>
);
