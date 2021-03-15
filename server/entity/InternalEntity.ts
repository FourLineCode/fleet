import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
export default abstract class InternalEntity extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	readonly id!: string

	@Field(() => Date)
	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date

	@Field(() => Date)
	@CreateDateColumn({ type: 'timestamp' })
	updatedAt!: Date
}
