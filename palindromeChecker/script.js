const textInput = document.querySelector("#text-input");
const btn = document.querySelector("#check-btn");
const result = document.querySelector("#result");

btn.addEventListener("click", () => {
  const text = textInput.value;
  console.log(text);

  if (text === "") {
    alert("Please input a value");
  }

  const textTransform = text.toLowerCase().replace(/[\.,_;\s\W]/g, "");
  const textReverse = textTransform.split("").reverse().join("");

  console.log(textTransform);
  console.log(textReverse);

  if (textTransform === textReverse) {
    result.innerHTML = `${text} is a Palindrome`;
  } else {
    result.innerHTML = `${text} is not a Palindrome`;
  }
});
