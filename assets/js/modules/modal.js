

/* function to display modal dialog box for errors etc.
How to use,  can either call directly from function e.g.
showModal("Title","Message");
Or from event:
    $('#myModal').on('show.bs.modal', function() {
        $("#modal-title").text("Find Where To Get A Cocktail");
        $("#modal-content").html("Your content goes here");
     })
*/
function showModal(modalTitle,modalMessage) {
    $("#modal-content").html(modalMessage);
    $("#modal-title").text(modalTitle);
    $("#myModal").modal('show');
  }

  export { showModal};