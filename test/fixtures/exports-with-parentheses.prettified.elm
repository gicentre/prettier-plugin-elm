module Main exposing (DataChange(..), MapSize(..), OrderType(..), SortOrder(..))


type OrderType
    = ByLongitude
    | ByLatitude
    | BySize


type SortOrder
    = Asc
    | Desc


type DataChange
    = NoChange
    | Rand5pc
    | LeaveBy Float


type MapSize
    = Small
    | Medium
    | Large
