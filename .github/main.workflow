workflow "Validate YAML" {
  on = "pull_request"
  resolves = ["validate-yaml"]
}

action "validate-yaml" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
}
