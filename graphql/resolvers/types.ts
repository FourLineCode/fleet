import { objectType } from 'nexus'

export const User = objectType({
	name: 'User',
	definition: (t) => {
		t.int('id')
		t.string('email')
		t.string('password')
		t.string('username')
		t.string('displayName')
		t.string('bio')
		t.boolean('isAdmin')
		t.dateTime('createdAt')
		t.dateTime('updatedAt')
	},
})
