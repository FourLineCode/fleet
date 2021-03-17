import * as TypeGraphQL from "type-graphql";
import { UpdateManyFollowArgs } from "./args/UpdateManyFollowArgs";
import { Follow } from "../../../models/Follow";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class UpdateManyFollowResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyFollow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyFollowArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).follow.updateMany(args);
  }
}
