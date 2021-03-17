import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeCreateWithoutUserInput } from "../inputs/LikeCreateWithoutUserInput";
import { LikeUpdateWithoutUserInput } from "../inputs/LikeUpdateWithoutUserInput";
import { LikeWhereUniqueInput } from "../inputs/LikeWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeUpsertWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => LikeWhereUniqueInput, {
    nullable: false
  })
  where!: LikeWhereUniqueInput;

  @TypeGraphQL.Field(_type => LikeUpdateWithoutUserInput, {
    nullable: false
  })
  update!: LikeUpdateWithoutUserInput;

  @TypeGraphQL.Field(_type => LikeCreateWithoutUserInput, {
    nullable: false
  })
  create!: LikeCreateWithoutUserInput;
}
