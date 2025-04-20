'use client'
import React, { useState } from 'react'

interface Props {
  selected: 'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados';
  setSelected: (hazard: 'earthquakes' | 'wildfires' | 'tsunamis' | 'tornados') => void;
}

const LeftSidebar: React.FC<Props> = ({ selected, setSelected }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value as Props['selected']);
  };

  return (
    <aside className="w-[250px] h-screen bg-transparent text-white p-6 border-r border-white font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center">Natural Hazards</h2>
      <form className="flex flex-col space-y-4">
        {['earthquakes', 'wildfires', 'tsunamis', 'tornados'].map((hazard) => (
          <label
            key={hazard}
            className={`capitalize flex items-center gap-2 cursor-pointer transition hover:text-gray-300 ${
              selected === hazard ? 'font-semibold text-white' : 'text-gray-400'
            }`}
          >
            <input
              type="radio"
              name="hazard"
              value={hazard}
              checked={selected === hazard}
              onChange={handleChange}
              className="accent-white"
            />
            {hazard}
          </label>
        ))}
      </form>
      <p className="mt-8 text-sm text-gray-400 text-center">Selected: {selected}</p>
    </aside>
  );
};

export default LeftSidebar;
