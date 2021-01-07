import { Entity, ManyToOne } from 'typeorm'
import InternalEntity from './InternalEntity'
import User from './User'

@Entity()
export default class Follow extends InternalEntity {
	@ManyToOne(() => User, (from) => from.following)
	from: User

	@ManyToOne(() => User, (to) => to.followers)
	to: User
}
