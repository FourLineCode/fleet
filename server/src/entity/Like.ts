import { Entity, ManyToOne } from 'typeorm'
import Fleet from './Fleet'
import InternalEntity from './InternalEntity'
import User from './User'

@Entity()
export default class Like extends InternalEntity {
	@ManyToOne(() => User, (user) => user.likedFleets, { onDelete: 'CASCADE' })
	user: User

	@ManyToOne(() => Fleet, (fleet) => fleet.likes, { onDelete: 'CASCADE' })
	fleet: Fleet
}
