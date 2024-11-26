export interface UsuarioAgendamento {
  id: number;
  checkIn: string;
  checkOut: string;
  checkInConfirmado: boolean;
  checkOutConfirmado: boolean;
  hotelId: number;
  hotelNome: string;
  hotelEndereco: string;
  hotelQuartoId: number;
  hotelQuartoNumero: number;
  usuarioId: number;
  usuarioNome: string;
  hotelImagens?: (string | null)[];
}
