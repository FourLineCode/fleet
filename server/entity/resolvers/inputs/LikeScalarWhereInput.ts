import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class LikeScalarWhereInput {
  @TypeGraphQL.Field(_type => [LikeScalarWhereInput], {
    nullable: true
  })
  AND?: LikeScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeScalarWhereInput], {
    nullable: true
  })
  OR?: LikeScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LikeScalarWhereInput], {
    nullable: true
  })
  NOT?: LikeScalarWhereInput[] | undefined;

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
  fleetId?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  userId?: IntFilter | undefined;
}
