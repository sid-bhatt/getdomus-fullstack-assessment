import React from 'react';
import { UserPlus, Plus } from 'lucide-react';

const Header = ({ onAddMember, onAddTask, hasUsers }) => (
  <header className="flex justify-between items-start mb-10">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">GetDomus Dashboard</h1>
      <p className="text-gray-500">Global Coordination Hub</p>
    </div>
    <div className="flex gap-3">
      <button
        onClick={onAddMember}
        className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition shadow-sm"
      >
        <UserPlus size={18} /> Add Member
      </button>
      <button
        disabled={!hasUsers}
        onClick={onAddTask}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm ${
          !hasUsers
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        title={!hasUsers ? "Onboard a member first" : ""}
      >
        <Plus size={18} /> New Task
      </button>
    </div>
  </header>
);

export default Header;