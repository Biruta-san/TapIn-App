import {faker} from '@faker-js/faker';
import {Hotel, ListHotelQuarto} from '../../interfaces/hotel';
import {UsuarioAgendamento} from '../../interfaces/usuario';

// Function to generate a single hotel with mock data
export const generateHotelMock = (): Hotel => ({
  id: faker.number.int(),
  nome: faker.company.name(),
  valorDiaria: faker.commerce.price({min: 50, max: 900, dec: 2}), // Price between 50 and 500 with two decimal places
  cidade: faker.location.city(),
  endereco: faker.location.streetAddress(),
  numero: faker.number.int({min: 1, max: 1000}),
  imagens: Array.from({length: faker.number.int({min: 1, max: 5})}, () =>
    faker.image.url({width: 1024, height: 768}),
  ),
});

// Function to generate a list of hotels
export const generateHotelsList = (count = 10): Hotel[] => {
  const hotels = Array.from({length: count}, generateHotelMock);
  return hotels;
};

// Function to generate a mock user reservation
export const generateUsuarioAgendamentoMock = (): UsuarioAgendamento => ({
  id: faker.number.int(),
  checkIn: faker.date.future().toISOString().split('T')[0], // Date format "YYYY-MM-DD"
  checkOut: faker.date.future().toISOString().split('T')[0],
  hotelId: faker.number.int(),
  hotelNome: faker.company.name(),
  hotelEndereco: faker.location.streetAddress(),
  hotelQuartoId: faker.number.int(),
  hotelQuartoNumero: faker.number.int({min: 1, max: 500}), // Example room number
  usuarioId: faker.number.int(),
  usuarioNome: faker.person.fullName(),
  checkInConfirmado: faker.datatype.boolean(),
  checkOutConfirmado: faker.datatype.boolean(),
  hotelImagens: Array.from({length: faker.number.int({min: 1, max: 5})}, () =>
    faker.image.url({width: 1024, height: 768}),
  ),
});

// Function to generate a list of user reservations
export const generateUserReservesList = (count = 10): UsuarioAgendamento[] => {
  const reservations = Array.from(
    {length: count},
    generateUsuarioAgendamentoMock,
  );
  return reservations;
};

export const generateHotelQuartoMock = (): ListHotelQuarto => ({
  id: faker.number.int(),
  numero: faker.number.int({min: 1, max: 500}), // Número do quarto entre 1 e 500
  valorDiaria: parseFloat(faker.commerce.price({min: 50, max: 1000, dec: 2})), // Valor da diária entre 50 e 1000 com 2 casas decimais
  capacidadePessoa: faker.number.int({min: 1, max: 6}), // Capacidade de 1 a 6 pessoas
});

// Função para gerar uma lista de quartos
export const generateHotelQuartosList = (count = 10): ListHotelQuarto[] => {
  const quartos = Array.from({length: count}, generateHotelQuartoMock);
  return quartos;
};
