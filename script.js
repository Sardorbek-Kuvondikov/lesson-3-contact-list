const elform = document.querySelector(".js-contact-form");
const elNameInp = elform.querySelector(".js-name-input");
const elCloseInp = elform.querySelector(".js-close-input");
const elNumberInp = elform.querySelector(".js-number-input");
const elContactResult = document.querySelector(".js-contact-item");
const elTemplate = document.querySelector(".js-contact-template").content;

const array = [];

function addContactList(arr, node) {
  node.innerHTML = "";
  arr.forEach(function (contact, index) {
    const contactListClone = elTemplate.cloneNode(true);

    contactListClone.querySelector(".js-contact-name").textContent =
      contact.userName;
    contactListClone.querySelector(".js-contact-close-people").textContent =
      contact.userClose;
    contactListClone.querySelector(".js-contact-number").textContent =
      contact.userNumber;
    contactListClone.querySelector(
      ".js-contact-number"
    ).href = `tel:${contact.number}`;

    contactListClone.querySelector(".js-delete-btn").dataset.contactIndex =
      index;
    node.appendChild(contactListClone);
  });
}

// object push array ga
function renderContactList(name, close, number) {
  const obj = {
    userName: name,
    userClose: close,
    userNumber: number,
  };
  array.push(obj);
  console.log(array);
}

// input valuelari
elform.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputNameValue = elNameInp.value.trim();
  const inputCloseValue = elCloseInp.value.trim();
  const inputNumberValue = elNumberInp.value;

  const onceNumber = array.findIndex(function (item) {
    return item.userNumber == inputNumberValue;
  });
  if (onceNumber > -1) {
    elNumberInp.classList.add("is-invalid");
    return;
  } else {
    elNumberInp.classList.remove("is-invalid");
  }

  renderContactList(inputNameValue, inputCloseValue, inputNumberValue);

  addContactList(array, elContactResult);
});

// delete formulasi
function deleteContact(index) {
  array.splice(index, 1);
}
elContactResult.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-delete-btn")) {
    const deleteBtn = Number(evt.target.dataset.contactIndex);
    deleteContact(deleteBtn);
  }

  addContactList(array, elContactResult);
});
