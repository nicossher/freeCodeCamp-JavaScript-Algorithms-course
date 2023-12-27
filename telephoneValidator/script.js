const numberInput = document.querySelector("#user-input");
const checkBtn = document.querySelector("#check-btn");
const clearBtn = document.querySelector("#clear-btn");
const results = document.querySelector("#results-div");

const regex = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/;

checkBtn.addEventListener("click", () => {
  const number = numberInput.value;
  if (!number) {
    alert("Please provide a phone number");
  } else {
    const isValid = regex.test(number);
    const div = document.createElement("div");
    if (isValid) {
      div.innerHTML = `Valid US number: ${number}`;
      div.id = "result-div";
    } else {
      div.innerHTML = `Invalid US number: ${number}`;
      div.id = "result-div";
    }
    console.log(number);
    results.append(div);
  }
});

clearBtn.addEventListener("click", () => {
  results.innerHTML = "";
});
