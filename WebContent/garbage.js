
var table = $('<table>');
var Events=[];
var deleteButtons=[]; 
var editButtons=[]; 
var createButton=$('<button>');


var myReq = $.ajax({
	  type: "GET",
	  url: "api/Events",
	  dataType: "json"
	});
	myReq.done(function(events) {
		
		createTable(events);
		
	});
	myReq.fail(function() {
	  console.log('It blew up again');
	});
	

createTable=function(events){
	createEditButtons(events); 
	createDeleteButtons(events);

table.append( '<tr><th>'  +  "Item" + '</th><th>'  +  "Weight (lbs)" +'</th><th>'  + "Date" +'</th><th>'  +"Recyclable" +'</th></tr>');
var total=0;
for(i=0; i<events.length; i++){
    var row = $('<tr><td>'  +  events[i].itemname + '</td><td>'  +  events[i].weight + '</td><td>'+events[i].date  +'</td><td>'+events[i].recyclable +'</td></tr>');
    total += events[i].weight; 
    row.append(editButtons[i]);
    row.append(deleteButtons[i]);
    table.append(row);
    $('body').append(table);	
 
}

newItem();
var totalBox=$('<div>'); 
totalBox.text("Total Weight:" +total+ " lbs");
$('body').append(totalBox); 

}//end create Table





createDeleteButtons=function(events){//create delete buttons
	
	for(i=0; i<events.length; i++){
	var deleteButton=$('<button>'); 
	deleteButton.text('X');
	deleteButton.attr('id', events[i].id);
	//deleteButton.type('submit');
	deleteButton.click(function(e){
			$.ajax({
			  type: "DELETE",
			  url: "api/Events/"+e.target.id,
			  dataType: "json",
			  success: location.reload()
			});
	});
	deleteButtons[i]=deleteButton; 
	}
	}//end create delete buttons

createEditButtons=function(events){//create edit buttons

	for(i=0; i<events.length; i++){
	var editButton=$('<button>'); 
	editButton.text('Edit');
	editButton.attr('id', i);
	editButton.attr('realId', events[i].id)
	editButton.click(function(e){
		table.remove();
		createButton.remove(); 
		var table1=$('<table>');
		var row = $('<tr><td>'  +  events[e.target.id].itemname + '</td><td>'  +  events[e.target.id].weight + '</td><td>'+events[e.target.id].date  +'</td><td>'+events[e.target.id].recyclable +'</td></tr>');
	    table1.append(row);
		$('body').append(table1);
		var editForm=$('<form>');
		var itemInput=$('<input>');
		itemInput.attr('placeholder', 'Item Name');
		var weightInput=$('<input>');
		weightInput.attr('placeholder', 'Weight');
		var dateInput=$('<input>');
		dateInput.attr('placeholder', 'YYYY-MM-DD');
		var recycInput=$('<input>');
		recycInput.attr('placeholder', 'true/false');
		
		var editSubmit=$('<button>');
		editSubmit.attr('id', $(this).closest('button').attr('realId'));
		editSubmit.click(function(e){
			var value = {"itemname": itemInput.val(), "weight": weightInput.val(), "date": dateInput.val(), "recyclable":recycInput.val()};
			$.ajax({
			    type: "POST",
			    url: "api/Events/"+e.target.id,
			    dataType: "json",
			    contentType: 'application/json',
			    data: JSON.stringify(value),
			    success: createTable
			});
		}); 
		
		editSubmit.text('Submit');
		editForm.append(itemInput);
		editForm.append(weightInput);
		editForm.append(dateInput);
		editForm.append(recycInput);
		editForm.append(editSubmit);
		$('body').append($(editForm));
	});
	editButtons[i]=editButton; 
		}
	
	
	}//end edit buttons


var newItem=function(){
createButton.text('New Item');
createButton.click(function(e){
	createButton.remove();
	var addForm=$('<form>');
	var itemInput=$('<input>');
	itemInput.attr('placeholder', 'Item Name');
	var weightInput=$('<input>');
	weightInput.attr('placeholder', 'Weight');
	var dateInput=$('<input>');
	dateInput.attr('placeholder', 'YYYY/MM/DD');
	var recycInput=$('<input>');
	recycInput.attr('placeholder', 'true/false');
	var addSubmit=$('<button>');
	addSubmit.click(function(e){
		console.log(itemInput.val());
		var garbEvent = {"itemname": itemInput.val(), "weight": weightInput.val(),"date": dateInput.val(),"recyclable": recycInput.val()};
		var myReq = $.ajax({
			  type: "POST",
			  url: "api/Events",
			  dataType: "json",
			  contentType: 'application/json',
			  data: JSON.stringify(garbEvent)
			});
			myReq.done(function(newEvent) {
	
			});
			myReq.fail(function() {
			  console.log('It blew up again');
			  console.log(itemInput.val());
			});
	});
	addSubmit.text('Submit');
	addForm.append(itemInput);
	addForm.append(weightInput);
	addForm.append(dateInput);
	addForm.append(recycInput);
	addForm.append(addSubmit);
	$('body').append($(addForm));


});
$('body').append(createButton);
}//end new Item








