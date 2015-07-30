$(document).one('pageinit', function(){
	
	// Display runs
	showRuns();
    
    // Add Handler
	$('#submitAdd').on('tap', addRun);
	
	// Edit Handler
	$('#submitEdit').on('tap', editRun);
	
	// Set Current Handler
	$('#stats').on('tap','#editLink', setCurrent);
    
    // Show runs on homepage
    function showRuns(){
    	
    	// Get runs object
    	var runs = getRunsObject();
    	
    	// Check to see if empty
    	if(runs != '' && runs != null){
    		for(var i = 0; i < runs.length; i++){
    			$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+runs[i]["date"]+
				' <br><strong>Distance: </strong>'+runs[i]["miles"]+'m<div class="controls">' +
				'<a href="#edit">Edit</a> | <a href="#">Delete</a></li>');
    		}
    		
    		$('#home').bind('pageinit', function(){
    			$('#stats').listview('refresh');
    		});
    	}
    }
    
    
    // Adds a run
    function addRun(){
    	
        // Form values
        var miles = $('#addMiles').val();
		var date = $('#addDate').val();
		
		// Run object created
		var run = {
		    date : date,
		    miles : parseFloat(miles)
		};
		
		var runs = getRunsObject();
		
		// Add a run to runs array
		runs.push(run);
		
		alert("Run added");
		
		// Set stringified object to localStorage
		localStorage.setItem('runs', JSON.stringify(runs));
		
		// Redirect
		window.location.href="index.html";
		
		return false;
        
    }
    
    // Edit Runs
    function editRun(){
    	
    	// Get current data
		var currentMiles = localStorage.getItem('currentMiles');
		var currentDate = localStorage.getItem('currentDate');
		
		var runs = getRunsObject();
		
		// Loop through runs
		for(var i = 0;i < runs.length;i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i,1);
			}
			localStorage.setItem('runs',JSON.stringify(runs));
		}
		
		// Get form values
		var miles = $('#editMiles').val();
		var date = $('#editDate').val();
	
		// Create run object
		var update_run = {
			date: date,
			miles: parseFloat(miles)
		};
		
		// Add run to runs array
		runs.push(update_run);
		
		alert('Run Updated');
		
		// Set stringified object to localStorage
		localStorage.setItem('runs', JSON.stringify(runs));
		
		// Redirect
		window.location.href="index.html";
		
		return false;
    }
    
    
    function getRunsObject(){
    	
        // Set the runs array
        var runs = new Array();
        
        // Get the current runs from localStorage
		var currentRuns = localStorage.getItem('runs');
		
		// Check localStorage
		if(currentRuns != null){
			// Set to runs
			var runs = JSON.parse(currentRuns);
		}
		
		// Return runs object
		return runs.sort(function(a, b)
		{
		    return new Date(b.date) - new Date(a.date);
		    
		});
    }
    
    
    // Set the current clicked miles and date
    function setCurrent(){
    	
    	// Set Local Storage Items
    	localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		
		// Insert the form fields
		$('#editMiles').val(localStorage.getItem('currentMiles'));
		$('#editDate').val(localStorage.getItem('currentDate'));
    }
    
});