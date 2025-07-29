import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [goals, setGoals] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showDepositForm, setShowDepositForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [depositGoalId, setDepositGoalId] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  })

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:3000/goals')
      const data = await response.json()
      setGoals(data)
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  const addGoal = async (e) => {
    e.preventDefault()
    const goal = {
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal)
      })
      if (response.ok) {
        fetchGoals()
        setNewGoal({ name: '', targetAmount: '', category: '', deadline: '' })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Error adding goal:', error)
    }
  }

  const updateGoal = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/goals/${editingGoal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingGoal)
      })
      if (response.ok) {
        fetchGoals()
        setEditingGoal(null)
      }
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchGoals()
      }
    } catch (error) {
      console.error('Error deleting goal:', error)
    }
  }

  const makeDeposit = async (e) => {
    e.preventDefault()
    const goal = goals.find(g => g.id === depositGoalId)
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + parseFloat(depositAmount)
    }
    
    try {
      const response = await fetch(`http://localhost:3000/goals/${depositGoalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
      })
      if (response.ok) {
        fetchGoals()
        setDepositAmount('')
        setDepositGoalId('')
        setShowDepositForm(false)
      }
    } catch (error) {
      console.error('Error making deposit:', error)
    }
  }

  const getProgressPercentage = (saved, target) => {
    return Math.min((saved / target) * 100, 100)
  }

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getDeadlineStatus = (deadline, saved, target) => {
    const days = getDaysUntilDeadline(deadline)
    const isComplete = saved >= target
    
    if (isComplete) return 'complete'
    if (days < 0) return 'overdue'
    if (days <= 30) return 'warning'
    return 'normal'
  }

  const totalGoals = goals.length
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0)
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      
      <div className="overview">
        <div className="stat">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        <div className="stat">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        <div className="stat">
          <h3>Completed Goals</h3>
          <p>{completedGoals}</p>
        </div>
      </div>

      <div className="actions">
        <button onClick={() => setShowAddForm(true)}>Add New Goal</button>
        <button onClick={() => setShowDepositForm(true)}>Make Deposit</button>
      </div>

      {showAddForm && (
        <form onSubmit={addGoal} className="form">
          <h3>Add New Goal</h3>
          <input
            type="text"
            placeholder="Goal Name"
            value={newGoal.name}
            onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newGoal.category}
            onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
            required
          />
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
            required
          />
          <div>
            <button type="submit">Add Goal</button>
            <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {showDepositForm && (
        <form onSubmit={makeDeposit} className="form">
          <h3>Make Deposit</h3>
          <select
            value={depositGoalId}
            onChange={(e) => setDepositGoalId(e.target.value)}
            required
          >
            <option value="">Select Goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Deposit Amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            required
          />
          <div>
            <button type="submit">Make Deposit</button>
            <button type="button" onClick={() => setShowDepositForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {editingGoal && (
        <form onSubmit={updateGoal} className="form">
          <h3>Edit Goal</h3>
          <input
            type="text"
            value={editingGoal.name}
            onChange={(e) => setEditingGoal({...editingGoal, name: e.target.value})}
            required
          />
          <input
            type="number"
            value={editingGoal.targetAmount}
            onChange={(e) => setEditingGoal({...editingGoal, targetAmount: parseFloat(e.target.value)})}
            required
          />
          <input
            type="text"
            value={editingGoal.category}
            onChange={(e) => setEditingGoal({...editingGoal, category: e.target.value})}
            required
          />
          <input
            type="date"
            value={editingGoal.deadline}
            onChange={(e) => setEditingGoal({...editingGoal, deadline: e.target.value})}
            required
          />
          <div>
            <button type="submit">Update Goal</button>
            <button type="button" onClick={() => setEditingGoal(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="goals-grid">
        {goals.map(goal => {
          const progress = getProgressPercentage(goal.savedAmount, goal.targetAmount)
          const remaining = goal.targetAmount - goal.savedAmount
          const days = getDaysUntilDeadline(goal.deadline)
          const status = getDeadlineStatus(goal.deadline, goal.savedAmount, goal.targetAmount)
          
          return (
            <div key={goal.id} className={`goal-card ${status}`}>
              <h3>{goal.name}</h3>
              <p className="category">{goal.category}</p>
              
              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${progress}%`}}
                  ></div>
                </div>
                <p>{progress.toFixed(1)}% Complete</p>
              </div>
              
              <div className="amounts">
                <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
                <p>Target: ${goal.targetAmount.toLocaleString()}</p>
                <p>Remaining: ${remaining.toLocaleString()}</p>
              </div>
              
              <div className="deadline-info">
                {status === 'complete' && <p className="complete">✅ Goal Complete!</p>}
                {status === 'overdue' && <p className="overdue">⚠️ Overdue by {Math.abs(days)} days</p>}
                {status === 'warning' && <p className="warning">⚠️ {days} days remaining</p>}
                {status === 'normal' && <p>{days} days remaining</p>}
              </div>
              
              <div className="goal-actions">
                <button onClick={() => setEditingGoal(goal)}>Edit</button>
                <button onClick={() => deleteGoal(goal.id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
