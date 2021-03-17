import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FleetCreateNestedManyWithoutAuthorInput } from "../inputs/FleetCreateNestedManyWithoutAuthorInput";
import { FollowCreateNestedManyWithoutFromInput } from "../inputs/FollowCreateNestedManyWithoutFromInput";
import { LikeCreateNestedManyWithoutUserInput } from "../inputs/LikeCreateNestedManyWithoutUserInput";
import { ReplyCreateNestedManyWithoutUserInput } from "../inputs/ReplyCreateNestedManyWithoutUserInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserCreateWithoutFollowingInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  password!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  username!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  displayName!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  bio?: string | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isAdmin?: boolean | undefined;

  @TypeGraphQL.Field(_type => FleetCreateNestedManyWithoutAuthorInput, {
    nullable: true
  })
  fleet?: FleetCreateNestedManyWithoutAuthorInput | undefined;

  @TypeGraphQL.Field(_type => FollowCreateNestedManyWithoutFromInput, {
    nullable: true
  })
  followers?: FollowCreateNestedManyWithoutFromInput | undefined;

  @TypeGraphQL.Field(_type => LikeCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  like?: LikeCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => ReplyCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  reply?: ReplyCreateNestedManyWithoutUserInput | undefined;
}
