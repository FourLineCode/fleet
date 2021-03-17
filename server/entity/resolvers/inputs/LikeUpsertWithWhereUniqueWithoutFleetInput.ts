import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LikeCreateWithoutFleetInput } from "../inputs/LikeCreateWithoutFleetInput";
import { LikeUpdateWithoutFleetInput } from "../inputs/LikeUpdateWithoutFleetInput";
import { LikeWhereUniqueInput } from "../inputs/LikeWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeUpsertWithWhereUniqueWithoutFleetInput {
  @TypeGraphQL.Field(_type => LikeWhereUniqueInput, {
    nullable: false
  })
  where!: LikeWhereUniqueInput;

  @TypeGraphQL.Field(_type => LikeUpdateWithoutFleetInput, {
    nullable: false
  })
  update!: LikeUpdateWithoutFleetInput;

  @TypeGraphQL.Field(_type => LikeCreateWithoutFleetInput, {
    nullable: false
  })
  create!: LikeCreateWithoutFleetInput;
}
