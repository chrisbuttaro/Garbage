
var table = $('<table>');
createTable=function(){
table.append( '<tr><th>'  +  "Item" + '</th><th>'  +  "Weight " +'</th><th>'  + "Date" +'</th><th>'  +"Recyclable" +'</th></tr>');
var myReq = $.ajax({
	  type: "GET",
	  url: "api/Events",
	  dataType: "json"
	});
	myReq.done(function(events) {
		for(i=0; i<events.length; i++){
		    var row = '<tr><td>'  +  events[i].itemname + '</td><td>'  +  events[i].weight + '</td><td>'+events[i].date  +'</td><td>'+events[i].recyclable +'</td></tr>';
		    console.log('hello'+events[i].itemname);
		    table.append(row);
		}
	});
	myReq.fail(function() {
	  console.log('It blew up again');
	});
	$('body').append(table);
	newItem();
}//end create Table



var newItem=function(){
var createButton=$('<button>');
createButton.text('New Item');
createButton.click(function(e){
	createButton.remove();
	var addForm=$('<form>');
	var itemInput=$('<input>');
	itemInput.attr('placeholder', 'Item Name');
	var weightInput=$('<input>');
	weightInput.attr('placeholder', 'Weight');
	var dateInput=$('<input>');
	dateInput.attr('placeholder', 'MMMM/DD/YY');
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







createTable();
