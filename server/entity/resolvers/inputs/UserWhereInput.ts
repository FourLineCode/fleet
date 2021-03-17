import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { FleetListRelationFilter } from "../inputs/FleetListRelationFilter";
import { FollowListRelationFilter } from "../inputs/FollowListRelationFilter";
import { IntFilter } from "../inputs/IntFilter";
import { LikeListRelationFilter } from "../inputs/LikeListRelationFilter";
import { ReplyListRelationFilter } from "../inputs/ReplyListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserWhereInput {
  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  AND?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  OR?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  NOT?: UserWhereInput[] | undefined;

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
  email?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  password?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  username?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  displayName?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  bio?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => BoolFilter, {
    nullable: true
  })
  isAdmin?: BoolFilter | undefined;

  @TypeGraphQL.Field(_type => FleetListRelationFilter, {
    nullable: true
  })
  fleet?: FleetListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => FollowListRelationFilter, {
    nullable: true
  })
  followers?: FollowListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => FollowListRelationFilter, {
    nullable: true
  })
  following?: FollowListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => LikeListRelationFilter, {
    nullable: true
  })
  like?: LikeListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ReplyListRelationFilter, {
    nullable: true
  })
  reply?: ReplyListRelationFilter | undefined;
}
