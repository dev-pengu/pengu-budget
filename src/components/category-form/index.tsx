import React, { useState, useEffect } from 'react';
import formStyles from '../../styles/form.module.css';
import { titleCase } from '../../lib/string-util';

interface FormState {
  parentCategory: string;
  categoryName: string;
  active: boolean;
}

interface Props {
  groupID: string;
}

function CategoryForm(props: Props) {
  const [formState, setFormState] = useState<FormState>({
    parentCategory: '',
    categoryName: '',
    active: true,
  });
  const [parentCategories, setParentCategories] = useState<string[]>([]);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { groupID } = props;
  useEffect(() => {
    // TODO: implement dynamic parent category fetching
    const parentOptions = ['income', 'housing', 'transportation'];
    setParentCategories(parentOptions);
  }, [groupID]);

  const onSubmit = (event: React.FormEvent) => {
    setSubmitting(true);
    event.preventDefault();
    // TODO: implement form submission
    console.log(formState);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSubmitted(false);
    const target = event.target;
    switch (target.type) {
      case 'checkbox': {
        const value = (target as HTMLInputElement).checked;
        const name = target.name;
        setFormState({ ...formState, [name]: value });
        break;
      }
      default: {
        const value = target.value;
        const name = target.name;
        setFormState({ ...formState, [name]: value });
        break;
      }
    }
  };

  return (
    <form className={formStyles.form} onSubmit={onSubmit} method="POST">
      <div className={formStyles.inputGroup}>
        <label htmlFor="parentCategory" className={formStyles.inputLabel}>
          Category Group:
        </label>
        <select
          name="parentCategory"
          id="parentCategory"
          value={formState.parentCategory}
          onChange={handleInputChange}
          className={formStyles.formInput}
        >
          <option value="null"></option>
          {parentCategories &&
            parentCategories.map((category, index) => (
              <option key={index} value={category}>
                {titleCase(category)}
              </option>
            ))}
        </select>
      </div>
      <div className={formStyles.inputGroup}>
        <label htmlFor="categoryName" className={formStyles.inputLabel}>
          Name:
        </label>
        <input
          type="text"
          name="categoryName"
          id="categoryName"
          value={formState.categoryName}
          onChange={handleInputChange}
          className={formStyles.formInput}
        />
      </div>
      <div className={`${formStyles.inputGroup} ${formStyles.inlineGroup}`}>
        <label htmlFor="active" className={formStyles.inputLabel}>
          Active:
        </label>
        <span
          className={formStyles.switch}
          onClick={() =>
            setFormState({ ...formState, active: !formState.active })
          }
        >
          <input
            type="checkbox"
            name="active"
            id="active"
            checked={formState.active}
            onChange={handleInputChange}
          />
          <span className={formStyles.slider}></span>
        </span>
      </div>
      <div className={formStyles.inputGroup}>
        <button
          className={formStyles.submitBtn}
          type="submit"
          disabled={isSubmitting || submitted}
        >
          Submit
        </button>
        <div
          className={`${formStyles.loader} ${
            isSubmitting || submitted ? formStyles.active : ''
          }`}
        >
          <div
            className={`${formStyles.check} ${
              submitted ? formStyles.active : ''
            }`}
          >
            <span className={formStyles.checkOne}></span>
            <span className={formStyles.checkTwo}></span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CategoryForm;
