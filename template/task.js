function activateTask(){
  var obj = '#col-done,#col-new,#col-inprogress',
      timer;

  $(obj + ', .cards').sortable({
    connectWith: '.draggable,.cards',
    placeholder: 'highlight',
    opacity: 0.5,
    revert: true,
    start(event,ui){
      $(obj).sortable('refresh');
    },
    over(event,ui){
      $(this).parent().find('.cards').addClass('columnHover');
    },
    out(event,ui){
      $(this).parent().find('.cards').removeClass('columnHover');
    },
    receive(event, ui) {
      console.log($(this).parent().find('.task-id').data("task"));
      console.log($(this).parent().find('.status-id').data("id"));
      updateTaskStatus($(this).parent().find('.task-id').data("task"),$(this).parent().find('.status-id').data("id"))
    }

  }).disableSelection();

}
