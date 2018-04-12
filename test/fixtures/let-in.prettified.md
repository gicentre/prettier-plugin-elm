[Source](https://github.com/avh4/elm-format/issues/350)

```elm
viewEntriesWithLetIn : String -> List Entry -> Html Msg
viewEntriesWithLetIn visibility entries =
    let
        allCompleted =
            List.all .completed entries
    in
    section
        [ class "main" ]
        [ input
            [ class "toggle-all"
            , type_ "checkbox"
            , name "toggle"
            , checked allCompleted
            , onClick (CheckAll (not allCompleted))
            ]
            []
        , label
            [ for "toggle-all" ]
            [ text "Mark all as complete" ]
        , Keyed.ul [ class "todo-list" ] <|
            List.map viewKeyedEntry entries
        ]
```
