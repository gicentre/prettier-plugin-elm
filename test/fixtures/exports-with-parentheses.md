# module is declared

```elm
module Main exposing (MapSize(..), DataChange(..), OrderType(..), SortOrder(..))
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
```

# module is not declared

```elm
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
```