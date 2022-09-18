import { $, getDateString } from './utils.js';

export default function Picker({ handleClick }) {
  if (!new.target) {
    throw new Error('Picker가 new로 호출되지 않음');
  }

  this.$element = $('.picker');

  this.$element.addEventListener('click', handleClick);

  this.renderPickerValue = date => {
    this.$element.setAttribute('value', getDateString(date));
  };
}
