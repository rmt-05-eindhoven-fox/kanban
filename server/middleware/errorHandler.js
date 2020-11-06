
function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeUniqueConstraintError') {
    let result = []
    for (let i = 0; i < err.errors.length; i++) {
      result.push(err.errors[i].message)
    }
    res.status(500).json(result)
  } else if (err.name === "SequelizeValidationError") {
    let result = []
    for (let i = 0; i < err.errors.length; i++) {
      result.push(err.errors[i].message)
    }
    res.status(500).json(result)
  } else if (err.status == 401) {
    res.status(401).json(err.msg)
  } else if (err.status == 400) {
    res.status(400).json(err.msg)
  }
  console.log(err)
}

module.exports = errorHandler