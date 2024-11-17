const {API_BASE_ROUTE} = process.env;

// #region USUARIO
export const USUARIO_ROUTE: string = `${API_BASE_ROUTE}/usuario`;
export const USUARIO_LOGIN_ROUTE: string = `${USUARIO_ROUTE}/login`;
export const USUARIO_LIST_ROUTE: string = `${USUARIO_ROUTE}/lista`;
// #endregion

// #region HOTEL
export const HOTEL_ROUTE: string = `${API_BASE_ROUTE}/hotel`;
export const HOTEL_LIST_ROUTE: string = `${HOTEL_ROUTE}/lista`;
// #endregion
