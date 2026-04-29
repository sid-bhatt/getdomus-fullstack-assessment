import React from 'react';
import { Users } from 'lucide-react';

const TeamDirectory = ({ users }) => {
  if (users.length === 0) return null;

  return (
    <section className="mb-12 animate-in fade-in duration-500">
      <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Users size={14} /> Active Team Directory
      </h2>
      <div className="flex flex-wrap gap-3">
        {users.map(user => (
          <div key={user.id} className="group bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-3 hover:border-red-200 transition-all">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800">{user.name}</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-1.5 py-0.5 rounded">ID: {user.id}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">{user.timezone}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamDirectory;