import React from 'react';
import { Circle, Clock, Moon } from 'lucide-react';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <Circle className="text-blue-500 w-5 shrink-0" />
        <h2 className="text-lg font-bold text-gray-800 leading-tight">{task.title}</h2>
      </div>
      <p className="text-gray-500 text-sm mb-6 flex-grow italic">
        {task.description || "No description provided."}
      </p>
      
      <div className="space-y-2 mt-auto">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Live Coordination</p>
        {task.team.map((member, idx) => {
          const hour = parseInt(member.local_time.split(':')[0]);
          const isOffHours = hour < 9 || hour >= 18;

          return (
            <div key={idx} className={`flex justify-between items-center p-2.5 rounded-xl border transition-colors ${
              isOffHours ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'
            }`}>
              <span className={`text-sm font-semibold ${isOffHours ? 'text-red-700' : 'text-gray-700'}`}>
                {member.name}
              </span>
              <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${
                isOffHours ? 'text-red-600' : 'text-blue-600'
              }`}>
                {isOffHours ? <Moon size={14} /> : <Clock size={14} />}
                <span>{member.local_time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskCard;