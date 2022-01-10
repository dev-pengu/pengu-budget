import React from 'react';
import logo from './logo.svg';
import './App.css';
import BudgetForm from './components/budget-form';
import CategoryForm from './components/category-form';
import CategoryGroupForm from './components/parent-category-form';

function App() {
  return (
    <div className="App">
      <BudgetForm />
      {/* <CategoryForm groupID={''} /> */}
      {/* <CategoryGroupForm /> */}
    </div>
  );
}

export default App;
