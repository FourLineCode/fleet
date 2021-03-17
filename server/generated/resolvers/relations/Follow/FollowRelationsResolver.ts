import * as TypeGraphQL from "type-graphql";
import { Follow } from "../../../models/Follow";
import { User } from "../../../models/User";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Follow)
export class FollowRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async from(@TypeGraphQL.Root() follow: Follow, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).follow.findUnique({
      where: {
        id: follow.id,
      },
    }).from({});
  }

  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async to(@TypeGraphQL.Root() follow: Follow, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).follow.findUnique({
      where: {
        id: follow.id,
      },
    }).to({});
  }
}
