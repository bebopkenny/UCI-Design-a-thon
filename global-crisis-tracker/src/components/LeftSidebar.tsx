'use client'
import React, { useState } from 'react'

const LeftSidebar = () => {
  const [selected, setSelected] = useState<string | null>('earthquakes')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value)
  }

  return (
    <aside className="w-[250px] h-screen bg-[#111827] text-white p-4 border-r border-gray-700">
      <h2 className="text-xl font-bold mb-4">Natural Hazards</h2>
      <form className="flex flex-col space-y-2">
        {['earthquakes', 'wildfires', 'tsunamis', 'tornados'].map((hazard) => (
          <label key={hazard} className="capitalize">
            <input
              type="radio"
              name="hazard"
              value={hazard}
              checked={selected === hazard}
              onChange={handleChange}
              className="mr-2"
            />
            {hazard}
          </label>
        ))}
      </form>

      <p className="mt-4 text-sm text-gray-400">Selected: {selected}</p>
    </aside>
  )
}

export default LeftSidebar