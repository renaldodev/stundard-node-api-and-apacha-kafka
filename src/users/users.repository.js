const { readFile, writeFile } = require("fs/promises");
const { resolve } = require("path");

const kData = Symbol("kData");
const kRead = Symbol("KRead");
const kWrite = Symbol("KWrite");

class UserRepository {
  constructor(file) {
    this.file = file;
    this[kData] = [];
  }


  async [kRead]() {
    this[kData] = JSON.parse(
      await readFile(resolve("src", "users", this.file))
    );
  }

  async [kWrite]() {
    await writeFile(
      resolve("src", "users", this.file),
      JSON.stringify(this[kData],null,2)
    );
  }

  async find(id) {
    await this[kRead]();
    if (!id) return this[kData];
    return this[kData].find((item) => item._id === id);
  }

  async create(name, email, category, id) {
    await this[kRead]()
    this[kData].push({ name, email, category, _id: id });

    await this[kWrite]();
    return id;
  }
}

module.exports= UserRepository
