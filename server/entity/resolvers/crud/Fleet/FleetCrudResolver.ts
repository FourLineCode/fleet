import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateFleetArgs } from "./args/AggregateFleetArgs";
import { CreateFleetArgs } from "./args/CreateFleetArgs";
import { DeleteFleetArgs } from "./args/DeleteFleetArgs";
import { DeleteManyFleetArgs } from "./args/DeleteManyFleetArgs";
import { FindFirstFleetArgs } from "./args/FindFirstFleetArgs";
import { FindManyFleetArgs } from "./args/FindManyFleetArgs";
import { FindUniqueFleetArgs } from "./args/FindUniqueFleetArgs";
import { UpdateFleetArgs } from "./args/UpdateFleetArgs";
import { UpdateManyFleetArgs } from "./args/UpdateManyFleetArgs";
import { UpsertFleetArgs } from "./args/UpsertFleetArgs";
import { transformFields, getPrismaFromContext } from "../../../helpers";
import { Fleet } from "../../../models/Fleet";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateFleet } from "../../outputs/AggregateFleet";

@TypeGraphQL.Resolver(_of => Fleet)
export class FleetCrudResolver {
  @TypeGraphQL.Query(_returns => Fleet, {
    nullable: true
  })
  async fleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueFleetArgs): Promise<Fleet | null> {
    return getPrismaFromContext(ctx).fleet.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => Fleet, {
    nullable: true
  })
  async findFirstFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstFleetArgs): Promise<Fleet | null> {
    return getPrismaFromContext(ctx).fleet.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Fleet], {
    nullable: false
  })
  async fleets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyFleetArgs): Promise<Fleet[]> {
    return getPrismaFromContext(ctx).fleet.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Fleet, {
    nullable: false
  })
  async createFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateFleetArgs): Promise<Fleet> {
    return getPrismaFromContext(ctx).fleet.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Fleet, {
    nullable: true
  })
  async deleteFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteFleetArgs): Promise<Fleet | null> {
    return getPrismaFromContext(ctx).fleet.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Fleet, {
    nullable: true
  })
  async updateFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateFleetArgs): Promise<Fleet | null> {
    return getPrismaFromContext(ctx).fleet.update(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyFleetArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).fleet.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyFleetArgs): Promise<AffectedRowsOutput> {
    return getPrismaFromContext(ctx).fleet.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Fleet, {
    nullable: false
  })
  async upsertFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertFleetArgs): Promise<Fleet> {
    return getPrismaFromContext(ctx).fleet.upsert(args);
  }

  @TypeGraphQL.Query(_returns => AggregateFleet, {
    nullable: false
  })
  async aggregateFleet(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateFleetArgs): Promise<AggregateFleet> {
    return getPrismaFromContext(ctx).fleet.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
