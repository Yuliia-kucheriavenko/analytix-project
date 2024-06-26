const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
  async registration(name, email, password, role) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`User with ${email} is already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({name, email, password: hashPassword, role, activationLink })
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }
  async login(email, password, role) {
    const user = await UserModel.findOne({email})
    if (!user) {
      throw ApiError.BadRequest(`User with ${email} is not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid password');
    }
    if(!role) {
      throw ApiError.UnauthorizedError();
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }

  async loguot(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token
  }
  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {...tokens, user: userDto}
  }
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();