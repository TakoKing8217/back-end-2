const houses = require("./db.json");

let houseID = 4;

module.exports = {
  getAllHouses: (req, res) => {
    res.status(200).send(houses);
  },
  deleteHouse: (req, res) => {
    let index = houses.findIndex((item) => item.id === +req.params.id);
    houses.splice(index, 1);
    res.status(200).send(houses);
  },
  createHouse: (req, res) => {
    let { address, price, imageURL } = req.body;
    let newHouse = {
      id: houseID,
      address: address,
      price: price,
      imageURL: imageURL,
    };
    houses.push(newHouse);
    houseID++;
    res.status(200).send(houses);
  },
  updateHouse: (req, res) => {
    console.log("hit");
    let id = req.params.id;
    let type = req.body.type;
    let index = houses.findIndex((item) => item.id === +id);
    if (type === "plus") {
      houses[index].price += 10000;
      res.status(200).send(houses);
    } else if (type === "minus" && houses[index].price - 10000 < 0) {
      houses[index].price = 0;
      res.status(200).send(houses);
    } else if (houses[index].price === 0) {
      res.status(400).send("cannot price below 0");
    } else if (type === "minus") {
      houses[index].price -= 10000;
      res.status(200).send(houses);
    }
  },
};
