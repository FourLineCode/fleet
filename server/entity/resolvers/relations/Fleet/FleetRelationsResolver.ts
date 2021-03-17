import * as TypeGraphQL from "type-graphql";
import { Fleet } from "../../../models/Fleet";
import { Like } from "../../../models/Like";
import { Reply } from "../../../models/Reply";
import { User } from "../../../models/User";
import { FleetLikeArgs } from "./args/FleetLikeArgs";
import { FleetReplyArgs } from "./args/FleetReplyArgs";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class FleetRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false
  })
  async author(@TypeGraphQL.Root() fleet: Fleet, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return getPrismaFromContext(ctx).fleet.findUnique({
      where: {
        id: fleet.id,
      },
    }).author({});
  }

  @TypeGraphQL.FieldResolver(_type => [Like], {
    nullable: false
  })
  async like(@TypeGraphQL.Root() fleet: Fleet, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FleetLikeArgs): Promise<Like[]> {
    return getPrismaFromContext(ctx).fleet.findUnique({
      where: {
        id: fleet.id,
      },
    }).like(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Reply], {
    nullable: false
  })
  async reply(@TypeGraphQL.Root() fleet: Fleet, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FleetReplyArgs): Promise<Reply[]> {
    return getPrismaFromContext(ctx).fleet.findUnique({
      where: {
        id: fleet.id,
      },
    }).reply(args);
  }
}
