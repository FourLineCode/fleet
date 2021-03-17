import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyUpdateWithoutFleetInput } from "../inputs/ReplyUpdateWithoutFleetInput";
import { ReplyWhereUniqueInput } from "../inputs/ReplyWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyUpdateWithWhereUniqueWithoutFleetInput {
  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: false
  })
  where!: ReplyWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReplyUpdateWithoutFleetInput, {
    nullable: false
  })
  data!: ReplyUpdateWithoutFleetInput;
}
