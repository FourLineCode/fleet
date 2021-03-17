import * as TypeGraphQL from "type-graphql";
import { UpdateManyLikeArgs } from "./args/UpdateManyLikeArgs";
import { Like } from "../../../models/Like";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class UpdateManyLikeResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyLikeArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).like.updateMany(args);
  }
}
