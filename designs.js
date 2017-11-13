
$(() => {
  const pixelTable = $('#pixel-canvas');
  const height = $('#input_height').val();
  const width = $('#input_height').val();
  const createBtn = $('grid-submit');
  const colorPicker = $('#colorPicker').val();
  console.log(pixelTable, height, width, createBtn, colorPicker);

  const makeGrid = () => {
    console.log('Making grid');
  };
  makeGrid();
});

