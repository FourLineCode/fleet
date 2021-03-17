import * as TypeGraphQL from "type-graphql";

export enum FleetScalarFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  body = "body",
  authorId = "authorId"
}
TypeGraphQL.registerEnumType(FleetScalarFieldEnum, {
  name: "FleetScalarFieldEnum",
  description: undefined,
});
