

const userService = require("./users.factory").createInstance();
const User = require("./users.entity");
module.exports = {
  "/users:get": async (req, res) => {
    res.end(JSON.stringify((await userService.index()) || []));
  },
  "/user:get": async (req, res) => {
    const { id } = req.queryString;
    const parsedIdToInt = Number(id);

    if (!id) {
      res.end(JSON.stringify({ error: true, message: "param id is required" }));
      return;
    }

    if (isNaN(parsedIdToInt)) {
      res.end(
        JSON.stringify({
          error: true,
          message: "invalid param data type make sure that is a number",
        })
      );
      return;
    }

    res.end(JSON.stringify((await userService.find(parsedIdToInt)) || {}));
  },

  '/user:post':async (req,res)=>{
   for await(let data of req){
    const item =JSON.parse(data)
      const user=new User(item.name, item.email, item.category)
      const id=await userService.create(user)
      res.end(JSON.stringify({id}))
   }
  }
};
