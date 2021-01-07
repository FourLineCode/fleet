import { IsEmail } from 'class-validator'
import { Column, Entity } from 'typeorm'
import InternalEntity from './InternalEntity'

@Entity()
export default class User extends InternalEntity {
	@Column({ unique: true })
	username: string

	@Column()
	displayName: string

	@Column({ nullable: true })
	bio: string

	@Column({ unique: true })
	@IsEmail()
	email: string

	@Column()
	password: string

	@Column({ default: false })
	isAdmin: boolean
}
