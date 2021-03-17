import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReplyUpdateManyMutationInput } from "../../../inputs/ReplyUpdateManyMutationInput";
import { ReplyWhereInput } from "../../../inputs/ReplyWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyReplyArgs {
  @TypeGraphQL.Field(_type => ReplyUpdateManyMutationInput, {
    nullable: false
  })
  data!: ReplyUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ReplyWhereInput, {
    nullable: true
  })
  where?: ReplyWhereInput | undefined;
}
