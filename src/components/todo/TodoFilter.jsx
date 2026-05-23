import Button from '../common/Button';

export default function TodoFilter({ currentFilter, onFilterChange }) {
    const filters = ['all', 'active', 'completed'];

    return (
        <div className="flex gap-3 flex-wrap">
            {filters.map((filter) => (
                <Button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`
                        capitalize
                        w-full
                        sm:w-auto
                        ${
                            currentFilter === filter
                                ? 'bg-blue-700'
                                : 'bg-blue-500'
                        }
                    `}
                >
                    {filter}
                </Button>
            ))}
        </div>
    );
}