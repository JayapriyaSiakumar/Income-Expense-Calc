//! Getting elements from html
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const netBalance = document.getElementById("netBalance");
const form1 = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const noData = document.getElementById("noData");
const filterGroup = document.getElementById("filterGroup");
const filterOption = document.getElementsByName("filterOption");
const error = document.getElementById("error");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const reports = document.getElementById("reports");
const heading = document.getElementById("heading");
const idEle = document.getElementById("id");
const tr = document.getElementsByTagName("tr");

let data = [];

//form validation
const formValidation = () => {
  if (description.value === "" || amount === "") {
    error.innerHTML = "Provide Information";
  } else {
    error.innerHTML = "";
    getData();
    //console.log(data);
    resetBtn.click();
  }
};

// Add report from form
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//getData
const getData = () => {
  if (idEle.value === "") {
    data.push({
      description: description.value,
      amount: amount.value,
      type: type.value,
    });
  } else {
    let i = idEle.value;

    data[i].description = description.value;
    data[i].amount = amount.value;
    data[i].type = type.value;
    //submitBtn.innerText = "Submit";
  }
  // storage (browser storage)
  localStorage.setItem("data", JSON.stringify(data));

  createTable(data);
  total(data);
};

const total = (data) => {
  let totalIncomeValue = 0;
  let totalExpenseValue = 0;
  let netBalanceValue = 0;

  // Total income / expense calculation
  console.log(data);
  data.forEach((ele) => {
    if (ele.type === "income") {
      totalIncomeValue += Number(ele.amount);
    }
    if (ele.type === "expense") {
      totalExpenseValue += Number(ele.amount);
    }
  });
  netBalanceValue = totalIncomeValue - totalExpenseValue;
  totalIncome.innerText = totalIncomeValue;
  totalExpense.innerText = totalExpenseValue;
  netBalance.innerText = netBalanceValue;
};
filterOption.forEach((ele) => {
  ele.addEventListener("click", () => {
    let filter = ele.value;
    let filteredData = data;
    if (filter === "income") {
      filteredData = data.filter((ele) => ele.type === "income");
    } else if (filter === "expense") {
      filteredData = data.filter((ele) => ele.type === "expense");
    }
    if (filteredData.length > 0) {
      createTable(filteredData);
    } else {
      reports.innerHTML = "<h2>No Data</h2>";
    }
  });
});
// create  table

const createTable = (data) => {
  let str = "";
  str += `
<div class="relative overflow-x-auto overflow-y-scroll h-75">
    <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-600">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Type 
                </th>
                <th scope="col" class="px-6 py-3 text-right">
                    Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>`;

  data.map((ele, id) => {
    return (str += `
            <tr id="${id}" class="bg-white border-b  border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${ele.description}
                </th>
                <td class="px-6 py-4 text-gray-900">
                    ${ele.type}
                </td>
                <td class="px-6 py-4 text-right text-gray-900">
                    ${ele.amount}
                </td>
                <td class="px-6 py-4 text-gray-900" >
                    <i class="fa-solid fa-pen-to-square fa-beat  cursor-pointer sm:mr-2 md:mr-1"  onclick="editReport(this)"></i>
                    <i class="fa-solid fa-trash fa-shake cursor-pointer" onclick="deleteReport(this)" ></i>
                </td>
            </tr>`);
  });
  str += `</tbody>
    </table>
</div>`;

  reports.innerHTML = str;
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  // console.log(data);

  if (data.length > 0) {
    createTable(data);
    total(data);
  }
})();
//! Update Function
const editReport = (ele) => {
  let result = ele.parentElement.parentElement;
  description.value = result.children[0].innerText;
  type.value = result.children[1].innerText;
  amount.value = result.children[2].innerText;
  submitBtn.innerText = "Update";
  heading.innerText = "Edit Money";
  idEle.value = result.getAttribute("id");
  for (let i = 0; i < tr.length; i++) {
    tr[i].style.background = "";
  }
  result.style.backgroundColor = "gray";
};
//! Delete function
const deleteReport = (ele) => {
  if (idEle.value !== "") {
    resetBtn.click();
    submitBtn.innerText = "Submit";
  }
  ele.parentElement.parentElement.remove();
  data.splice(ele.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  total(data);
};

resetBtn.addEventListener("click", () => {
  submitBtn.innerText = "Submit";
  heading.innerText = "Add Money";
  description.value = "";
  type.value = "income";
  amount.value = "";
  for (let i = 0; i < tr.length; i++) {
    tr[i].style.background = "";
  }
});
