import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";
import { LikeListRelationFilter } from "../inputs/LikeListRelationFilter";
import { ReplyListRelationFilter } from "../inputs/ReplyListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { UserRelationFilter } from "../inputs/UserRelationFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class FleetWhereInput {
  @TypeGraphQL.Field(_type => [FleetWhereInput], {
    nullable: true
  })
  AND?: FleetWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetWhereInput], {
    nullable: true
  })
  OR?: FleetWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [FleetWhereInput], {
    nullable: true
  })
  NOT?: FleetWhereInput[] | undefined;

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

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  body?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => UserRelationFilter, {
    nullable: true
  })
  author?: UserRelationFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  authorId?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => LikeListRelationFilter, {
    nullable: true
  })
  like?: LikeListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ReplyListRelationFilter, {
    nullable: true
  })
  reply?: ReplyListRelationFilter | undefined;
}
