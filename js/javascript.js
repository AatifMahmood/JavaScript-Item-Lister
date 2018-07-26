var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
// form submission event
form.addEventListener('submit',addItem);
itemList.addEventListener('click',deleteItem);
filter.addEventListener('keyup',filterItem);
// add item function
function addItem(e){
	e.preventDefault();
	// get input value
	var inputValue = document.getElementById('item').value;

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
}
// delete item function
function deleteItem(e){
	if(e.target.classList.contains('delete')){
		itemList.removeChild(e.target.parentElement);
	}
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