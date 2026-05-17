const display = document.getElementById('calcDisplay');
const historyDisplay = document.getElementById('history');
let visualExpression = ''; // Ce vede utilizatorul pe ecran (ex: 5 ÷ 2)
let internalExpression = ''; // Ce calculează JavaScript în spate (ex: 5 / 2)

document.querySelector('.calculator').addEventListener('click', (e) => {
  if (!e.target.matches('button')) return;

  const btn = e.target;
  const action = btn.dataset.action;
  const value = btn.dataset.value; // Preluăm valoarea matematică (/ sau *)
  const text = btn.innerText; // Preluăm textul vizual (÷ sau ×)

  if (action === 'clear') {
    visualExpression = '';
    internalExpression = '';
    display.value = '';
    historyDisplay.innerText = '';
    display.classList.remove('small-text');
  } else if (action === 'delete') {
    visualExpression = visualExpression.slice(0, -1);
    internalExpression = internalExpression.slice(0, -1);
    display.value = visualExpression;
  } else if (action === 'append') {
    visualExpression += text;
    internalExpression += value;
    display.value = visualExpression;
  } else if (action === 'number') {
    visualExpression += text;
    internalExpression += text;
    display.value = visualExpression;
  } else if (action === 'calculate') {
    if (!internalExpression) return;
    try {
      // Metodă modernă și sigură care înlocuiește bătrânul eval() direct din HTML
      const result = new Function(`return ${internalExpression}`)();

      if (result === Infinity || isNaN(result)) {
        display.classList.add('small-text');
        display.value = 'Împărțire imposibilă';
        visualExpression = '';
        internalExpression = '';
      } else {
        historyDisplay.innerText = visualExpression + ' =';
        display.value = result;
        visualExpression = result.toString();
        internalExpression = result.toString();
      }
    } catch (error) {
      display.value = 'Eroare';
      visualExpression = '';
      internalExpression = '';
    }
  }
});
