import React from 'react'
import Masonry from 'react-masonry-css'
import {breakpointColumnsObj} from '@/config/clientConfig'
import TrendCard, { TrendCardProps } from './TrendCard';


function TrendsGrid({
    trends,
    sentimentLoading
}: {
    trends: TrendCardProps[];
    sentimentLoading: boolean;
}) {
    return (
        <div>
            <Masonry breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {trends.map((trend, index) => (
                    <TrendCard key={index} {...trend} sentimentLoading={sentimentLoading} index={index} />
                ))}
            </Masonry>
        </div>
    )
}

export default TrendsGrid
