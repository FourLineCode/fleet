import { Column, Entity } from 'typeorm'
import InternalEntity from './InternalEntity'
import User from './User'

@Entity()
export default class Follow extends InternalEntity {
	@Column(() => User)
	from: User

	@Column(() => User)
	to: User
}
