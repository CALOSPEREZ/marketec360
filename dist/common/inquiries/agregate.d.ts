export declare const filterQuery: (colection: string, localid: string, ForeigId: string, as: string, unwid: string, match: any) => ({
    $lookup: {
        from: string;
        localField: string;
        foreignField: string;
        as: string;
    };
    $unwind?: undefined;
    $match?: undefined;
} | {
    $unwind: string;
    $lookup?: undefined;
    $match?: undefined;
} | {
    $match: any;
    $lookup?: undefined;
    $unwind?: undefined;
})[];
export declare const filterQueryReverse: (colection: string, letV: any, req: any, as: string, match: any, lookup: any) => ({
    $match: any;
    $lookup?: undefined;
    $limit?: undefined;
} | {
    $lookup: any;
    $match?: undefined;
    $limit?: undefined;
} | {
    $limit: number;
    $match?: undefined;
    $lookup?: undefined;
})[];
