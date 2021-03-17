import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { User } from "../models/User";

@TypeGraphQL.ObjectType({
  isAbstract: true
})
export class Follow {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  from?: User;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  fromId!: number;

  to?: User;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  toId!: number;
}
