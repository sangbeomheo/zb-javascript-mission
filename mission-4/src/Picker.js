import { $, getDateString } from './utils.js';

export default function Picker({ selectedDate }) {
  if (!new.target) {
    throw new Error('Picker가 new로 호출되지 않음');
  }

  this.$element = $('.picker');
  this.state = {
    selectedDate,
  };

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.handlePickerValue();
  };

  this.$element.addEventListener('click', () => {
    console.log('click');
  });

  this.handlePickerValue = () => {
    this.$element.setAttribute('value', getDateString(this.state.selectedDate));
  };
}
