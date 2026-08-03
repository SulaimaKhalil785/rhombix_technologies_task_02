function CategoryFilter({ category, setCategory }) {
  return (
    <div className="category-filter">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Electronic">Electronic</option>
        <option value="Classical">Classical</option>
      </select>
    </div>
  );
}

export default CategoryFilter;