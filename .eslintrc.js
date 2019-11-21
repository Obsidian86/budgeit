module.exports = {
    "parser": "babel-eslint",
    "extends": [
      "standard",
      "standard-react"
    ],
    "plugins": [
      "babel",
      "react",
      "promise"
    ],
    "env": {
      "browser" : true
    },
    "globals": {
      "__DEV__"      : false,
      "__TEST__"     : false,
      "__PROD__"     : false,
      "__COVERAGE__" : false
    },
    "rules": {
      "key-spacing"              : "off", 
      "jsx-quotes"               : [2, "prefer-single"],
      "max-len"                  : [2, 120, 2],
      "object-curly-spacing"     : [2, "always"],
      "comma-dangle"             : "off",
      "react/prop-types"         : 0,
      "react/jsx-curly-newline"  : 0
    }
  }

