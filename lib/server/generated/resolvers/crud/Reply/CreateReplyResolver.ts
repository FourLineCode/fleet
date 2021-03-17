import * as TypeGraphQL from "type-graphql";
import { CreateReplyArgs } from "./args/CreateReplyArgs";
import { Reply } from "../../../models/Reply";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class CreateReplyResolver {
  @TypeGraphQL.Mutation(_returns => Reply, {
    nullable: false
  })
  async createReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateReplyArgs): Promise<Reply> {
    return getPrismaFromContext(ctx).reply.create(args);
  }
}
