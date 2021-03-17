import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FollowScalarWhereInput } from "../inputs/FollowScalarWhereInput";
import { FollowUpdateManyMutationInput } from "../inputs/FollowUpdateManyMutationInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowUpdateManyWithWhereWithoutToInput {
  @TypeGraphQL.Field(_type => FollowScalarWhereInput, {
    nullable: false
  })
  where!: FollowScalarWhereInput;

  @TypeGraphQL.Field(_type => FollowUpdateManyMutationInput, {
    nullable: false
  })
  data!: FollowUpdateManyMutationInput;
}
