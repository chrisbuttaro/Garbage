

$('body').append('hello js'); 
  
  var button=$('<button>');
  button.text('click'); 
  button.click(function(){
	  var myReq = $.ajax({
		  type: "GET",
		  url: "api/Events",
		  dataType: "json"
		});

		myReq.done(function( data ) {
		  console.log('This is what was returned ' + data[0].itemname);
		  
		});

		myReq.fail(function() {
		  console.log('It blew up again');
		});
	});

  
  $('body').append(button); 
