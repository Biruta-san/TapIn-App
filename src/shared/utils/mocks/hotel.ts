import {faker} from '@faker-js/faker';
import {Hotel} from '../../interfaces/hotel';
import {UsuarioAgendamento} from '../../interfaces/usuario';

// Function to generate a single hotel with mock data
export const generateHotelMock = (): Hotel => ({
  id: faker.number.int(),
  nome: faker.company.name(),
  valorDiaria: faker.commerce.price({min: 50, max: 900, dec: 2}), // Price between 50 and 500 with two decimal places
  cidade: faker.location.city(),
  endereco: faker.location.streetAddress(),
  numero: faker.number.int({min: 1, max: 1000}),
  imagens: Array.from({length: faker.number.int({min: 1, max: 5})}).map(() => ({
    id: faker.number.int(),
    hotelId: faker.number.int(),
    nomeArquivo: faker.system.fileName(),
    guidArquivo: faker.string.alphanumeric(20), // Example of an alphanumeric string
    base64: faker.string.alphanumeric(20), // Example of a base64 string
  })),
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
});

// Function to generate a list of user reservations
export const generateUserReservesList = (count = 10): UsuarioAgendamento[] => {
  const reservations = Array.from(
    {length: count},
    generateUsuarioAgendamentoMock,
  );
  return reservations;
};
