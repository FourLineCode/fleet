import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReplyWhereInput } from "../../../inputs/ReplyWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyReplyArgs {
  @TypeGraphQL.Field(_type => ReplyWhereInput, {
    nullable: true
  })
  where?: ReplyWhereInput | undefined;
}
