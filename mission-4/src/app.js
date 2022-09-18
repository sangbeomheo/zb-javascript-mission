import Calendar from './Calendar.js';
import Picker from './Picker.js';

import { $ } from './utils.js';

export default function App() {
  this.state = {
    selectedDate: new Date(),
  };

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    picker.setState(this.state.selectedDate);
    calendar.setState(this.state.selectedDate);
  };

  const picker = new Picker({ selectedDate: this.state.selectedDate });

  const calendar = new Calendar({
    selectedDate: this.state.selectedDate,
  });

  this.setState(new Date(2023, 5, 1));

  const handlePickerClick = () => {};
}
