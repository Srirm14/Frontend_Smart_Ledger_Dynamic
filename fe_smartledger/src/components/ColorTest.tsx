import React from 'react'

export default function ColorTest() {
  return (
    <div className="p-8 space-y-6 poppins-regular">
      <h2 className="text-2xl font-bold text-primary-600 poppins-bold">Smart Ledger Color System Test</h2>
      
      {/* Primary Colors */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold poppins-semibold">Primary Colors (Electric Blue):</h3>
        <div className="flex space-x-2">
          <div className="w-16 h-16 bg-primary-500 rounded-lg shadow-sm"></div>
          <div className="w-16 h-16 bg-primary-600 rounded-lg shadow-sm"></div>
          <div className="w-16 h-16 bg-primary-700 rounded-lg shadow-sm"></div>
        </div>
        <div className="text-sm text-neutral-600">
          <span className="text-primary-500">#3b3ef9</span> | 
          <span className="text-primary-600">#3b3ef9</span> | 
          <span className="text-primary-700">#2225ff</span>
        </div>
      </div>

      {/* Success Colors */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold poppins-semibold">Success Colors (Neo Mint):</h3>
        <div className="flex space-x-2">
          <div className="w-16 h-16 bg-success-500 rounded-lg shadow-sm"></div>
          <div className="w-16 h-16 bg-success-600 rounded-lg shadow-sm"></div>
          <div className="w-16 h-16 bg-success-700 rounded-lg shadow-sm"></div>
        </div>
        <div className="text-sm text-neutral-600">
          <span className="text-success-500">#39C5A4</span> | 
          <span className="text-success-600">#30B294</span> | 
          <span className="text-success-700">#249e7e</span>
        </div>
      </div>

      {/* Danger Colors */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold poppins-semibold">Danger Colors (Neon Coral):</h3>
        <div className="flex space-x-2">
          <div className="w-16 h-16 bg-danger-500 rounded-lg shadow-sm"></div>
          <div className="w-16 h-16 bg-danger-600 rounded-lg shadow-sm"></div>
          <div className="w-16 h-16 bg-danger-700 rounded-lg shadow-sm"></div>
        </div>
        <div className="text-sm text-neutral-600">
          <span className="text-danger-500">#E63131</span> | 
          <span className="text-danger-600">#d30f0f</span> | 
          <span className="text-danger-700">#b00c0c</span>
        </div>
      </div>

      {/* Warning Colors */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold poppins-semibold">Warning Colors (Cyber Yellow):</h3>
        <div className="flex space-x-2">
          <div className="w-16 h-16 bg-warning-500 rounded-lg shadow-sm"></div>
          <div className="w-16 h-16 bg-warning-600 rounded-lg shadow-sm"></div>
          <div className="w-16 h-16 bg-warning-700 rounded-lg shadow-sm"></div>
        </div>
        <div className="text-sm text-neutral-600">
          <span className="text-warning-500">#F59E0B</span> | 
          <span className="text-warning-600">#EA580C</span> | 
          <span className="text-warning-700">#C2410C</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold poppins-semibold">Button Examples:</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg poppins-medium transition-all duration-200">
            Primary Button
          </button>
          <button className="bg-success-500 hover:bg-success-600 text-white px-6 py-3 rounded-lg poppins-medium transition-all duration-200">
            Success Button
          </button>
          <button className="bg-danger-500 hover:bg-danger-600 text-white px-6 py-3 rounded-lg poppins-medium transition-all duration-200">
            Danger Button
          </button>
          <button className="bg-warning-500 hover:bg-warning-600 text-white px-6 py-3 rounded-lg poppins-medium transition-all duration-200">
            Warning Button
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold poppins-semibold">Card Examples:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-neutral-white border border-primary-200 rounded-lg p-4 shadow-sm">
            <h4 className="text-primary-600 font-semibold poppins-semibold">Primary Card</h4>
            <p className="text-neutral-600 poppins-regular">This card uses primary colors</p>
          </div>
          <div className="bg-success-100 border border-success-200 rounded-lg p-4 shadow-sm">
            <h4 className="text-success-700 font-semibold poppins-semibold">Success Card</h4>
            <p className="text-success-600 poppins-regular">This card uses success colors</p>
          </div>
          <div className="bg-neutral-white border border-neutral-200 rounded-lg p-4 shadow-sm">
            <h4 className="text-neutral-800 font-semibold poppins-semibold">Neutral Card</h4>
            <p className="text-neutral-600 poppins-regular">This card uses neutral colors</p>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold poppins-semibold">Typography Examples:</h3>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary-600 poppins-bold">Heading 1 - Bold</h1>
          <h2 className="text-3xl font-semibold text-primary-500 poppins-semibold">Heading 2 - Semibold</h2>
          <h3 className="text-2xl font-medium text-neutral-800 poppins-medium">Heading 3 - Medium</h3>
          <p className="text-lg text-neutral-600 poppins-regular">Regular paragraph text</p>
          <p className="text-sm text-neutral-500 poppins-light">Light small text</p>
        </div>
      </div>
    </div>
  )
}
