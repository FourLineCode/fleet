import * as TypeGraphQL from "type-graphql";

export enum FollowScalarFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  fromId = "fromId",
  toId = "toId"
}
TypeGraphQL.registerEnumType(FollowScalarFieldEnum, {
  name: "FollowScalarFieldEnum",
  description: undefined,
});
