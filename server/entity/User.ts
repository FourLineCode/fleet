import { IsEmail } from 'class-validator'
import { Column, Entity, getManager, OneToMany } from 'typeorm'
import Fleet from './Fleet'
import Follow from './Follow'
import InternalEntity from './InternalEntity'
import Like from './Like'
import Reply from './Reply'

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

	@OneToMany(() => Follow, (follow) => follow.from)
	following: Follow[]

	@OneToMany(() => Follow, (follow) => follow.to)
	followers: Follow[]

	@OneToMany(() => Like, (likes) => likes.user)
	likedFleets: Like[]

	@OneToMany(() => Reply, (replies) => replies.user)
	replies: Reply[]

	static async getFollowUsers(id: string) {
		try {
			return await getManager()
				.getRepository(User)
				.createQueryBuilder('user')
				.where('user.id = :id', { id })
				.leftJoinAndSelect('user.followers', 'followers')
				.leftJoinAndSelect('followers.from', 'frfrom')
				.leftJoinAndSelect('followers.to', 'frto')
				.leftJoinAndSelect('user.following', 'following')
				.leftJoinAndSelect('following.from', 'fnfrom')
				.leftJoinAndSelect('following.to', 'fnto')
				.getOne()
		} catch (error) {
			throw error
		}
	}
}
