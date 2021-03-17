import * as TypeGraphQL from "type-graphql";
import { UpsertReplyArgs } from "./args/UpsertReplyArgs";
import { Reply } from "../../../models/Reply";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class UpsertReplyResolver {
  @TypeGraphQL.Mutation(_returns => Reply, {
    nullable: false
  })
  async upsertReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertReplyArgs): Promise<Reply> {
    return getPrismaFromContext(ctx).reply.upsert(args);
  }
}
