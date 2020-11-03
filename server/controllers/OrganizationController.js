class OrganizationController {

static index(req, res, next) {
  res.status(200).json({message: 'Get Organization'})
}

static store(req, res, next) {
  res.status(200).json({message: 'Store Organization'})
}

static update(req, res, next) {
  res.status(200).json({message: 'Update Organization'})
}

static destroy(req, res, next) {
  res.status(200).json({message: 'Delete Organization'})
}

}

module.exports = OrganizationController;