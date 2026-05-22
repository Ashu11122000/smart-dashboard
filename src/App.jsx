// Import Navbar component
import Navbar from './components/layout/Navbar';

// Import reusable Card component
import Card from './components/common/Card';

// Import Counter component
import Counter from './components/counter/Counter';

// Import UserForm component
import UserForm from './components/form/UserForm';

// Main application component
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Smart Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Counter Module">
            <Counter />
          </Card>

          <Card title="User Form Module">
            <UserForm />
          </Card>

          <Card title="Todo Module">
            Coming in Phase 4
          </Card>
        </div>
      </main>
    </div>
  );
}