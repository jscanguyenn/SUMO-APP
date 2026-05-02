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
  imaging: 'bg-sky-100 text-sky-700',
  referral: 'bg-orange-100 text-orange-700',
  screening: 'bg-teal-100 text-teal-700',
  prescription: 'bg-pink-100 text-pink-700',
  callback: 'bg-amber-100 text-amber-700',
}

function formatDate(dateStr) {
  if (!dateStr) return null
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
  if (['lab', 'imaging', 'screening'].includes(task.type)) return task.orderingDoctor || null
  if (task.type === 'referral') return task.doctorName || null
  return null
}

// Small icon components for detail rows
function PhoneIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  )
}

function BodyIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function FastingIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function RxIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )
}

function DetailRow({ icon, text, multiline }) {
  const iconEl = {
    phone: <PhoneIcon />,
    note: <NoteIcon />,
    tag: <TagIcon />,
    body: <BodyIcon />,
    fasting: <FastingIcon />,
    rx: <RxIcon />,
  }[icon] || <TagIcon />

  return (
    <div className="flex items-start gap-1.5 text-sm text-slate-500">
      {iconEl}
      <span className={multiline ? 'whitespace-pre-wrap' : ''}>{text}</span>
    </div>
  )
}

function TaskDetails({ task }) {
  const rows = []

  if (task.type === 'lab') {
    if (task.fasting) rows.push({ icon: 'fasting', text: task.fasting })
    if (task.notes) rows.push({ icon: 'note', text: task.notes, multiline: true })
  }

  if (task.type === 'imaging') {
    if (task.imagingTypes?.length) rows.push({ icon: 'tag', text: task.imagingTypes.join(' · ') })
    if (task.bodyParts) rows.push({ icon: 'body', text: task.bodyParts })
    if (task.officePhone) rows.push({ icon: 'phone', text: task.officePhone })
    if (task.notes) rows.push({ icon: 'note', text: task.notes, multiline: true })
  }

  if (task.type === 'referral') {
    if (task.specialty) rows.push({ icon: 'tag', text: task.specialty })
    if (task.phoneNumber) rows.push({ icon: 'phone', text: task.phoneNumber })
  }

  if (task.type === 'screening') {
    if (task.screeningType) rows.push({ icon: 'tag', text: task.screeningType })
    if (task.phoneNumber) rows.push({ icon: 'phone', text: task.phoneNumber })
  }

  if (task.type === 'prescription') {
    if (task.prescriptionNames) rows.push({ icon: 'rx', text: task.prescriptionNames, multiline: true })
  }

  if (task.type === 'callback') {
    if (task.phoneNumber) rows.push({ icon: 'phone', text: task.phoneNumber })
  }

  if (!rows.length) return null

  return (
    <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
      {rows.map((row, i) => (
        <DetailRow key={i} icon={row.icon} text={row.text} multiline={row.multiline} />
      ))}
    </div>
  )
}

export default function TaskCard({ task, onToggleComplete, onDelete, onEdit }) {
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
            : 'border-slate-300 hover:border-teal-400'
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

        {/* Meta row: date + doctor */}
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
          {/* Callback doctor name in meta row */}
          {task.type === 'callback' && task.doctorName && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {task.doctorName}
            </span>
          )}
        </div>

        {/* Expanded task-specific details */}
        <TaskDetails task={task} />
      </div>

      {/* Edit + Delete buttons */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button
          onClick={onEdit}
          className="text-slate-300 hover:text-teal-500 transition-colors p-1"
          aria-label="Edit task"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="text-slate-300 hover:text-red-400 transition-colors p-1 -mr-1"
          aria-label="Delete task"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
