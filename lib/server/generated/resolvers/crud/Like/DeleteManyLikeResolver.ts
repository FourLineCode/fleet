import * as TypeGraphQL from "type-graphql";
import { DeleteManyLikeArgs } from "./args/DeleteManyLikeArgs";
import { Like } from "../../../models/Like";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class DeleteManyLikeResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyLikeArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).like.deleteMany(args);
  }
}
