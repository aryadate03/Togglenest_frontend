import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import taskService from '../services/taskService';
import '../styles/Kanban.css';

// Sortable Task Card Component
const SortableTaskCard = ({ task, getPriorityColor }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <h3 className="task-title">{task.title}</h3>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span 
          className="task-priority"
          style={{
            backgroundColor: getPriorityColor(task.priority) + '20',
            color: getPriorityColor(task.priority)
          }}
        >
          {task.priority}
        </span>

        {task.projectId?.title && (
          <span className="task-project">
            📁 {task.projectId.title}
          </span>
        )}

        {task.dueDate && (
          <span className="task-due-date">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {task.assignedTo && (
        <div className="task-assignee">
          <div className="assignee-avatar">
            {task.assignedTo.name?.charAt(0).toUpperCase()}
          </div>
          <span>{task.assignedTo.name}</span>
        </div>
      )}
    </div>
  );
};

// Droppable Column Component
const DroppableColumn = ({ column, tasks, getPriorityColor }) => {
  return (
    <div className="kanban-column">
      <div className="column-header" style={{ borderTopColor: column.color }}>
        <h2>{column.title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>

      <SortableContext items={tasks.map(t => t._id)}>
        <div className="column-content">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task._id}
              task={task}
              getPriorityColor={getPriorityColor}
            />
          ))}
          
          {tasks.length === 0 && (
            <div className="empty-column">No tasks</div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

// Main Kanban Component
const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      console.log('✅ Kanban - Fetched tasks:', response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(t => t._id === active.id);
    const overColumn = over.id;

    // Check if dropping on a column (not another task)
    if (['todo', 'in-progress', 'done'].includes(overColumn)) {
      if (activeTask.status !== overColumn) {
        setTasks(tasks.map(task => 
          task._id === active.id 
            ? { ...task, status: overColumn }
            : task
        ));
      }
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find(t => t._id === active.id);
    let newStatus = activeTask.status;

    // Determine new status
    if (['todo', 'in-progress', 'done'].includes(over.id)) {
      newStatus = over.id;
    } else {
      const overTask = tasks.find(t => t._id === over.id);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    // Only update if status changed
    if (activeTask.status !== newStatus) {
      try {
        console.log(`🔄 Moving task ${active.id} to ${newStatus}`);
        
        // Update via API
        await taskService.updateTaskStatus(active.id, newStatus);
        
        // Refresh tasks
        await fetchTasks();
        
        console.log('✅ Task status updated successfully');
      } catch (error) {
        console.error('❌ Error updating task:', error);
        alert('Failed to update task status');
        // Revert on error
        await fetchTasks();
      }
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const columns = [
    { id: 'todo', title: 'To Do', color: '#3b82f6' },
    { id: 'in-progress', title: 'In Progress', color: '#f59e0b' },
    { id: 'done', title: 'Done', color: '#10b981' }
  ];

  if (loading) {
    return <div className="kanban-loading">Loading Kanban board...</div>;
  }

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <h1>Kanban Board</h1>
        <button className="refresh-btn" onClick={fetchTasks}>
          🔄 Refresh
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {columns.map((column) => (
            <DroppableColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="task-card dragging">
              {tasks.find(t => t._id === activeId)?.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Kanban;