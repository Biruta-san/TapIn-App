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
  imagens: HotelImage[];
}

export interface ListHotelQuarto {
  id: number;
  numero: number;
  valorDiaria: number;
  capacidadePessoa: number;
}
