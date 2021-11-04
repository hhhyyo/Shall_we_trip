import country from './country';

const formData = {
  countryName: {
    check(value) {
      return Object.prototype.hasOwnProperty.call(country, value);
    },
    errorMessage: '올바른 나라이름을 입력해주세요',
    validate: false,
  },
  title: {
    check(value) {
      return /^.{1,20}$/.test(value);
    },
    errorMessage: '1자이상 20자이하로 입력해주세요.',
    validate: false,
  },
  period: {
    check(value) {
      return value.length;
    },
    errorMessage: '여행기간을 선택해주세요.',
    validate: false,
  },
  budget: {
    check(value) {
      return value.length;
    },
    errorMessage: '예산을 입력해주세요.',
    validate: false,
  },
};

const getInputName = name => formData[name];
const isValid = (inputName, inputValue) => inputName.check(inputValue);
const isSubmit = allInputOfForm => [...allInputOfForm].every(inputType => formData[inputType.name].validate);

export { getInputName, isValid, isSubmit };
