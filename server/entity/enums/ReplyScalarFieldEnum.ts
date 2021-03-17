import * as TypeGraphQL from "type-graphql";

export enum ReplyScalarFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  body = "body",
  fleetId = "fleetId",
  userId = "userId"
}
TypeGraphQL.registerEnumType(ReplyScalarFieldEnum, {
  name: "ReplyScalarFieldEnum",
  description: undefined,
});
