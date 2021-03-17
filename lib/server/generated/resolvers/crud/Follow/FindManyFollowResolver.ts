import * as TypeGraphQL from "type-graphql";
import { FindManyFollowArgs } from "./args/FindManyFollowArgs";
import { Follow } from "../../../models/Follow";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class FindManyFollowResolver {
  @TypeGraphQL.Query(_returns => [Follow], {
    nullable: false
  })
  async follows(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyFollowArgs): Promise<Follow[]> {
    return getPrismaFromContext(ctx).follow.findMany(args);
  }
}
