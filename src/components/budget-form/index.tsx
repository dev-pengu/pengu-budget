import React, { useState } from 'react';
import formStyles from '../../styles/form.module.css';

interface FormState {
  budgetString: string;
  category: string;
  parentCategory: string;
  budgeted: number;
  notes: string;
}

function getCategories(parentCategory: string) {
  switch (parentCategory) {
    case 'income': {
      return ['Matt', 'Vanessa', 'Extra'];
    }
    case 'housing': {
      return ['Mortgage', 'Water/Electricity/Trash', 'Gas', 'Internet'];
    }
    case 'transportation': {
      return ['Gas', 'Maintenance'];
    }
    default: {
      return [];
    }
  }
}
// TODO: implement dynamic category fetching

function BudgetForm() {
  const [formState, setFormState] = useState<FormState>({
    budgetString: '',
    parentCategory: '',
    category: '',
    budgeted: 0,
    notes: '',
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [currencyString, setCurrencyString] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSubmitted(false);
    const target = event.target;
    if (target.name === 'budgeted') {
      const value = target.value.replace('$', '').replace(',', '');
      const name = target.name;
      setFormState({ ...formState, [name]: parseFloat(value) });
      formatCurrency(false, value);
      return;
    }
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
    if (target.name === 'parentCategory') {
      setCategories(getCategories(target.value));
    }
  };

  const formatNumber = (n: string) => {
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatCurrency = (blur: boolean, val?: string) => {
    let inputVal = val || currencyString;
    if (inputVal === '') {
      return;
    }
    if (inputVal.indexOf('.') >= 0) {
      const decimalPos = inputVal.indexOf('.');
      let leftSide = inputVal.substring(0, decimalPos);
      let rightSide = inputVal.substring(decimalPos);
      leftSide = formatNumber(leftSide);
      rightSide = formatNumber(rightSide);

      if (blur) {
        rightSide += '00';
      }
      rightSide = rightSide.substring(0, 2);
      inputVal = '$' + leftSide + '.' + rightSide;
    } else {
      inputVal = formatNumber(inputVal);
      inputVal = '$' + inputVal;

      if (blur) {
        inputVal += '.00';
      }
    }
    setCurrencyString(inputVal);
  };

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
          <option value="income">Income</option>
          <option value="housing">Housing</option>
          <option value="transportation">Transportation</option>
        </select>
      </div>
      <div className={formStyles.inputGroup}>
        <label htmlFor="category" className={formStyles.inputLabel}>
          Category:
        </label>
        <select
          name="category"
          id="category"
          value={formState.category}
          onChange={handleInputChange}
          className={formStyles.formInput}
        >
          <option value="null"></option>
          {categories &&
            categories.map((category, index) => (
              <option
                value={category.toLowerCase().replaceAll('/', '_')}
                key={index}
              >
                {category}
              </option>
            ))}
        </select>
      </div>
      <div className={formStyles.inputGroup}>
        <label htmlFor="budgeted" className={formStyles.inputLabel}>
          Amount:
        </label>
        <input
          type="text"
          name="budgeted"
          id="budgeted"
          pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
          value={currencyString}
          data-type="currency"
          placeholder="$0.00"
          onChange={handleInputChange}
          onBlur={() => formatCurrency(true)}
          className={formStyles.formInput}
        />
      </div>
      <div className={formStyles.inputGroup}>
        <label htmlFor="notes" className={formStyles.inputLabel}>
          Notes:
        </label>
        <textarea
          name="notes"
          id="notes"
          value={formState.notes}
          onChange={(event) => {
            setFormState({ ...formState, ['notes']: event.target.value });
          }}
          className={formStyles.formInput}
          rows={8}
        />
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

export default BudgetForm;
