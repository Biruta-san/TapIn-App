// const {API_BASE_ROUTE} = process.env;

const API_BASE_ROUTE: string = 'https://iothinkers-tapin-api.onrender.com';
// #region USUARIO
export const USUARIO_ROUTE: string = `${API_BASE_ROUTE}/usuario`;
export const USUARIO_LOGIN_ROUTE: string = `${USUARIO_ROUTE}/login`;
export const USUARIO_LIST_ROUTE: string = `${USUARIO_ROUTE}/lista`;
export const USUARIO_AGENDAMENTOS_ROUTE: string = `${USUARIO_ROUTE}/agendamentos`;
export const USUARIO_AGENDAMENTO_ROUTE: string = `${USUARIO_ROUTE}/agendamento`;
// #endregion

// #region HOTEL
export const HOTEL_ROUTE: string = `${API_BASE_ROUTE}/hotel`;
export const HOTEL_AGENDAR_ROUTE: string = `${API_BASE_ROUTE}/agendar`;
export const HOTEL_LIST_ROUTE: string = `${HOTEL_ROUTE}/lista`;
export const HOTEL_QUARTO_LIST_ROUTE: string = `${HOTEL_ROUTE}/quartos`;
export const HOTEL_CONFIRMAR_AGENDAMENTO_ROUTE: string = `${HOTEL_ROUTE}/confirmarAgendamento`;
// #endregion
