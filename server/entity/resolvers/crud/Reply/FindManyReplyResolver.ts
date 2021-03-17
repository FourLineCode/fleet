import * as TypeGraphQL from "type-graphql";
import { FindManyReplyArgs } from "./args/FindManyReplyArgs";
import { Reply } from "../../../models/Reply";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class FindManyReplyResolver {
  @TypeGraphQL.Query(_returns => [Reply], {
    nullable: false
  })
  async replies(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyReplyArgs): Promise<Reply[]> {
    return getPrismaFromContext(ctx).reply.findMany(args);
  }
}
