import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export default abstract class InternalEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	readonly id!: string

	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date

	@CreateDateColumn({ type: 'timestamp' })
	updatedAt!: Date
}
