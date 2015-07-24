$(document).one('pageinit', function(){
    
    $('#submitAdd').on('tap', addRun);
    
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
    
});