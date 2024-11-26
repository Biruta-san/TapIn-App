export interface HotelImage {
  id: number;
  hotelId: number;
  nomeArquivo: string;
  guidArquivo: string;
  base64: string;
}

export interface Hotel {
  id: number;
  nome: string;
  valorDiaria: string;
  cidade: string;
  endereco: string;
  numero: number;
  imagens: (string | null)[];
}

export interface ListHotelQuarto {
  id: number;
  numero: number;
  valorDiaria: number;
  capacidadePessoa: number;
}

export interface HotelQuartoAgendamento {
  id: number;
  checkIn: Date;
  checkOut: Date;
  hotelQuartoId: number;
  usuarioId: number;
  usuarioNome: string;
  checkInConfirmado: boolean;
  checkOutConfirmado: boolean;
  tagId: string | null;
}
