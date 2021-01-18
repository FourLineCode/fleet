import { Entity, ManyToOne } from 'typeorm'
import InternalEntity from './InternalEntity'
import User from './User'

@Entity()
export default class Follow extends InternalEntity {
	@ManyToOne(() => User, (from) => from.following, { onDelete: 'CASCADE' })
	from: User

	@ManyToOne(() => User, (to) => to.followers, { onDelete: 'CASCADE' })
	to: User
}
