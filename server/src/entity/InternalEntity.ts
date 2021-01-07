import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export default abstract class InternalEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	readonly id!: string

	@CreateDateColumn({ type: 'datetime' })
	createdAt!: Date

	@CreateDateColumn({ type: 'datetime' })
	updatedAt!: Date
}
