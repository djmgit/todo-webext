$(document).ready(function() {
	$(".add-note").hide();

    $(".add").click(function() {
	    $(".add-note").slideToggle();
    });
    
    var notes = [];
    
    $(".submit").click(function() {
	    var noteHead = $(".note-head").val();
	    var noteBody = $(".note-body").val();

	    $(".note-head").val("");
	    $(".note-body").val("");

	    if (!noteHead || !noteBody) {
	    	return;
	    }
    
	    var note = {
		    "title": noteHead,
		    "body": noteBody
	    }

	    var selectedNote = notes.filter(function(item) {
	    	return item.title === note.title;
	    });


	    if (selectedNote.length === 0) {
	    	notes.unshift(note);
	    } else {
	    	selectedNote = selectedNote[0];
	    	selectedNote.body = note.body;
	    }
    
	    //storage = {}
	    //storage["todo"] = notes;
	    //browser.storage.local.set(storage);

	    localStorage.todo = JSON.stringify(notes);
    
	    getNotes();
	    $(".add-note").slideUp();
    });
    
    function getNotes() {

	    /*browser.storage.local.get("todo").then(function(storedNotes) {
		    notes = storedNotes.todo;
		    if (notes === undefined || notes.length === 0) {
		        notes = [];
		        $(".empty").fadeIn();
		    } else {
		    	$(".empty").fadeOut();
		    }

		    console.log(notes);

		    updateNotes();
	    });*/

	    if (!localStorage.todo || localStorage.todo === "[]") {
		    notes = [];
		    $(".empty").fadeIn();
		} else {
		    $(".empty").fadeOut();
		    notes = JSON.parse(localStorage.todo);
		}

		
		updateNotes();
    }
    
    function updateNotes() {
	    var notesHtml = "";
	    
   
	    notes.forEach(function(elem) {
		    noteHtml = "<div class='card'>" +
		                   "<div class='card-header'>" +
		                       "<span><strong>" + elem.title + "</strong></span>" +
		                       "<span>" +
		                           "<span class='edit'>" +
		                               "<img src='edit.svg'>" +
		                           "</span>" +
		                           "<span class='remove'>" +
		                               "<img src='remove.svg'>" +
		                           "</span>" +
		                       "</span>" +
		                   "</div>" +
		                   "<div class='card-body'>" + elem.body + "</div>" +
		               "</div>";
		    notesHtml += noteHtml;
	    });
    
	    $(".notes").html(notesHtml);

	    $(".remove").click(function() {
	    	var key = $(this).parent().prev().text();
	    	notes = notes.filter(function(item) {
	    		return item["title"] !== key;
	    	});
	    	
	    	//storage = {}
	        //storage["todo"] = notes;
	        //browser.storage.local.set(storage);

	        localStorage.todo = JSON.stringify(notes);
	        getNotes();
	    });

	    $(".edit").click(function() {
	    	$(".note-head").val($(this).parent().prev().text());
	    	$(".note-body").val($(this).parent().parent().next().text());

	    	$(".add-note").slideDown();
	    });
    }

    getNotes();

});

