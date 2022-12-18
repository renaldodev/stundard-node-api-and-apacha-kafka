const kValid = Symbol("kValid");

class User {
  constructor(name, email, category) {
    this._id = Math.random() * 100 + Date.now();
    this.name = name;
    this.email = email;
    this.category = category;
  }

  [kValid]() {
    const properties = Object.getOwnPropertyNames(this);
    const invalidProperties = properties
      .map((property) => (!!this[property] ? null : `${property} is missing`))
      .filter((prop) => !!prop);

    return {
      isValid: invalidProperties.length === 0,
      error: invalidProperties,
    };
  }

  validate() {
    return this[kValid]();
  }
};

module.exports = User;
