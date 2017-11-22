const createBtn = $('#grid-submit');
const listShow = $('.list-show-btn');
const toDoList = $('.to-do-list');
const toDoItem = $('.to-do-item');
const hideBtn = $('.hide-btn');
const warningText = $('.grid-generator p');
const sizePicker = document.querySelector('#sizePicker');
let color = $('.colorPicker').val();
const colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];


// Random HEX color generator
const rdmColor = () => {
  let color = '#';
  while (color.length < 7) {
    color += colorArray[Math.round(Math.random() * 15)];
  }
  return color;
};


// Canvas grid generating function
function makeGrid() {
  console.log('Making grid');
  
  // getting sizes
  let width = $('#input_width').val();
  let height = $('#input_height').val();
  $('#pixel_canvas').remove();
  $('.control-panel').after('<table id="pixel_canvas"></table>');
  
  // size validation
  if (width > 40) {
    width = 40;
    $(warningText).css('opacity', '1');
  }
  if (height > 40) {
    height = 40;
    $(warningText).css('opacity', '1');
  }
  
  // grid generator
  for (let row = 1; row <= height; row += 1) {
    $('#pixel_canvas').append(`<tr id='${row}'></tr>`);
    for (let columns = 1; columns <= width; columns += 1) {
      $(`#${row}`).append('<td></td>');
    }
  }
  $('#pixel_canvas').on('mousedown', 'td', evt => {
    $(evt.target).css('background-color', color);
  });
}

// grid submit button event
sizePicker.addEventListener('submit', function (e) {
  e.preventDefault();
  makeGrid();
});

// to-do list hide event
$(listShow).on('click', () => {
  $(toDoList).slideToggle(500);
  $(listShow).toggleClass('list-show-btn--closed');
});

// checking to-do items (done status switcher)
$(toDoItem).on('click', evt => {
  $(evt.currentTarget).toggleClass('success');
});

// canvas hiding event
$(hideBtn).on('click', () => {
  if (hideBtn.text() == 'Hide') {
    $('#pixel_canvas').hide(300);
    $(hideBtn).text('Show');
  } else {
    $('#pixel_canvas').show(300);
    $(hideBtn).text('Hide');
  }
});


//  canvas fill button event
$('.fill-btn').on('click', () => {
  $('#pixel_canvas')
    .find('td')
    .css('background-color', color);
});

// canvas clear button event
$('.clear-btn').on('click', () => {
  $('#pixel_canvas')
    .find('td')
    .css('background-color', 'white');
});

// painting function
$('.palette').on('click', '.palette-btn', evt => {
  color = $(evt.target).css('background-color');
  $('.fill-btn').css('background-color', color);
});

// fill button color changing
$('.colorPicker').change(() => {
  color = $('.colorPicker').val();
  $('.fill-btn').css('background-color', color);
});

// random button event, random color generation
$('.random-color').on('click', () => {
  color = rdmColor();
  $('.fill-btn').css('background-color', color);
});
