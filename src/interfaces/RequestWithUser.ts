import { Request } from 'express';
import { User } from '../models/User';
 
interface IRequestWithUser extends Request {
  user: User
}
 
export default IRequestWitUser;