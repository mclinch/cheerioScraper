   $(".save").on("click", function() {

        var index = $(this).attr("data-index");
        var thisArticle = {
            title: $("a[data-link-index='" + index + "']").text(),
            link: $("a[data-link-index='" + index + "']").attr("href"),
            summary: $(".summary[data-summary-index='" + index + "']").text()
        };

        $(".article[data-index='" + index + "']").fadeOut();

        $.post("/save", thisArticle), function(success){
            console.log(success);
            if (success.message) {
            }
        };
    })

    
    $(".remove").on("click", function() {
        $.get("/remove/" + $(this).attr("data-article-id"), function(success) {
            if (success.message) {
                $(".article[data-id='" + success.id + "']").fadeOut();
            }
        })
    });

    
// delete note
$(document).on("click", ".delnotebtn", function() {

    var thisId = $(this).attr("value");

    $("#articleId").attr("value", $(this).attr("data-article-id"));

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/deletenote/" + thisId
        })
        .done(function(data) {

        });
});    




// modal form 
$(document).on("click", ".notes", function() {
var thisId = $(this).attr("data-article-id");

    $("#articleId").attr("value", $(this).attr("data-article-id"));

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        .done(function(data) {
            // console.log(data);
            if (data.note) {

                // console.log(data.note);
                $("#modal-notes").html("");

                for (var i=0; i<data.note.length; i++){
                    console.log(data.note[i].body);

                    $("#modal-notes").append(data.note[i].body+"&nbsp;&nbsp;&nbsp;"+"<button type=\"submit\" value="+data.note[i]._id+" class=\"delnotebtn btn btn-primary\" data-dismiss=\"modal\">x</button><hr />");
                }
            }
        });
});

$(document).on("click", ".notebtn", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("value");
    var savenote = $("#bodyinput").val();

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                body: savenote
            }
        })
        .done(function(data) {
            console.log(data);
            
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#bodyinput").val("");
});
