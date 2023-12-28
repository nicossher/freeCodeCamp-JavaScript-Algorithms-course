const changeBox = document.querySelector("#changes");
const cashInput = document.querySelector("#cash");
const btn = document.querySelector("#purchase-btn");
const result = document.querySelector("#change-due");

const price = 3.26;

const cid = [
  { name: "Penny", amount: 1.01, value: 0.01 },
  { name: "Nickle", amount: 2.05, value: 0.05 },
  { name: "Dime", amount: 3.1, value: 0.1 },
  { name: "Quarter", amount: 4.25, value: 0.25 },
  { name: "One", amount: 90, value: 1 },
  { name: "Five", amount: 55, value: 5 },
  { name: "Ten", amount: 20, value: 10 },
  { name: "Twenty", amount: 60, value: 20 },
  { name: "Hundred", amount: 100, value: 100 },
];

function displayCID() {
  const cidContainer = document.createElement("div");

  cid.forEach((coin) => {
    const coinElement = document.createElement("div");
    coinElement.textContent = `${coin.name}: $${coin.amount.toFixed(2)}`;
    cidContainer.appendChild(coinElement);
  });
  changeBox.innerHTML = "";
  changeBox.appendChild(cidContainer);
}

displayCID();

btn.addEventListener("click", () => {
  const cash = cashInput.value;

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash == price) {
    result.innerHTML = "No change due - customer paid with exact cash";
  } else {
    calculateChange(cash);
  }
});

function calculateChange(cash) {
  let changeDue = cash - price;
  let availableChange = getTotalCID();

  if (changeDue > availableChange) {
    alert("Insufficient funds in the cash drawer to give change");
    return;
  }

  let change = [];
  let remainingChangeDue = changeDue;

  cid.forEach((coin) => {
    if (coin.value <= remainingChangeDue && coin.amount > 0) {
      let coinUsed = Math.min(
        coin.amount,
        Math.floor(remainingChangeDue / coin.value) * coin.value
      );
      change.push({ name: coin.name, amount: coinUsed });
      remainingChangeDue = parseFloat(
        (remainingChangeDue - coinUsed).toFixed(2)
      );
    }
  });

  if (remainingChangeDue !== 0) {
    alert("Sorry, exact change cannot be given.");
    return;
  }

  updateCID(change);
  displayChange(change);
  displayCID();
}

function getTotalCID() {
  return cid.reduce((total, coin) => total + coin.amount * coin.value, 0);
}

function updateCID(change) {
  change.forEach((changeItem) => {
    let coin = cid.find((c) => c.name === changeItem.name);
    coin.amount -= changeItem.amount;
  });
}

function displayChange(change) {
  let changeContainer = document.createElement("div");
  changeContainer.innerHTML = "<h3>Status: OPEN</h3>";

  change.forEach((coin) => {
    let coinElement = document.createElement("div");
    coinElement.textContent = `${coin.name}: $${coin.amount.toFixed(2)}`;
    changeContainer.appendChild(coinElement);
  });

  result.innerHTML = "";
  result.appendChild(changeContainer);
}
