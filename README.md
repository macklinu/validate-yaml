# validate-yaml

> A GitHub Action that validates YAML files based on a JSON Schema

_:construction: This is a work-in-progress :construction:_

## Setup

Setup your action:

```workflow
action "Validate YAML" {
  uses = "macklinu/validate-yaml@master"
  secrets = ["GITHUB_TOKEN"]
}
```

Provide a `validate-yaml.yml` config:

```yml
files:
  - patterns:
      - src/data/**/*.yml
    schema:
      type: object
      properties:
        name:
          type: string
        url:
          type: string
          format: uri
        type:
          type: string
          enum:
            - maintainer
            - contributor
            - owner
```

or, if you like JSON, a `.validateyamlrc` file:

```json
{
  "files": [
    {
      "patterns": ["src/data/**/*.yml"],
      "schema": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "url": { "type": "string", "format": "uri" },
          "type": {
            "type": "string",
            "enum": ["maintainer", "contributor", "owner"]
          }
        }
      }
    }
  ]
}
```

or in `package.json`:

```json
{
  "validate-yaml": {
    "files": [
      {
        "patterns": ["src/data/**/*.yml"],
        "schema": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "url": { "type": "string", "format": "uri" },
            "type": {
              "type": "string",
              "enum": ["maintainer", "contributor", "owner"]
            }
          }
        }
      }
    ]
  }
}
```

## Implementation Notes

- runs on pull request
- should validate globs
- find files in pull request that match globs
- parse YAML as JSON
- for each file that matches a glob, validate the JSON against the proper JSON Schema
- exit 0 when all succeeds
- exit 1 for any errors (invalid schema, invalid YAML, etc.)
