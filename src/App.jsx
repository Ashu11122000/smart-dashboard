// Import Navbar component
import Navbar from './components/layout/Navbar';

// Import reusable Card component
import Card from './components/common/Card';

// Import Counter component
import Counter from './components/counter/Counter';

// Main App component
export default function App() {

  // Return application UI
  return (

    // Full app wrapper
    <div className="min-h-screen bg-gray-100">

      {/* Top navigation */}
      <Navbar />

      {/* Main content area */}
      <main className="p-6">

        {/* Dashboard heading */}
        <h1 className="text-3xl font-bold mb-6">
          Smart Dashboard
        </h1>

        {/* Responsive dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Counter module */}
          <Card title="Counter Module">
            <Counter />
          </Card>

          {/* User form placeholder */}
          <Card title="User Form Module">
            Coming in Phase 3
          </Card>

          {/* Todo placeholder */}
          <Card title="Todo Module">
            Coming in Phase 4
          </Card>

        </div>
      </main>
    </div>
  );
}