import * as TypeGraphQL from "type-graphql";
import { CreateFleetArgs } from "./args/CreateFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class CreateFleetResolver {
  @TypeGraphQL.Mutation(_returns => Fleet, {
    nullable: false
  })
  async createFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateFleetArgs): Promise<Fleet> {
    return getPrismaFromContext(ctx).fleet.create(args);
  }
}
