import styles from './Contact.module.css';

export default function Contact({ contact, onDelete }) {
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <h3 className={styles.name}>{contact.name}</h3>
        <p className={styles.number}>{contact.number}</p>
      </div>
      <button
        className={styles.button}
        onClick={() => onDelete(contact.id)}
      >
        Delete
      </button>
    </li>
  );
}