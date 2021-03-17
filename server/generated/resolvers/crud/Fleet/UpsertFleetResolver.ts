import * as TypeGraphQL from "type-graphql";
import { UpsertFleetArgs } from "./args/UpsertFleetArgs";
import { Fleet } from "../../../models/Fleet";
import { transformFields, getPrismaFromContext } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Fleet)
export class UpsertFleetResolver {
  @TypeGraphQL.Mutation(_returns => Fleet, {
    nullable: false
  })
  async upsertFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertFleetArgs): Promise<Fleet> {
    return getPrismaFromContext(ctx).fleet.upsert(args);
  }
}
