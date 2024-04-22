import * as timeago from 'timeago.js';

const elements = document.querySelectorAll('.timeago');

if(elements.length > 0) {
  timeago.render(elements);
}