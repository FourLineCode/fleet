import * as TypeGraphQL from "type-graphql";
import { DeleteManyReplyArgs } from "./args/DeleteManyReplyArgs";
import { Reply } from "../../../models/Reply";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class DeleteManyReplyResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyReplyArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).reply.deleteMany(args);
  }
}
