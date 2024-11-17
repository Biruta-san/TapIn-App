import React from 'react';
import {
  I18nConfig,
  Datepicker as KDatePicker,
  NativeDateService,
} from '@ui-kitten/components';
import Caption from './Caption';

// Define the prop types for the Datepicker component
interface DatepickerProps {
  date: Date | undefined; // The date can be a Date object or null
  onSelect: (date: Date) => void; // Function to handle the date selection
  placeholder?: string; // Optional placeholder text
  helperText?: string; // Optional helper text to display below the datepicker
}

const Datepicker: React.FC<DatepickerProps> = ({
  date,
  onSelect,
  placeholder,
  helperText,
}) => {
  const i18n: I18nConfig = {
    dayNames: {
      short: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      long: [
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo',
      ],
    },
    monthNames: {
      short: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      long: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
    },
  };

  const localeDateService = new NativeDateService('pt', {
    i18n,
    startDayOfWeek: 1,
  });

  return (
    <KDatePicker
      date={date}
      onSelect={onSelect}
      dateService={localeDateService}
      placeholder={placeholder}
      caption={<Caption helperText={helperText} />}
    />
  );
};

export default Datepicker;
