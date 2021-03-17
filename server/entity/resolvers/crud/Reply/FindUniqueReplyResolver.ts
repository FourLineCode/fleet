import * as TypeGraphQL from "type-graphql";
import { FindUniqueReplyArgs } from "./args/FindUniqueReplyArgs";
import { Reply } from "../../../models/Reply";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class FindUniqueReplyResolver {
  @TypeGraphQL.Query(_returns => Reply, {
    nullable: true
  })
  async reply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueReplyArgs): Promise<Reply | null> {
    return getPrismaFromContext(ctx).reply.findUnique(args);
  }
}
