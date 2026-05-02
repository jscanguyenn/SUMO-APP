import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import AddTaskModal from './components/AddTaskModal'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('medmap-tasks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)

  useEffect(() => {
    localStorage.setItem('medmap-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks(prev => [
      ...prev,
      {
        ...task,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ])
    setShowAddModal(false)
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-slate-800">MedMap</span>
              <span className="text-slate-400 text-sm ml-2 hidden sm:inline">your medical to-do list</span>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Dashboard
          tasks={tasks}
          showCompleted={showCompleted}
          onToggleShowCompleted={() => setShowCompleted(p => !p)}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
        />
      </main>

      {/* Add task modal */}
      {showAddModal && (
        <AddTaskModal
          onAdd={addTask}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}

export default App
