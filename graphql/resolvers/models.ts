import { Kind } from 'graphql'
import { objectType, scalarType } from 'nexus'

export const User = objectType({
	name: 'User',
	definition: (t) => {
		t.int('id')
		t.dateTime('createdAt')
		t.dateTime('updatedAt')
		t.string('email')
		t.string('password')
		t.string('username')
		t.string('displayName')
		t.string('bio')
		t.boolean('isAdmin')
		t.list.field('fleet', { type: 'Fleet' })
		t.list.field('followers', { type: 'Follow' })
		t.list.field('following', { type: 'Follow' })
		t.list.field('like', { type: 'Like' })
		t.list.field('reply', { type: 'Reply' })
	},
})

export const Fleet = objectType({
	name: 'Fleet',
	definition: (t) => {
		t.int('id')
		t.dateTime('createdAt')
		t.dateTime('updatedAt')
		t.string('body')
		t.int('authorId')
		t.field('author', { type: 'User' })
		t.list.field('like', { type: 'Like' })
		t.list.field('reply', { type: 'Reply' })
	},
})

export const Follow = objectType({
	name: 'Follow',
	definition: (t) => {
		t.int('id')
		t.dateTime('createdAt')
		t.dateTime('updatedAt')
		t.int('fromId')
		t.field('from', { type: 'User' })
		t.int('toId')
		t.field('to', { type: 'User' })
	},
})

export const Like = objectType({
	name: 'Like',
	definition: (t) => {
		t.int('id')
		t.dateTime('createdAt')
		t.dateTime('updatedAt')
		t.int('fleetId')
		t.field('fleet', { type: 'Fleet' })
		t.int('userId')
		t.field('user', { type: 'User' })
	},
})

export const Reply = objectType({
	name: 'Reply',
	definition: (t) => {
		t.int('id')
		t.dateTime('createdAt')
		t.dateTime('updatedAt')
		t.int('fleetId')
		t.field('fleet', { type: 'Fleet' })
		t.int('userId')
		t.field('user', { type: 'User' })
	},
})

export const DateScalar = scalarType({
	name: 'dateTime',
	asNexusMethod: 'dateTime',
	description: 'Date custom scalar type',
	parseValue(value) {
		const date = new Date(value)
		return date.getTime()
	},
	serialize(value) {
		return new Date(value)
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value)
		}
		return null
	},
})

export const SignInResponse = objectType({
	name: 'SignInResponse',
	definition: (t) => {
		t.boolean('success')
		t.int('id')
		t.string('token')
		t.string('refreshToken')
	},
})
