$(document).ready(function () {
  $("#greeting").hide().fadeIn(800);

  $("#toggle-socials").click(function () {
    $("#socials").slideToggle("fast");
    const currentText = $(this).text();
    $(this).text(currentText === "Show Socials" ? "Hide Socials" : "Show Socials");
  });

  $("#highlight-btn").click(function () {
    $(".highlight-box").toggleClass("active-highlight");
  });

  let removedBlock = null;
  let originalParent = null;

  $('#remove-btn').click(function () {
    const block = $('.removable');
    if (block.length) {
      removedBlock = block.detach();
      originalParent = $(this).closest('.card-body');
      $('#restore-btn').prop('disabled', false);
    }
  });

  $('#restore-btn').click(function () {
    if (removedBlock && $('.removable').length === 0) {
      originalParent.append(removedBlock);
      removedBlock = null;
      $(this).prop('disabled', true);
    }
  });
});
