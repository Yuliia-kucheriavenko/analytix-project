module.exports = class UserDto {
  name;
  email;
  id;
  role;
  isActivated;

  constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.id = model._id;
    this.role = model.role;
    this.isActivated = model.isActivated;
  }
}
