import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  number: Yup.string()
  .matches(
    /^\d{3}-\d{2}-\d{2}$/,
    'Неправильний номер телефону! Формат повинен бути XXX-XX-XX'
  )
  .required('Required'),
});

export default function ContactForm({ onAdd }) {
  const handleSubmit = (values, { resetForm }) => {
    onAdd(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>
            Name
            <Field className={styles.input} type="text" name="name" />
            <ErrorMessage className={styles.error} name="name" component="div" />
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Number
            <Field className={styles.input} type="tel" name="number" />
            <ErrorMessage className={styles.error} name="number" component="div" />
          </label>
        </div>

        <button className={styles.button} type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}