import { ObjectType } from 'type-graphql'
import { SignInResult } from './SignInResult'

@ObjectType()
export class RefreshTokenResult extends SignInResult {}
