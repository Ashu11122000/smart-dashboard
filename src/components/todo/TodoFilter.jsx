// Import reusable Button component
import Button from '../common/Button';

// Filter component
export default function TodoFilter({ currentFilter, onFilterChange }) {

  // Available filter options
  const filters = ['all', 'active', 'completed'];

  // Return filter buttons
  return (
    <div className="flex gap-3 flex-wrap">

      {/* Render all filter buttons */}
      {filters.map((filter) => (
        <Button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={
            currentFilter === filter
              ? 'bg-blue-700'
              : 'bg-blue-500'
          }
        >
          {filter}
        </Button>
      ))}

    </div>
  );
}