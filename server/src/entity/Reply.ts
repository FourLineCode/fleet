import { Max } from 'class-validator'
import { Column, Entity, getManager, ManyToOne } from 'typeorm'
import Fleet from './Fleet'
import InternalEntity from './InternalEntity'
import User from './User'

@Entity()
export default class Reply extends InternalEntity {
	@ManyToOne(() => Fleet, (fleet) => fleet.replies, { onDelete: 'CASCADE' })
	fleet: Fleet

	@ManyToOne(() => User, (user) => user.replies, { onDelete: 'CASCADE' })
	user: User

	@Column()
	@Max(240)
	body: string

	static async getOneReplyById(id: string) {
		try {
			return await getManager()
				.getRepository(Reply)
				.createQueryBuilder('reply')
				.where('reply.id = :id', { id })
				.leftJoinAndSelect('reply.user', 'user')
				.select(['reply', 'user.id', 'user.username', 'user.displayName', 'user.isAdmin'])
				.getOne()
		} catch (error) {
			throw error
		}
	}
}
