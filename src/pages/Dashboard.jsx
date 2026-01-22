import React, { useState, useEffect } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import Charts from "../components/dashboard/Charts";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  getDashboardStats,
  getCompletionRate,
  getTopProjects,
  getProjectsTaskData,
  getUploadedPurposeData,
} from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTime: "156.75",
    avgTaskTime: "12.5",
    totalTasks: "24",
    totalProjects: "8"
  });
  
  // ✅ FIX: Changed 'completed' to 'value' and 'assigned' stays same
  const [completionData, setCompletionData] = useState([
    { name: "Project A", value: 15, assigned: 20 },
    { name: "Project B", value: 8, assigned: 12 },
    { name: "Project C", value: 22, assigned: 25 },
    { name: "Project D", value: 18, assigned: 30 },
    { name: "Project E", value: 12, assigned: 15 }
  ]);
  
  // ✅ FIX: Changed 'completedTasks' to 'value'
  const [topProjects, setTopProjects] = useState([
    { name: "Website Redesign", value: 25 },
    { name: "Mobile App", value: 18 },
    { name: "Marketing Campaign", value: 15 },
    { name: "Database Migration", value: 12 },
    { name: "API Development", value: 10 }
  ]);
  
  // ✅ FIX: Changed 'project' to 'name', 'completed' to 'Completed', 'assigned' to 'Assigned'
  const [projectsTaskData, setProjectsTaskData] = useState([
    { name: "Project A", Completed: 15, Assigned: 20 },
    { name: "Project B", Completed: 8, Assigned: 12 },
    { name: "Project C", Completed: 22, Assigned: 25 }
  ]);
  
  // ✅ FIX: Changed 'purpose' to 'name'
  const [uploadedPurpose, setUploadedPurpose] = useState([
    { name: "Design", count: 45 },
    { name: "Development", count: 32 },
    { name: "Testing", count: 28 },
    { name: "Documentation", count: 15 }
  ]);
  
  const [loading, setLoading] = useState(false);

  // Comment out the API calls for now
  /*
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        const [statsData, completionRateData, topProjectsData, projectsData, uploadedData] = 
          await Promise.all([
            getDashboardStats(),
            getCompletionRate(),
            getTopProjects(),
            getProjectsTaskData(),
            getUploadedPurposeData()
          ]);
        setStats(statsData);
        setCompletionData(completionRateData);
        setTopProjects(topProjectsData);
        setProjectsTaskData(projectsData);
        setUploadedPurpose(uploadedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);
  */

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        fontFamily: "Arial, sans-serif"
      }}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div style={{ 
        fontFamily: "Arial, sans-serif", 
        padding: 20, 
        background: "#f5f7fa" 
      }}>
        <h2>Project Time Tracking Dashboard</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: 20, 
          marginBottom: 30 
        }}>
          <StatsCard 
            title="Total Time (Hours)" 
            value={stats.totalTime} 
            subtitle="Total tracked hours" 
          />
          <StatsCard 
            title="Average Task Time (Hours)" 
            value={stats.avgTaskTime} 
            subtitle="Average time per task" 
          />
          <StatsCard 
            title="Total Tasks" 
            value={stats.totalTasks} 
            subtitle="Number of tasks" 
          />
          <StatsCard 
            title="Total Projects" 
            value={stats.totalProjects} 
            subtitle="Active projects" 
          />
        </div>
        <Charts
          completionData={completionData}
          topProjects={topProjects}
          projectsTaskData={projectsTaskData}
          uploadedPurpose={uploadedPurpose}
        />
      </div>
    </DragDropContext>
  );
}