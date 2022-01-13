export const filterQuery = (
  colection: string,
  localid: string,
  ForeigId: string,
  as: string,
  unwid: string,
  match: any,
) => [
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
export const filterQueryReverse = (
  colection: string,
  letV: any,
  req: any,
  as: string,
  match: any,
  lookup: any,
) => [
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
