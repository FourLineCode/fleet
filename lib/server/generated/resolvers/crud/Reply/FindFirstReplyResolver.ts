import * as TypeGraphQL from "type-graphql";
import { FindFirstReplyArgs } from "./args/FindFirstReplyArgs";
import { Reply } from "../../../models/Reply";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class FindFirstReplyResolver {
  @TypeGraphQL.Query(_returns => Reply, {
    nullable: true
  })
  async findFirstReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstReplyArgs): Promise<Reply | null> {
    return getPrismaFromContext(ctx).reply.findFirst(args);
  }
}
