import React, { useState } from 'react';
import { X } from 'lucide-react';

const UserForm = ({ onClose, onSave, availableTZs }) => {
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [search, setSearch] = useState("");

  const filteredTZs = availableTZs
    .filter((tz) => tz.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name, timezone);
    setSearch("");
  };

  return (
    <div className="mb-8 bg-green-50 p-6 rounded-xl border border-green-200">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-green-800">Onboard New Team Member</h2>
        <X className="cursor-pointer" onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <input
          className="p-2 border rounded-md flex-1"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="flex-1 relative">
          <input
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search Timezone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setTimezone(e.target.value);
            }}
            required
          />
          {search && !availableTZs.includes(search) && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl z-50 rounded-b-lg mt-1 overflow-hidden">
              {filteredTZs.map((tz) => (
                <div
                  key={tz}
                  className="p-3 hover:bg-green-50 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
                  onClick={() => {
                    setTimezone(tz);
                    setSearch(tz);
                  }}
                >
                  {tz}
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800">
          Save Member
        </button>
      </form>
    </div>
  );
};

export default UserForm;