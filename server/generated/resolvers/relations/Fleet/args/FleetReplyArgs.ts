import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReplyOrderByInput } from "../../../inputs/ReplyOrderByInput";
import { ReplyWhereInput } from "../../../inputs/ReplyWhereInput";
import { ReplyWhereUniqueInput } from "../../../inputs/ReplyWhereUniqueInput";
import { ReplyScalarFieldEnum } from "../../../../enums/ReplyScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FleetReplyArgs {
  @TypeGraphQL.Field(_type => ReplyWhereInput, {
    nullable: true
  })
  where?: ReplyWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ReplyOrderByInput], {
    nullable: true
  })
  orderBy?: ReplyOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => ReplyWhereUniqueInput, {
    nullable: true
  })
  cursor?: ReplyWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ReplyScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "createdAt" | "updatedAt" | "body" | "fleetId" | "userId"> | undefined;
}
