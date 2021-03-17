import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeCreateWithoutUserInput } from "../inputs/LikeCreateWithoutUserInput";
import { LikeWhereUniqueInput } from "../inputs/LikeWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeCreateOrConnectWithoutUserInput {
  @TypeGraphQL.Field(_type => LikeWhereUniqueInput, {
    nullable: false
  })
  where!: LikeWhereUniqueInput;

  @TypeGraphQL.Field(_type => LikeCreateWithoutUserInput, {
    nullable: false
  })
  create!: LikeCreateWithoutUserInput;
}
