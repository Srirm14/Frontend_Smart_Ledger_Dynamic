import React from 'react'
import { headings, labels, buttons, cards, inputs, tables, status, layout, spacing } from '@/styles'

export default function StyleDemo() {
  return (
    <div className={layout.container}>
      <div className={spacing.sectionLarge}>
        {/* Headings Demo */}
        <div className={cards.elevated}>
          <h1 className={headings.h1}>Heading 1 - Main Title</h1>
          <h2 className={headings.h2}>Heading 2 - Section Title</h2>
          <h3 className={headings.h3}>Heading 3 - Subsection</h3>
          <h4 className={headings.h4}>Heading 4 - Card Title</h4>
          <h5 className={headings.h5}>Heading 5 - Small Title</h5>
          <h6 className={headings.h6}>Heading 6 - Label Title</h6>
        </div>

        {/* Labels Demo */}
        <div className={cards.standard}>
          <div className="space-y-4">
            <div className={labels.primary}>Primary Label</div>
            <div className={labels.secondary}>Secondary Label</div>
            <div className={labels.tertiary}>Tertiary Label</div>
            <div className={labels.quaternary}>Quaternary Label</div>
            <div className={labels.muted}>Muted Label</div>
          </div>
        </div>

        {/* Buttons Demo */}
        <div className={cards.standard}>
          <div className="space-x-4 space-y-4">
            <button className={buttons.primary}>Primary Button</button>
            <button className={buttons.secondary}>Secondary Button</button>
            <button className={buttons.tertiary}>Tertiary Button</button>
            <button className={buttons.destructive}>Destructive Button</button>
            <button className={buttons.ghost}>Ghost Button</button>
          </div>
        </div>

        {/* Cards Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={cards.elevated}>
            <h4 className={headings.h4}>Elevated Card</h4>
            <p className="text-gray-600 mt-2">This is an elevated card with shadow and padding.</p>
          </div>
          <div className={cards.standard}>
            <h4 className={headings.h4}>Standard Card</h4>
            <p className="text-gray-600 mt-2">This is a standard card with medium shadow.</p>
          </div>
          <div className={cards.accent}>
            <h4 className={headings.h4}>Accent Card</h4>
            <p className="text-gray-600 mt-2">This is an accent card with purple background.</p>
          </div>
        </div>

        {/* Inputs Demo */}
        <div className={cards.standard}>
          <h4 className={headings.h4}>Input Fields</h4>
          <div className="space-y-4 mt-4">
            <input 
              type="text" 
              placeholder="Large Input Field" 
              className={inputs.large}
            />
            <input 
              type="text" 
              placeholder="Medium Input Field" 
              className={inputs.medium}
            />
            <input 
              type="text" 
              placeholder="Small Input Field" 
              className={inputs.small}
            />
          </div>
        </div>

        {/* Status Demo */}
        <div className={cards.standard}>
          <h4 className={headings.h4}>Status Badges</h4>
          <div className="space-x-4 mt-4">
            <span className={status.active}>Active</span>
            <span className={status.inactive}>Inactive</span>
            <span className={status.pending}>Pending</span>
            <span className={status.error}>Error</span>
          </div>
        </div>

        {/* Table Demo */}
        <div className={cards.standard}>
          <h4 className={headings.h4}>Table Example</h4>
          <div className={tables.container}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className={tables.header}>Name</th>
                  <th className={tables.header}>Status</th>
                  <th className={tables.header}>Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className={tables.cell}>John Doe</td>
                  <td className={tables.cell}>
                    <span className={status.active}>Active</span>
                  </td>
                  <td className={tables.cellSecondary}>₹1,250.00</td>
                </tr>
                <tr>
                  <td className={tables.cell}>Jane Smith</td>
                  <td className={tables.cell}>
                    <span className={status.pending}>Pending</span>
                  </td>
                  <td className={tables.cellSecondary}>₹2,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
