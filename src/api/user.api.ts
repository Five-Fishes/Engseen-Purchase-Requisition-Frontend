import { LOGIN } from '@constant/api-endpoints';
import { Login } from '@dto/i-login.dto';
import axios from 'axios';

export async function loginApi(login: Login) {
  return await axios.post<string>(LOGIN, login);
}
