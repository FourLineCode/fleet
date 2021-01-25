import { Max } from 'class-validator'
import { Column, Entity, getManager, ManyToOne, OneToMany } from 'typeorm'
import Follow from './Follow'
import InternalEntity from './InternalEntity'
import Like from './Like'
import Reply from './Reply'
import User from './User'

@Entity()
export default class Fleet extends InternalEntity {
	@Column()
	@Max(240)
	body: string

	@ManyToOne(() => User, (author) => author.fleets, { onDelete: 'CASCADE' })
	author: User

	@OneToMany(() => Like, (likes) => likes.fleet)
	likes: Like[]

	@OneToMany(() => Reply, (replies) => replies.fleet)
	replies: Reply[]

	liked: boolean | null

	static async getAllFleets() {
		try {
			return (
				(await getManager()
					.getRepository(Fleet)
					.createQueryBuilder('fleet')
					.leftJoinAndSelect('fleet.author', 'author')
					.leftJoinAndSelect('fleet.likes', 'likes')
					.leftJoinAndSelect('fleet.replies', 'replies')
					.orderBy('fleet.createdAt', 'DESC')
					.select([
						'fleet',
						'likes',
						'replies',
						'author.id',
						'author.username',
						'author.displayName',
						'author.isAdmin',
					])
					.getMany()) || []
			)
		} catch (error) {
			throw error
		}
	}

	static async getOneFleetById(id: string) {
		try {
			return await getManager()
				.getRepository(Fleet)
				.createQueryBuilder('fleet')
				.where('fleet.id = :id', { id })
				.leftJoinAndSelect('fleet.author', 'author')
				.leftJoinAndSelect('fleet.likes', 'likes')
				.leftJoinAndSelect('fleet.replies', 'replies')
				.leftJoinAndSelect('replies.user', 'user')
				.orderBy('replies.createdAt', 'ASC')
				.select([
					'fleet',
					'likes',
					'replies',
					'user.id',
					'user.username',
					'user.displayName',
					'user.isAdmin',
					'author.id',
					'author.username',
					'author.displayName',
					'author.isAdmin',
				])
				.getOne()
		} catch (error) {
			throw error
		}
	}

	static async getHomepageForUser(id: string) {
		try {
			const followedUsers = await getManager()
				.getRepository(Follow)
				.createQueryBuilder('follow')
				.leftJoinAndSelect('follow.from', 'from')
				.where('from.id = :id', { id })
				.leftJoinAndSelect('follow.to', 'to')
				.getMany()

			const followedUserIds = followedUsers.map((follow) => String(follow.to.id))
			followedUserIds.push(String(id))

			const fleets = await getManager()
				.getRepository(Fleet)
				.createQueryBuilder('fleets')
				.leftJoinAndSelect('fleets.author', 'author')
				.leftJoinAndSelect('fleets.likes', 'likes')
				.leftJoinAndSelect('fleets.replies', 'replies')
				.where('author.id IN (:...followedUserIds)', { followedUserIds })
				.orderBy('fleets.createdAt', 'DESC')
				.select([
					'fleets',
					'likes',
					'replies',
					'author.id',
					'author.username',
					'author.displayName',
					'author.isAdmin',
				])
				.getMany()

			for (const fleet of fleets) {
				const like = await Like.findOne({ where: { user: id, fleet: fleet } })
				fleet.liked = !!like
			}

			return fleets
		} catch (error) {
			throw error
		}
	}

	static async getFleetsByUserId(id: string) {
		try {
			const user = await getManager()
				.getRepository(User)
				.createQueryBuilder('user')
				.where('user.id = :id', { id })
				.leftJoinAndSelect('user.fleets', 'fleets')
				.leftJoinAndSelect('fleets.author', 'author')
				.leftJoinAndSelect('fleets.likes', 'likes')
				.leftJoinAndSelect('fleets.replies', 'replies')
				.orderBy('fleets.createdAt', 'DESC')
				.select([
					'user',
					'fleets',
					'likes',
					'replies',
					'author.id',
					'author.username',
					'author.displayName',
					'author.bio',
					'author.isAdmin',
				])
				.getOne()

			const fleets = user?.fleets || []

			return fleets
		} catch (error) {
			throw error
		}
	}
}
