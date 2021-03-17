import * as TypeGraphQL from "type-graphql";
import { Fleet } from "../../../models/Fleet";
import { Reply } from "../../../models/Reply";
import { User } from "../../../models/User";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reply)
export class ReplyRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Fleet, {
    nullable: false
  })
  async fleet(@TypeGraphQL.Root() reply: Reply, @TypeGraphQL.Ctx() ctx: any): Promise<Fleet> {
    return getPrismaFromContext(ctx).reply.findUnique({
      where: {
        id: reply.id,
      },
    }).fleet({});
  }

  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async user(@TypeGraphQL.Root() reply: Reply, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).reply.findUnique({
      where: {
        id: reply.id,
      },
    }).user({});
  }
}
