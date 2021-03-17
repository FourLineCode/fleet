import * as TypeGraphQL from "type-graphql";
import { UpdateManyReplyArgs } from "./args/UpdateManyReplyArgs";
import { Reply } from "../../../models/Reply";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class UpdateManyReplyResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyReply(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyReplyArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).reply.updateMany(args);
  }
}
