const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Error in validation', errors.array()))
      }
      const {name, email, password, role} = req.body;
      const userData = await userService.registration(name, email, password, role);
      const maxAgeForToken = 30 * 24 * 60 * 60 * 1000 
      res.cookie('refreshToken', userData.refreshToken, {maxAge: maxAgeForToken, httpOnly: true})

      return res.json(userData);

    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const {email, password, role} = req.body;
      const userData = await userService.login(email, password, role);
      const maxAgeForToken = 30 * 24 * 60 * 60 * 1000 
      res.cookie('refreshToken', userData.refreshToken, {maxAge: maxAgeForToken, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e)
    }
  }
  async loguot(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.loguot(refreshToken)
      res.clearCookie('refreshToken');
      return res.json(token)
    } catch (e) {
      next(e)

    }
  }
  async activate(req, res, next) {
    try {
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)

    }
  }
  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      const maxAgeForToken = 30 * 24 * 60 * 60 * 1000 
      res.cookie('refreshToken', userData.refreshToken, {maxAge: maxAgeForToken, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e)

    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController();