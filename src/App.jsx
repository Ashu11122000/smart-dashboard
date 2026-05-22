// Import Navbar component
import Navbar from './components/layout/Navbar.jsx';

// Import reusable Card component
import Card from './components/common/Card.jsx';

// Main application component
export default function App() {

  // Return UI structure
  return (

    // Main app container with full screen height and background color
    <div className="min-h-screen bg-gray-100">

      {/* Navbar at top */}
      <Navbar />

      {/* Main content wrapper */}
      <main className="p-6">

        {/* Dashboard title */}
        <h1 className="text-3xl font-bold mb-6">
          Smart Dashboard
        </h1>

        {/* Grid layout for dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Counter placeholder */}
          <Card title="Counter Module">
            Coming in Phase 2
          </Card>

          {/* Form placeholder */}
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