import TaskCard from './TaskCard'

function sortTasks(tasks) {
  const dated = tasks
    .filter(t => t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  const undated = tasks.filter(t => !t.dueDate)
  return [...dated, ...undated]
}

export default function Dashboard({
  tasks,
  showCompleted,
  onToggleShowCompleted,
  onToggleComplete,
  onDelete,
}) {
  const openTasks = sortTasks(tasks.filter(t => !t.completed))
  const completedTasks = sortTasks(tasks.filter(t => t.completed))
  const displayed = showCompleted ? completedTasks : openTasks

  return (
    <div>
      {/* Controls row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            {showCompleted ? 'Completed Tasks' : 'Open Tasks'}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {showCompleted
              ? `${completedTasks.length} task${completedTasks.length !== 1 ? 's' : ''} done`
              : `${openTasks.length} task${openTasks.length !== 1 ? 's' : ''} remaining`}
          </p>
        </div>

        <button
          onClick={onToggleShowCompleted}
          className="text-sm font-medium text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5"
        >
          {showCompleted ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              View Open
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              View Completed
            </>
          )}
        </button>
      </div>

      {/* Task list */}
      {displayed.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          {showCompleted ? (
            <>
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium text-slate-500">No completed tasks yet</p>
              <p className="text-sm mt-1">Mark a task as done and it'll appear here</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="font-medium text-slate-500">No open tasks</p>
              <p className="text-sm mt-1">Click <span className="font-medium text-blue-500">Add Task</span> to get started</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={() => onToggleComplete(task.id)}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
