class Seat {
  constructor(name) {
    (this.name = name),
      (this.isBooked = false),
      (this.booking = []);
  }
}

const generateSeat = (numberOfSeat = 1) => {
  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const result = [];
  for (let i = 1; i <= numberOfSeat; i++) {
    const name = `${i}${alpha[i-1]}`
    result.push(new Seat(name));
  }

  return result;
};

module.exports = {
  generateSeat,
};
