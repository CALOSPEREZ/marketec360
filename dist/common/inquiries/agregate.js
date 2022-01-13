"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterQueryReverse = exports.filterQuery = void 0;
const filterQuery = (colection, localid, ForeigId, as, unwid, match) => [
    {
        $lookup: {
            from: colection,
            localField: localid,
            foreignField: ForeigId,
            as: as,
        },
    },
    {
        $unwind: unwid,
    },
    {
        $match: match,
    },
];
exports.filterQuery = filterQuery;
const filterQueryReverse = (colection, letV, req, as, match, lookup) => [
    { $match: match },
    {
        $lookup: {
            from: colection,
            let: letV,
            pipeline: [{ $match: { $expr: { $eq: req } } }],
            as: as,
        },
    },
    {
        $lookup: lookup,
    },
    { $limit: 1 },
];
exports.filterQueryReverse = filterQueryReverse;
//# sourceMappingURL=agregate.js.map