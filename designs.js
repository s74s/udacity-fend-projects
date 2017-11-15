
$(() => {
  const pixelTable = $('#pixel_canvas');
  const createBtn = $('.grid-submit');
  const btnPanel = $('.btn-panel');
  const listShow = $('.list-show-btn');
  const toDoList = $('.to-do-list');
  const toDoItem = $('.to-do-item');
  const hideBtn = $('.hide-btn');
  const warningText = $('.grid-generator p');
  // let height = $('#input_height').val();
  // let width = $('#input_height').val();
  let color = $('.colorPicker').val();
  const colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  const rdmColor = () => {
    let color = '#';
    while (color.length < 7) {
      color += colorArray[Math.round(Math.random() * 15)];
    }
    return color;
  };
  $(btnPanel).hide();
  $('.palette').hide();
  $('.color-picker').hide();

  function makeGrid() {
    console.log('Making grid');
    $('#pixel_canvas').remove();
    $('.control-panel').after('<table id="pixel_canvas"></table>');
    let w = $('#input_width').val();
    let h = $('#input_height').val();
    if (w > 40) {
      w = 40;
      $(warningText).css('opacity', '1');
    }
    if (h > 40) {
      h = 40;
      $(warningText).css('opacity', '1');
    }
    for (let row = 1; row <= h; row += 1) {
      $('#pixel_canvas').append(`<tr id="${row}"></tr>`);
      for (let columns = 1; columns <= w; columns += 1) {
        $(`#${row}`).append('<td></td>');
      }
    }
    $('#pixel_canvas').on('mousedown', 'td', (evt) => {
      $(evt.target).css('background-color', color);
    });
    $('.palette').fadeIn(2500);
    $('.color-picker').fadeIn(2500);
    $(btnPanel).fadeIn(2500);
  }

  $(createBtn).on('click', () => {
    makeGrid();
  });

  $(listShow).on('click', () => {
    $(toDoList).slideToggle(500);
    $(listShow).toggleClass('list-show-btn--closed');
  });

  $(toDoItem).on('click', (evt) => {
    $(evt.currentTarget).toggleClass('success');
  });

  $(hideBtn).on('click', () => {
    if (hideBtn.text() == 'Hide') {
      $('#pixel_canvas').hide(300);
      $(hideBtn).text('Show');
    } else {
      $('#pixel_canvas').show(300);
      $(hideBtn).text('Hide');
    }
  });

  $('.fill-btn').on('click', () => {
    $('#pixel_canvas').find('td').css('background-color', color);
  });

  $('.clear-btn').on('click', () => {
    $('#pixel_canvas').find('td').css('background-color', 'white');
  });

  $('.palette').on('click', '.palette-btn', (evt) => {
    color = $(evt.target).css('background-color');
    $('.fill-btn').css('background-color', color);
  });

  $('.colorPicker').change(() => {
    color = $('.colorPicker').val();
    $('.fill-btn').css('background-color', color);
  });

  $('.random-color').on('click', () => {
    color = rdmColor();
    $('.fill-btn').css('background-color', color);
  });

});

