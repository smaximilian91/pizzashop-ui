const app = document.createElement('div');
app.id = 'app';
const text = document.createElement('p');
text.textContent = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
app.appendChild(text);

const rootElement = document.getElementById('root');
rootElement.parentNode.replaceChild(app, rootElement);
