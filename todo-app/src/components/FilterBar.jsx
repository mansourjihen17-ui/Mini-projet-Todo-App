const filters = [
  ['all', 'Toutes'],
  ['active', 'Actives'],
  ['completed', 'Terminées'],
]

function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="filters" aria-label="Filtrer les tâches">
      {filters.map(([value, label]) => (
        <button
          key={value}
          type="button"
          className={`filter-button${filter === value ? ' is-selected' : ''}`}
          aria-pressed={filter === value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
