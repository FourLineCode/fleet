import { IsEmail } from 'class-validator'
import { Column, Entity, OneToMany } from 'typeorm'
import Fleet from './Fleet'
import InternalEntity from './InternalEntity'

@Entity()
export default class User extends InternalEntity {
	@Column({ unique: true })
	username: string

	@Column()
	displayName: string

	@Column({ default: '' })
	bio: string

	@Column({ unique: true })
	@IsEmail()
	email: string

	@Column()
	password: string

	@Column({ default: false })
	isAdmin: boolean

	@OneToMany(() => Fleet, (fleet) => fleet.author)
	fleets: Fleet[]
}
