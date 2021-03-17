import * as TypeGraphQL from "type-graphql";
import { UpdateReplyArgs } from "./args/UpdateReplyArgs";
import { Reply } from "../../../models/Reply";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class UpdateReplyResolver {
  @TypeGraphQL.Mutation(_returns => Reply, {
    nullable: true
  })
  async updateReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateReplyArgs): Promise<Reply | null> {
    return getPrismaFromContext(ctx).reply.update(args);
  }
}
