import { useMemo, useState, useCallback } from "react";
import { useUsersData } from "../../hooks/useUsersData";
import { useTableLogic } from "../../hooks/useTableLogic";
import { TableView } from "../TableView/TableView";
import { Pagination } from "../Pagintation/Pagination";
import { UserModal } from "../UserModal/UserModal";
import styles from "./UsersTable.module.scss";

const USERS_PER_PAGE = 10;

export const UsersTable = () => {
  const { users, loading, error } = useUsersData();
  const {
    filteredUsers,
    sortConfig,
    filters,
    columnWidths,
    handleSort,
    handleFilterChange,
    setColumnWidths,
  } = useTableLogic(users);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const { totalPages, currentUsers } = useMemo(() => {
    const total = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const users = filteredUsers.slice(
      (currentPage - 1) * USERS_PER_PAGE,
      currentPage * USERS_PER_PAGE
    );
    return { totalPages: total, currentUsers: users };
  }, [filteredUsers, currentPage]);

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (loading) return <div className={styles.loading}>Загрузка данных...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
      <TableView
        users={currentUsers}
        sortConfig={sortConfig}
        filters={filters}
        columnWidths={columnWidths}
        handleSort={handleSort}
        handleFilterChange={handleFilterChange}
        setColumnWidths={setColumnWidths}
        onRowClick={setSelectedUser}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};
