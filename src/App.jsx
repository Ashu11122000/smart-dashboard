import Navbar from "./components/layout/Navbar";
import Card from "./components/common/Card";

import Counter from "./components/counter/Counter";
import UserForm from "./components/form/UserForm";
import TodoList from "./components/todo/TodoList";
import DebouncedSearch from "./components/search/DebounceSearch";
import Calculator from "./components/calculator/Calculator";
import Weather from "./components/weather/Weather";
import NoteApp from "./components/notes/NoteApp";

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
            <TodoList />
          </Card>

          <Card title="Debounced Search Module">
            <DebouncedSearch />
          </Card>

          <Card title="Calculator Module">
            <Calculator />
          </Card>

          <Card title="Weather Module">
            <Weather />
          </Card>

          <Card title="Notes Module">
            <NoteApp />
          </Card>
        </div>
      </main>
    </div>
  );
}