const createCard = async (version, date, data) => {
  await axios({
    method: "POST",
    url: "/api/v1/users/createLog",
    data: {
      version: version,
      date: date,
      data: data,
    },
  }).then(res => {
    location.reload();
  })
  .catch(err => console.error(err));
}

const updateCard = async (_id, version, date, data) => {
  await axios({
    method: "POST",
    url: "/api/v1/users/updateLog",
    data: {
      _id: _id,
      version: version,
      date: date,
      data: data,
    },
  }).then(res => {
    location.reload();
  })
  .catch(err => console.error(err));
}

const removeCard = async (_id) => {
  await axios({
    method: "POST",
    url: "/api/v1/users/removeLog",
    data: {
      _id: _id,
    },
  }).then(res => {
    location.reload();
  })
  .catch(err => console.error(err));
}

$(document).ready(function(){
  $('#new_card').click(function(){
    $('#log_id').val('');
    $('#log_version').val('');
    $('#log_date').val('');
    tinymce.get('log_data').setContent('');
    $('#newModal').modal('show');
  });

  $('#create_card').click(function(){
    var _id = $('#log_id').val();
    var version = $('#log_version').val();
    var date = $('#log_date').val();
    var data = tinymce.get('log_data').getContent();
    if (_id == '')
      createCard(version, date, data);
    else
      updateCard(_id, version, date, data);
  });

  $('.edit-card').click(function(e){
    var element = $("div[name="+$(this).attr('name')+"]").eq(0);
    $('#log_id').val($(this).attr('name'));
    $('#log_version').val(element.find('span[name="log_version"]')[0].innerText);
    $('#log_date').val(element.find('h6[name="log_date"]')[0].innerText);
    tinymce.get('log_data').setContent(element.find('div[name="log_data"]')[0].innerHTML);
    $('#newModal').modal('show');
  });

  $('.remove-card').click(function(e){
    $('#remove_id').val($(this).attr('name'));
    $('#remove_modal').modal('show');
  });

  $('#confirm_remove_btn').click(function(){
    const _id = $('#remove_id').val();
    removeCard(_id);
  });
});