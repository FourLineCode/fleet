import * as TypeGraphQL from "type-graphql";
import { FindUniqueFollowArgs } from "./args/FindUniqueFollowArgs";
import { Follow } from "../../../models/Follow";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class FindUniqueFollowResolver {
  @TypeGraphQL.Query(_returns => Follow, {
    nullable: true
  })
  async follow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueFollowArgs): Promise<Follow | null> {
    return getPrismaFromContext(ctx).follow.findUnique(args);
  }
}
