import styles from "./TableView.module.scss";

export const TableView = ({
  users,
  sortConfig,
  filters,
  columnWidths,
  handleSort,
  handleFilterChange,
  setColumnWidths,
  onRowClick,
}) => {
  const handleResize = (key, startWidth, startX) => {
    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth >= 50) {
        setColumnWidths((prev) => ({ ...prev, [key]: newWidth }));
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {[
            { key: "lastName", label: "Фамилия" },
            { key: "firstName", label: "Имя" },
            { key: "age", label: "Возраст" },
            { key: "gender", label: "Пол" },
            { key: "phone", label: "Телефон" },
            { key: "email", label: "Email" },
            { key: "country", label: "Страна" },
            { key: "city", label: "Город" },
          ].map(({ key, label }) => (
            <th
              key={key}
              style={{ width: `${columnWidths[key]}px` }}
              onClick={() => handleSort(key)}
            >
              <div className={styles.headerContent}>
                {label}
                {sortConfig.key === key && (
                  <span className={styles.sortIcon}>
                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </div>
              <div
                className={styles.resizeHandle}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleResize(key, columnWidths[key], e.clientX);
                }}
              />
            </th>
          ))}
        </tr>
        <tr className={styles.filters}>
          {Object.keys(filters).map((key) => (
            <td key={key}>
              <input
                type={key === "age" ? "number" : "text"}
                placeholder={`Фильтр...`}
                value={filters[key]}
                onChange={(e) => handleFilterChange(key, e.target.value)}
              />
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => onRowClick(user)}>
            <td>{user.lastName}</td>
            <td>{user.firstName}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.address?.country}</td>
            <td>{user.address?.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
