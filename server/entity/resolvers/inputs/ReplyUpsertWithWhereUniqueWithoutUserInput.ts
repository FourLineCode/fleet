import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyCreateWithoutUserInput } from "../inputs/ReplyCreateWithoutUserInput";
import { ReplyUpdateWithoutUserInput } from "../inputs/ReplyUpdateWithoutUserInput";
import { ReplyWhereUniqueInput } from "../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyUpsertWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: false
  })
  where!: ReplyWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReplyUpdateWithoutUserInput, {
    nullable: false
  })
  update!: ReplyUpdateWithoutUserInput;

  @TypeGraphQL.Field(_type => ReplyCreateWithoutUserInput, {
    nullable: false
  })
  create!: ReplyCreateWithoutUserInput;
}
