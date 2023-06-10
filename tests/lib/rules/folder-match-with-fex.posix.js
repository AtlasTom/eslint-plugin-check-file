/**
 * @file The folder should match the naming pattern specified by the file extension
 * @author Huan Luo
 */
'use strict';

const path = require('path');
const proxyquire = require('proxyquire');
const RuleTester = require('eslint').RuleTester;

const rule = proxyquire('../../../lib/rules/folder-match-with-fex', {
  path: { ...path.posix, '@global': true },
});
const ruleTester = new RuleTester();

ruleTester.run(
  "folder-match-with-fex with option: [{ '*.js': '**/__tests__/' }]",
  rule,
  {
    valid: [
      {
        code: "var foo = 'bar';",
        filename: '/__tests__/foo.test.js',
        options: [{ '*.js': '**/__tests__/' }],
      },
      {
        code: "var foo = 'bar';",
        filename: '__tests__/foo.test.js',
        options: [{ '*.js': '**/__tests__/' }],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.js',
        options: [{ '*.js': '**/__tests__/' }],
      },
      {
        code: "var foo = 'bar';",
        filename: '/bar/__tests__/foo.test.js',
        options: [{ '*.js': '**/__tests__/' }],
      },
    ],

    invalid: [
      {
        code: "var foo = 'bar';",
        filename: '/bar/__test__/foo.test.js',
        options: [{ '*.js': '**/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "/bar/__test__/foo.test.js" does not match the "**/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  }
);

ruleTester.run(
  "folder-match-with-fex with option: [{ '*.js': '*/__tests__/' }]",
  rule,
  {
    valid: [
      {
        code: "var foo = 'bar';",
        filename: '/__tests__/foo.test.js',
        options: [{ '*.js': '*/__tests__/' }],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.js',
        options: [{ '*.js': '*/__tests__/' }],
      },
    ],

    invalid: [
      {
        code: "var foo = 'bar';",
        filename: '/__test__/foo.test.js',
        options: [{ '*.js': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "/__test__/foo.test.js" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
      {
        code: "var foo = 'bar';",
        filename: '/bar/__tests__/foo.test.js',
        options: [{ '*.js': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "/bar/__tests__/foo.test.js" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
      {
        code: "var foo = 'bar';",
        filename: '__tests__/foo.test.js',
        options: [{ '*.js': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "__tests__/foo.test.js" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  }
);

ruleTester.run(
  "folder-match-with-fex with option: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }]",
  rule,
  {
    valid: [
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.js',
        options: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.jsx',
        options: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.ts',
        options: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.tsx',
        options: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }],
      },
    ],

    invalid: [
      {
        code: "var foo = 'bar';",
        filename: 'bar/_tests_/foo.test.js',
        options: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "bar/_tests_/foo.test.js" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/_tests_/foo.test.jsx',
        options: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "bar/_tests_/foo.test.jsx" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/_tests_/foo.test.ts',
        options: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "bar/_tests_/foo.test.ts" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/_tests_/foo.test.tsx',
        options: [{ '*.test.{js,jsx,ts,tsx}': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "bar/_tests_/foo.test.tsx" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  }
);

ruleTester.run(
  "folder-match-with-fex with option: [{ '*.test.js': '*/__tests__/', '*.test.ts': '*/__tests__/' }]",
  rule,
  {
    valid: [
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.js',
        options: [{ '*.test.js': '*/__tests__/', '*.test.ts': '*/__tests__/' }],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.ts',
        options: [{ '*.test.js': '*/__tests__/', '*.test.ts': '*/__tests__/' }],
      },
    ],

    invalid: [
      {
        code: "var foo = 'bar';",
        filename: 'bar/_tests_/foo.test.js',
        options: [{ '*.test.js': '*/__tests__/', '*.test.ts': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "bar/_tests_/foo.test.js" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
      {
        code: "var foo = 'bar';",
        filename: 'bar/_tests_/foo.test.ts',
        options: [{ '*.test.js': '*/__tests__/', '*.test.ts': '*/__tests__/' }],
        errors: [
          {
            message:
              'The folder of the file "bar/_tests_/foo.test.ts" does not match the "*/__tests__/" pattern',
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  }
);

ruleTester.run('folder-match-with-fex with fex that has not been set', rule, {
  valid: [
    {
      code: "var foo = 'bar';",
      filename: '/bar/__test__/foo.test.ts',
      options: [{ '*.js': '**/__tests__/', '*.jsx': '**/__tests__/' }],
    },
  ],

  invalid: [],
});

ruleTester.run(
  "folder-match-with-fex with option: [{ '*.test.js': 'FOO', '*.test.ts': '*/__tests__/' }]",
  rule,
  {
    valid: [],

    invalid: [
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.js',
        options: [{ '*.test.js': 'FOO', '*.test.ts': '*/__tests__/' }],
        errors: [
          {
            message:
              'There is an invalid pattern "FOO", please double-check it and try again',
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  }
);

ruleTester.run(
  "folder-match-with-fex with option: [{ '*.test.js': '*/__tests__/', '.test.ts': '*/__tests__/' }]",
  rule,
  {
    valid: [],

    invalid: [
      {
        code: "var foo = 'bar';",
        filename: 'bar/__tests__/foo.test.js',
        options: [{ '*.test.js': '*/__tests__/', '.test.ts': '*/__tests__/' }],
        errors: [
          {
            message:
              'There is an invalid pattern ".test.ts", please double-check it and try again',
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  }
);

ruleTester.run('folder-match-with-fex with option: []', rule, {
  valid: [],

  invalid: [
    {
      code: "var foo = 'bar';",
      filename: 'bar/__tests__/foo.test.js',
      options: [],
      errors: [
        {
          message: `The naming pattern object "undefined" does not appear to be an Object type, please double-check it and try again`,
          column: 1,
          line: 1,
        },
      ],
    },
  ],
});
