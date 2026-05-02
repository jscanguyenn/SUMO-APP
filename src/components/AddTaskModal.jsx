import { useState } from 'react'
import TaskForm from './TaskForm'

const TASK_TYPES = [
  { id: 'lab', label: 'Labs', icon: '🧪', desc: 'Blood work, urine tests' },
  { id: 'imaging', label: 'Imaging', icon: '🩻', desc: 'CT, MRI, X-ray, Ultrasound' },
  { id: 'referral', label: 'Referral', icon: '👨‍⚕️', desc: 'See a specialist' },
  { id: 'screening', label: 'Screening', icon: '🔍', desc: 'Colonoscopy, mammogram, etc.' },
  { id: 'prescription', label: 'Pick Up Prescription', icon: '💊', desc: 'Medications to pick up' },
  { id: 'callback', label: 'Call Back', icon: '📞', desc: 'Call to make an appointment' },
]

export default function AddTaskModal({ onAdd, onClose }) {
  const [selectedType, setSelectedType] = useState(null)

  const selectedMeta = TASK_TYPES.find(t => t.id === selectedType)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <div>
            {selectedType && (
              <button
                onClick={() => setSelectedType(null)}
                className="text-xs text-blue-600 hover:text-blue-800 mb-0.5 flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            )}
            <h2 className="text-lg font-semibold text-slate-800">
              {selectedType ? `New ${selectedMeta.label} Task` : 'Add a Task'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6">
          {!selectedType ? (
            <div className="grid grid-cols-2 gap-3">
              {TASK_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className="flex flex-col items-start gap-1.5 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-semibold text-slate-800 text-sm">{type.label}</span>
                  <span className="text-xs text-slate-400">{type.desc}</span>
                </button>
              ))}
            </div>
          ) : (
            <TaskForm
              type={selectedType}
              onSubmit={onAdd}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
    </div>
  )
}
