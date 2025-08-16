import styles from "./UserModal.module.scss";

export const UserModal = ({ user, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.userHeader}>
          <img src={user.image} alt="Avatar" className={styles.avatar} />
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p className={styles.userTitle}>{user.company?.title}</p>
        </div>
        <div className={styles.userDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Возраст:</span>
            <span>{user.age}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Пол:</span>
            <span>{user.gender}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Email:</span>
            <span>{user.email}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Телефон:</span>
            <span>{user.phone}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Адрес:</span>
            <span>
              {user.address?.address}, {user.address?.city},{" "}
              {user.address?.state}, {user.address?.postalCode}
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Рост/Вес:</span>
            <span>
              {user.height} cm / {user.weight} kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
