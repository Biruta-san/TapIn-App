import React from 'react';
import {
  CalendarRange,
  I18nConfig,
  RangeDatepicker as KRangeDatePicker,
  NativeDateService,
} from '@ui-kitten/components';
import Caption from './Caption';

// Define the props interface for the RangeDatepicker component
interface RangeDatepickerProps {
  range: CalendarRange<Date>; // A tuple representing the start and end date
  onSelect: (range: CalendarRange<Date>) => void; // Function to handle the range selection
  label?: string; // Optional label for the datepicker
  placeholder?: string; // Optional placeholder for the datepicker
  helperText?: string; // Optional helper text
}

const RangeDatepicker: React.FC<RangeDatepickerProps> = ({
  range,
  onSelect,
  label,
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
    <KRangeDatePicker
      range={range}
      onSelect={onSelect}
      dateService={localeDateService}
      label={label}
      placeholder={placeholder}
      caption={<Caption helperText={helperText} />}
    />
  );
};

export default RangeDatepicker;
