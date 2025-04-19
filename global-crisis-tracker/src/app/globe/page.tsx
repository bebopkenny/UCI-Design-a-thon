'use client'
import React from 'react'
import GlobeComponent from '@/components/GlobeComponent'
import RightSidebar from '@/components/RightSidebar'
import LeftSidebar from '@/components/LeftSidebar'

const GlobePage = () => {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-black">
      <LeftSidebar />
      <div className="flex-1 flex justify-center items-center">  
        <GlobeComponent />
      </div>
      <RightSidebar />
    </main>
  )
}

export default GlobePage
