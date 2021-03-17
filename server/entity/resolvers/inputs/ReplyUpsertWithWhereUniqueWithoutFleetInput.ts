import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyCreateWithoutFleetInput } from "../inputs/ReplyCreateWithoutFleetInput";
import { ReplyUpdateWithoutFleetInput } from "../inputs/ReplyUpdateWithoutFleetInput";
import { ReplyWhereUniqueInput } from "../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyUpsertWithWhereUniqueWithoutFleetInput {
  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: false
  })
  where!: ReplyWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReplyUpdateWithoutFleetInput, {
    nullable: false
  })
  update!: ReplyUpdateWithoutFleetInput;

  @TypeGraphQL.Field(_type => ReplyCreateWithoutFleetInput, {
    nullable: false
  })
  create!: ReplyCreateWithoutFleetInput;
}
