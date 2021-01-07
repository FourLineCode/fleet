import { Max } from 'class-validator'
import { Column, Entity } from 'typeorm'
import InternalEntity from './InternalEntity'
import User from './User'

@Entity()
export default class Fleet extends InternalEntity {
	@Column()
	@Max(240)
	body: string

	@Column(() => User)
	author: User

	@Column(() => User)
	likes: User[]
}
