import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReplyWhereInput } from "../inputs/ReplyWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class ReplyListRelationFilter {
  @TypeGraphQL.Field(_type => ReplyWhereInput, {
    nullable: true
  })
  every?: ReplyWhereInput | undefined;

  @TypeGraphQL.Field(_type => ReplyWhereInput, {
    nullable: true
  })
  some?: ReplyWhereInput | undefined;

  @TypeGraphQL.Field(_type => ReplyWhereInput, {
    nullable: true
  })
  none?: ReplyWhereInput | undefined;
}
