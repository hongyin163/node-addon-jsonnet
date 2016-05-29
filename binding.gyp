{
  "targets": [
    {
      "target_name": "jsonnet",
      "sources": [       	
      	"core/desugarer.cpp",
      	"core/formatter.cpp",
      	"core/lexer.cpp",
      	"core/libjsonnet.cpp",
      	"core/parser.cpp",
      	"core/static_analysis.cpp",
      	"core/string_utils.cpp",
      	"core/vm.cpp",
      	"jsonnet.cc"
      ],
      'cflags_cc!': [ '-fno-rtti' ],
      'cflags_cc':['-fexceptions']
    }
  ]
}