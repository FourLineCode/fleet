import { Max } from 'class-validator'
import { Column, Entity, ManyToOne } from 'typeorm'
import Fleet from './Fleet'
import InternalEntity from './InternalEntity'
import User from './User'

@Entity()
export default class Reply extends InternalEntity {
	@ManyToOne(() => Fleet, (fleet) => fleet.replies)
	fleet: Fleet

	@ManyToOne(() => User, (user) => user.replies)
	user: User

	@Column()
	@Max(240)
	body: string
}
