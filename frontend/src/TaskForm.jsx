import React, { useState } from 'react';
import { X } from 'lucide-react';

const TaskForm = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ids, setIds] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(title, desc, ids);
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-xl border-2 border-blue-500 shadow-xl">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold">Assign New Project Task</h2>
        <X className="cursor-pointer" onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            className="p-3 border rounded-lg"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="p-3 border rounded-lg"
            placeholder="Assignee IDs (e.g. 1, 2)"
            value={ids}
            onChange={(e) => setIds(e.target.value)}
            required
          />
        </div>
        <textarea
          className="w-full p-3 border rounded-lg"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;