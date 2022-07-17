const validator = require("validator")
const isEmpty = require("./isEmpty")

const valdationTodoInput = (data) => {
  let errors = {}

  // check todos input field
  if (isEmpty(data.content)) {
    errors.content = "Việc cần làm không thể trống"
  }else if(!validator.isLength(data.content, {min: 2, max: 300})){
    errors.content = "Việc cần làm nên có tối thiểu 2 ký tự"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = valdationTodoInput;