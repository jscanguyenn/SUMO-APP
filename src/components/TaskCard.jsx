const TYPE_LABELS = {
  lab: 'Labs',
  imaging: 'Imaging',
  referral: 'Referral',
  screening: 'Screening',
  prescription: 'Prescription',
  callback: 'Call Back',
}

const TYPE_COLORS = {
  lab: 'bg-purple-100 text-purple-700',
  imaging: 'bg-blue-100 text-blue-700',
  referral: 'bg-orange-100 text-orange-700',
  screening: 'bg-teal-100 text-teal-700',
  prescription: 'bg-pink-100 text-pink-700',
  callback: 'bg-amber-100 text-amber-700',
}

function formatDate(dateStr) {
  if (!dateStr) return null
  // Parse as local date to avoid UTC offset shifting the day
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function isOverdue(dateStr) {
  if (!dateStr) return false
  const [year, month, day] = dateStr.split('-').map(Number)
  const due = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return due < today
}

function getDoctorName(task) {
  // Only show doctor on card for Labs, Imaging, Referrals, Screenings (per spec)
  if (['lab', 'imaging', 'screening'].includes(task.type)) return task.orderingDoctor || null
  if (task.type === 'referral') return task.doctorName || null
  return null
}

export default function TaskCard({ task, onToggleComplete, onDelete }) {
  const doctorName = getDoctorName(task)
  const formattedDate = task.dueDate ? formatDate(task.dueDate) : null
  const overdue = !task.completed && isOverdue(task.dueDate)

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm p-4 flex gap-3 items-start transition-all ${
        task.completed ? 'opacity-55' : ''
      } ${overdue ? 'border-red-200' : 'border-slate-200'}`}
    >
      {/* Completion toggle */}
      <button
        onClick={onToggleComplete}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-slate-300 hover:border-blue-400'
        }`}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && (
          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[task.type]}`}>
            {TYPE_LABELS[task.type]}
          </span>
          {task.completed && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              Complete
            </span>
          )}
          {overdue && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
              Overdue
            </span>
          )}
        </div>

        {/* Task name */}
        <p className={`font-semibold text-slate-800 ${task.completed ? 'line-through text-slate-400' : ''}`}>
          {task.taskName}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-slate-500">
          {formattedDate && (
            <span className={`flex items-center gap-1 ${overdue ? 'text-red-500 font-medium' : ''}`}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </span>
          )}
          {doctorName && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {doctorName}
            </span>
          )}
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0 p-1 -mr-1"
        aria-label="Delete task"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}
