import * as TypeGraphQL from "type-graphql";
import { DeleteReplyArgs } from "./args/DeleteReplyArgs";
import { Reply } from "../../../models/Reply";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class DeleteReplyResolver {
  @TypeGraphQL.Mutation(_returns => Reply, {
    nullable: true
  })
  async deleteReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteReplyArgs): Promise<Reply | null> {
    return getPrismaFromContext(ctx).reply.delete(args);
  }
}
