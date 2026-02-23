import React from 'react'

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-background border rounded-xl shadow-sm p-6">
        <p className="text-sm text-muted-foreground">Total Queries</p>
        <p className="text-2xl font-semibold mt-2">1,240</p>
      </div>

      <div className="bg-background border rounded-xl shadow-sm p-6">
        <p className="text-sm text-muted-foreground">Active Users</p>
        <p className="text-2xl font-semibold mt-2">128</p>
      </div>

      <div className="bg-background border rounded-xl shadow-sm p-6">
        <p className="text-sm text-muted-foreground">Success Rate</p>
        <p className="text-2xl font-semibold mt-2">98%</p>
      </div>
    </div>
  );
}

export default Dashboard