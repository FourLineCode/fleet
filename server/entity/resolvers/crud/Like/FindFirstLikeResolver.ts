import * as TypeGraphQL from "type-graphql";
import { FindFirstLikeArgs } from "./args/FindFirstLikeArgs";
import { Like } from "../../../models/Like";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class FindFirstLikeResolver {
  @TypeGraphQL.Query(_returns => Like, {
    nullable: true
  })
  async findFirstLike(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstLikeArgs): Promise<Like | null> {
    return getPrismaFromContext(ctx).like.findFirst(args);
  }
}
