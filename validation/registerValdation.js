const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  let errors = {};

  // check email field
  if(isEmpty(data.email)) {
    errors.email = "Email không được để trống";
  } else if(!Validator.isEmail(data.email)){
    errors.email = "Email không hợp lệ"
  }
    // check name field
    if(isEmpty(data.name)) {
      errors.name = "Tên không được trống";
    } else if(!Validator.isLength(data.name, {min: 2, max: 30})){
      errors.name = "Tên phải chứa ít nhất 2 ký tự";
    }
  
  // check password field
  if(isEmpty(data.password)) {
    errors.password = "Mật khẩu không được trống";
  } else if(!Validator.isLength(data.password, {min: 6, max: 100})){
    errors.password = "Mật khẩu phải chứa ít nhất 6 ký tự";
  }

   // check confirm password field
  if(isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Xác nhận mật khẩu không được trống";
  } else if(!Validator.equals(data.password, data.confirmPassword)){
    errors.confirmPassword = "Mật khẩu không khớp";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};


module.exports = validateRegisterInput;
