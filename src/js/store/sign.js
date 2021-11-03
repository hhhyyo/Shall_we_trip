const formData = {
  email: {
    RegExp: /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    errorMessage: '이메일 형식에 맞게 입력해주세요.',
    validate: false,
  },
  password: {
    RegExp: /^[A-Za-z0-9]{6,12}$/,
    errorMessage: '영문 또는 숫자를 6~12자로 입력해주세요.',
    validate: false,
  },
  confirmPassword: {
    errorMessage: '비밀번호가 일치하지 않습니다.',
    validate: false,
  },
  userName: {
    RegExp: /^[A-Za-z가-힣]{1,12}$/,
    errorMessage: '숫자, 공백, 특수문자 없이 입력해주세요.',
    validate: false,
  },
  phoneNumber: {
    RegExp: /[0-9]{10,11}$/,
    errorMessage: `'-' 없이 숫자만 입력해주세요.`,
    validate: false,
  },
  nickname: {
    RegExp: /^[A-Za-z가-힣]{1,12}$/,
    errorMessage: '특수 문자 없이 영문 혹은 한글로 1~6자 입력해주세요.',
    validate: false,
  },
};

const getInputName = name => formData[name];
const isValid = (inputName, inputValue) => inputName.RegExp.test(inputValue);
const isSamePassowrd = confirmPassword => confirmPassword === document.querySelector('.sign-up #password').value;
const isSubmit = allInputOfForm => [...allInputOfForm].every(inputType => formData[inputType.name].validate);

export { getInputName, isValid, isSamePassowrd, isSubmit };
