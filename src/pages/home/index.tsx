import { Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { preloadData } from "src/shared/preloadData";
import { Discover } from "~components/discover/Discover";
import { Content } from "~components/layouts/Content";
import { Layout } from "~components/layouts/Layout";
import { FleetData } from "~components/timeline/FleetTimeline";
import { Timeline } from "~components/timeline/Timeline";

interface Props {
    fleets: FleetData[];
}

const Home = ({ fleets }: Props) => {
    return (
        <Layout authorized title="Home" desc="Home Page">
            <Content>
                <Stack display="flex" direction="row" w="100%">
                    <Timeline fleets={fleets} />
                    <Discover />
                </Stack>
            </Content>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await preloadData("/fleet/homepage", context);

    return {
        props: {
            fleets: data,
        },
    };
};

export default Home;
