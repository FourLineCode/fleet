import * as TypeGraphQL from "type-graphql";
import { CreateFollowArgs } from "./args/CreateFollowArgs";
import { Follow } from "../../../models/Follow";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class CreateFollowResolver {
  @TypeGraphQL.Mutation(_returns => Follow, {
    nullable: false
  })
  async createFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateFollowArgs): Promise<Follow> {
    return getPrismaFromContext(ctx).follow.create(args);
  }
}
