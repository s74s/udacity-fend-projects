
$(() => {
  const pixelTable = $('#pixel_canvas');
  const createBtn = $('.grid-submit');
  const btnPanel = $('.btn-panel');
  const listShow = $('.list-show-btn');
  const toDoList = $('.to-do-list');
  const toDoItem = $('.to-do-item');
  const removeBtn = $('.remove-btn');
  // let height = $('#input_height').val();
  // let width = $('#input_height').val();
  let colorPicker = $('#colorPicker').val();

  console.log(pixelTable, createBtn, colorPicker);


  $(btnPanel).hide();
  function makeGrid() {
    console.log('Making grid');
    $('#pixel_canvas').remove();
    $('.btn-panel').after('<table id=pixel_canvas></table>');
    let w = $('#input_width').val();
    let h = $('#input_height').val();
    if (w > 60) w = 60;
    if (h > 40) h = 40;
    for (let row = 1; row <= h; row += 1) {
      $('#pixel_canvas').append(`<tr id="${row}"></tr>`);
      for (let columns = 1; columns <= w; columns += 1) {
        $(`#${row}`).append(`<td id="${row}-${columns}"></td>`);
      }
    }
    $(btnPanel).fadeIn(500);
  }

  $(createBtn).on('click', () => {
    makeGrid();
  });

  $(listShow).on('click', () => {
    $(toDoList).slideToggle(500);
    $(listShow).toggleClass('list-show-btn--closed');
  });

  // $('#pixel_canvas').on('click', 'td', (evt) => {
  //   console.log(evt.target);
  //   $(evt.target).css('background-color', 'red');
  // });

  $(toDoItem).on('click', (evt) => {
    $(evt.currentTarget).toggleClass('success');
  });

  $(removeBtn).on('click', () => {
    $(btnPanel).fadeOut(500);
    $('#pixel_canvas').fadeOut(500);
    setTimeout(() => {
      $('#pixel_canvas').remove();      
    }, 500);
    $('.btn-panel').after('<table id=pixel_canvas></table>');
  });
});

// const toDoList = document.querySelector('.to-do-list');
// toDoList.addEventListener('click', (evt) => {
//   console.log(evt.target);
// });

