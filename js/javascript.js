var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// form events
form.addEventListener('submit',addItem);
itemList.addEventListener('click',deleteItem);
filter.addEventListener('keyup',filterItem);

(function(){
	displayLocalStorage();
})();

// add item function
function addItem(e){
	e.preventDefault();

	// get input value
	var inputValue = document.getElementById('item').value;
	if(inputValue!= ''){
		// create new li item
		var li = document.createElement('li');
		li.className = 'list-group-item';
		li.appendChild(document.createTextNode(inputValue));
	
		// create delete button
		var deleteBtn = document.createElement('button');
		deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
		deleteBtn.appendChild(document.createTextNode('X'));
	
		// append button to li
		li.appendChild(deleteBtn);
		// append li to list
		itemList.appendChild(li);
	
		// clear value in li
		document.getElementById('item').value='';
		// store in local storage
		addLocalStorage(inputValue);
		document.getElementById('empty').style.display = 'none';
	}
}

// delete item function
function deleteItem(e){
	if(e.target.classList.contains('delete')){
		itemList.removeChild(e.target.parentElement);
	}
	var data = e.path[1].firstChild.data;
	deleteLocalStorage(data);
}

// filter Item function
function filterItem(e){
	var val = e.target.value.toLowerCase();
	var items = itemList.getElementsByTagName('li');
	//conver to array
	Array.from(items).forEach(function(item){
		var itemVal = item.firstChild.textContent;
		if(itemVal.toLowerCase().indexOf(val)!= -1){
			item.style.display = 'block';
		}
		else{
			item.style.display = 'none';
		}
	});
}
// display data from local
function displayLocalStorage() {
	var localStorageData = JSON.parse(localStorage.getItem('item-lister'));
	if(localStorageData){
		document.getElementById('empty').style.display = 'none';
		localStorageData.forEach(function(data) {
			// create new li item
			var li = document.createElement('li');
			li.className = 'list-group-item';
			li.appendChild(document.createTextNode(data));

			// create delete button
			var deleteBtn = document.createElement('button');
			deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
			deleteBtn.appendChild(document.createTextNode('X'));

			// append button to li
			li.appendChild(deleteBtn);
			// append li to list
			itemList.appendChild(li);
		});
	}
}
// add in local
function addLocalStorage(data) {
	var localStorageData = JSON.parse(localStorage.getItem('item-lister'));
	(localStorageData)?localStorageData.push(data):localStorageData = [data];
	localStorage.setItem('item-lister', JSON.stringify(localStorageData));
}
// delete from local
function deleteLocalStorage(data) {
	var localStorageData = JSON.parse(localStorage.getItem('item-lister'));
	var index = localStorageData.indexOf(data);
	if(index > -1){
		localStorageData.splice(index,1);
	}
	localStorage.setItem('item-lister',JSON.stringify(localStorageData));
}