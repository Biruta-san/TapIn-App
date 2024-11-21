export interface UsuarioAgendamento {
  id: number;
  checkIn: string;
  checkOut: string;
  hotelId: number;
  hotelNome: string;
  hotelEndereco: string;
  hotelQuartoId: number;
  hotelQuartoNumero: number;
  usuarioId: number;
}
