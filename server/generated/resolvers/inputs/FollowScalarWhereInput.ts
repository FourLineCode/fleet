import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FollowScalarWhereInput {
  @TypeGraphQL.Field(_type => [FollowScalarWhereInput], {
    nullable: true
  })
  AND?: FollowScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowScalarWhereInput], {
    nullable: true
  })
  OR?: FollowScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [FollowScalarWhereInput], {
    nullable: true
  })
  NOT?: FollowScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  fromId?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  toId?: IntFilter | undefined;
}
