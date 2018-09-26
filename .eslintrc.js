module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": 0,
        "linebreak-style": ["error", "windows"],
        "react/destructuring-assignment": {"ignoreClassFields": true},
        "object-shorthand": 0,
        "jsx-a11y/label-has-for": [ 2, {
            "components": [ "Label" ],
            "required": {
                "some": [ "nesting", "id" ]
            },
            "allowChildren": false,
        }],
        "jsx-a11y/label-has-associated-control": 0,
        "react/jsx-one-expression-per-line": {"allow": "literal"},
        "react/prop-types": { ignore: ["firebase", "user"]},
        "max-len": [2, 150],
        "react/prefer-stateless-function": 0,
        "no-plusplus": ["error", {"allowForLoopAfterthoughts": true}]
    }
};