window.addEventListener("DOMContentLoaded", create_form);

let btn = document.querySelector("#addProductBtn");
let price = document.querySelector("#sellingPrice");
let name = document.querySelector("#productName");
let category = document.querySelector("#category");
let electronicList = document.querySelector("#electronicItems");
let foodList = document.querySelector("#foodItems");
let skinCareList = document.querySelector("#skinCareItems");

btn.addEventListener("click", add_to_database);

function add_to_database() {
	let obj = {
		price: price.value,
		name: name.value,
		category: category.value,
	};
	axios_post_request(obj);

	price.value = "";
	name.value = "";
	category.value = "";
}

async function create_form() {
	try {
		const res = await axios.get("http://localhost:3000/api/v1/sellers");
		const arr = res.data;
		let electronics = [];
		let foods = [];
		let skincare = [];

		arr.forEach((element) => {
			if (element.category == "Electronics") electronics.push(element);
			else if (element.category == "food") foods.push(element);
			else skincare.push(element);
		});
		electroncis_display(electronics);
		food_display(foods);
		skin_care_display(skincare);
	} catch (err) {
		console.log(err);
	}
}

function unordered_list(arr) {
	let newlist = document.createElement("ul");
	for (let i = 0; i < arr.length; i++) {
		let newli = document.createElement("li");
		let deleteorder = document.createElement("button");
		deleteorder.textContent = "Delete Order";
		let idSpan = document.createElement("span");
		idSpan.textContent = arr[i]._id;
		idSpan.style.display = "none";
		newli.appendChild(document.createTextNode(`${arr[i].price}-${arr[i].category}-${arr[i].name}`));
		newli.appendChild(idSpan);
		newli.appendChild(deleteorder);
		newlist.appendChild(newli);
		deleteorder.addEventListener("click", delete_order);
	}
	return newlist;
}

function electroncis_display(arr) {
	let alreadylist = electronicList.querySelector("ul");
	if (alreadylist) {
		alreadylist.remove();
	}
	let unord_list = unordered_list(arr);
	electronicList.appendChild(unord_list);
}

function food_display(arr) {
	let alreadylist = foodList.querySelector("ul");
	if (alreadylist) {
		alreadylist.remove();
	}
	let unord_list = unordered_list(arr);
	foodList.appendChild(unord_list);
}

function skin_care_display(arr) {
	let alreadylist = skinCareList.querySelector("ul");
	if (alreadylist) {
		alreadylist.remove();
	}
	let unord_list = unordered_list(arr);
	skinCareList.appendChild(unord_list);
}

function delete_order(e) {
	let id = e.target.parentElement.querySelector("span").textContent;
	e.target.parentElement.remove();
	axios_delete_order(id);
}

async function axios_post_request(obj) {
	try {
		 await axios.post("http://localhost:3000/api/v1/sellers", obj);
		create_form();
	} catch (error) {
		console.log(error);
	}
}

async function axios_delete_order(id) {
	try {
		let res = await axios.delete(`http://localhost:3000/api/v1/sellers/${id}`);
		console.log("order deleted");
	} catch (error) {
		console.log(error);
	}
}

// function axios_delete_order(id) {
//   axios
//     .delete(
//       `https://crudcrud.com/api/e254305075df4444a034767aad25ad1c/sellers/${id}`
//     )
//     .then((res) => {
//       console.log("order deleted")
//     })
//     .catch((err) => console.log(err))
// }

// function axios_getAll_request() {
//   axios
//     .get("https://crudcrud.com/api/e254305075df4444a034767aad25ad1c/sellers")
//     .then((res) => {
//       return res.data
//     })
//     .catch((err) => console.log(err))
// }

// function axios_post_request(obj) {
//   axios
//     .post(
//       "https://crudcrud.com/api/e254305075df4444a034767aad25ad1c/sellers",
//       obj
//     )
//     .then((res) => create_form())
//     .catch((err) => console.log(err))
// }
