import Navbar from "./components/layout/Navbar";
import Card from "./components/common/Card";

import Counter from "./components/counter/Counter";
import UserForm from "./components/form/UserForm";
import TodoList from "./components/todo/TodoList";
import DebouncedSearch from "./components/search/DebounceSearch";
import Calculator from "./components/calculator/Calculator";
import Weather from "./components/weather/Weather";
import NotesApp from "./components/notes/NotesApp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Smart Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            <NotesApp />
          </Card>
        </div>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}