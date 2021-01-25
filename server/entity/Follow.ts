import { Entity, getManager, ManyToOne } from 'typeorm'
import InternalEntity from './InternalEntity'
import User from './User'

@Entity()
export default class Follow extends InternalEntity {
	@ManyToOne(() => User, (from) => from.following, { onDelete: 'CASCADE' })
	from: User

	@ManyToOne(() => User, (to) => to.followers, { onDelete: 'CASCADE' })
	to: User

	static async unfollow({ from, to }: { from: string; to: string }) {
		try {
			await getManager()
				.getRepository(Follow)
				.createQueryBuilder('follow')
				.delete()
				.where('from = :from', { from })
				.andWhere('to = :to', { to })
				.execute()
		} catch (error) {
			throw error
		}
	}
}
