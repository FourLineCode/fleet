import * as TypeGraphQL from "type-graphql";
import { Fleet } from "../../../models/Fleet";
import { Like } from "../../../models/Like";
import { User } from "../../../models/User";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Like)
export class LikeRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Fleet, {
    nullable: false
  })
  async fleet(@TypeGraphQL.Root() like: Like, @TypeGraphQL.Ctx() ctx: any): Promise<Fleet> {
    return getPrismaFromContext(ctx).like.findUnique({
      where: {
        id: like.id,
      },
    }).fleet({});
  }

  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async user(@TypeGraphQL.Root() like: Like, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).like.findUnique({
      where: {
        id: like.id,
      },
    }).user({});
  }
}
