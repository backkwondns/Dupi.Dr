// import auth_service from '../service/auth.service'
// import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './type'
//
// export const login = (username, password) => (dispatch) => {
//   console.log(username, password)
//   return auth_service.login(username, password).then(
//     (data) => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: { user: data },
//       })
//
//       return Promise.resolve()
//     },
//     (error) => {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString()
//
//       dispatch({
//         type: LOGIN_FAIL,
//       })
//
//       return Promise.reject()
//     },
//   )
// }
//
// export const logout = () => (dispatch) => {
//   auth_service.logout()
//
//   dispatch({
//     type: LOGOUT,
//   })
// }
