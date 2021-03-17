import * as TypeGraphQL from "type-graphql";
import { DeleteLikeArgs } from "./args/DeleteLikeArgs";
import { Like } from "../../../models/Like";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class DeleteLikeResolver {
  @TypeGraphQL.Mutation(_returns => Like, {
    nullable: true
  })
  async deleteLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteLikeArgs): Promise<Like | null> {
    return getPrismaFromContext(ctx).like.delete(args);
  }
}
