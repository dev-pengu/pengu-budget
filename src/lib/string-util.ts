function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}

function formatNumberStringForCurrency(str: string) {
  return str.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatCurrency(pad: boolean, val: string) {
  let inputVal = val;
  if (inputVal === '') {
    return;
  }
  if (inputVal.indexOf('.') >= 0) {
    const decimalPos = inputVal.indexOf('.');
    let leftSide = inputVal.substring(0, decimalPos);
    let rightSide = inputVal.substring(decimalPos);
    leftSide = formatNumberStringForCurrency(leftSide);
    rightSide = formatNumberStringForCurrency(rightSide);

    if (pad) {
      rightSide += '00';
    }
    rightSide = rightSide.substring(0, 2);
    inputVal = '$' + leftSide + '.' + rightSide;
  } else {
    inputVal = formatNumberStringForCurrency(inputVal);
    inputVal = '$' + inputVal;

    if (pad) {
      inputVal += '.00';
    }
  }
  return inputVal;
}

export { titleCase, formatNumberStringForCurrency, formatCurrency };
