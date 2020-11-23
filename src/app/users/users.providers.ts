import { User } from './model/user.model'
import { Save } from './model/save.model'

export const usersProviders = [
  { provide: 'User', useValue: User },
  { provide: 'Save', useValue: Save },
]
