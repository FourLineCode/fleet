import * as TypeGraphQL from "type-graphql";
import { FindManyLikeArgs } from "./args/FindManyLikeArgs";
import { Like } from "../../../models/Like";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class FindManyLikeResolver {
  @TypeGraphQL.Query(_returns => [Like], {
    nullable: false
  })
  async likes(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyLikeArgs): Promise<Like[]> {
    return getPrismaFromContext(ctx).like.findMany(args);
  }
}
