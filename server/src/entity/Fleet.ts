import { Max } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import InternalEntity from './InternalEntity'
import Like from './Like'
import Reply from './Reply'
import User from './User'

@Entity()
export default class Fleet extends InternalEntity {
	@Column()
	@Max(240)
	body: string

	@ManyToOne(() => User, (author) => author.fleets)
	author: User

	@OneToMany(() => Like, (likes) => likes.fleet)
	likes: Like[]

	@OneToMany(() => Reply, (replies) => replies.fleet)
	replies: Reply[]
}
