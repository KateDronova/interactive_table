const table = document.querySelector('.mainTable');


function createNewElement(parentElem, tag, content) {
  const elem = document.createElement(tag);
  if (content) {
    elem.append(content);
  }
  parentElem.append(elem);
  return elem;
}


function showGraphic(event) {
  const graphics = document.querySelector('.graphicsContainer');
  graphics.hidden = false;
  event.target.closest('tr').after(graphics);
}


fetch('./data.json')
  .then((response) => response.json())
  .then((data) =>
    data.map((item) => {
      const tableRow = createNewElement(table, 'tr');
      createNewElement(tableRow, 'td', item.title)
      createNewElement(tableRow, 'td', item.currentDay)
      const yesterday = createNewElement(tableRow, 'td', item.yesterday);
      const yesterdayPercent = createNewElement(tableRow, 'td', item.yesterdayPercent);

      if (parseInt(item.yesterdayPercent) > 0) {
        yesterdayPercent.classList.add('greenColor');
      }

      if (parseInt(item.yesterdayPercent) < 0) {
        yesterdayPercent.classList.add('redColor');
      }

      if (parseInt(item.yesterdayPercent) >= 10) {
        yesterday.classList.add('green');
        yesterdayPercent.classList.add('green');
      }

      if (parseInt(item.yesterdayPercent) <= -10) {
        yesterday.classList.add('red');
        yesterdayPercent.classList.add('red');
      }
      createNewElement(tableRow, 'td', item.oneWeekAgo)

      tableRow.addEventListener('click', showGraphic)
    })
  );
