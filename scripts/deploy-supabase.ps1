$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$envPath = Join-Path $root "supabase\.env.local"

if (-not (Test-Path -LiteralPath $envPath)) {
  throw "Missing supabase\.env.local. Copy supabase\.env.local.example and fill in the values first."
}

Get-Content -LiteralPath $envPath | ForEach-Object {
  $line = $_.Trim()
  if (-not $line -or $line.StartsWith("#")) {
    return
  }

  $parts = $line.Split("=", 2)
  if ($parts.Count -ne 2) {
    return
  }

  [Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), "Process")
}

$projectRef = "mauhctyjkwkcudcteexf"

if (-not $env:SUPABASE_ACCESS_TOKEN) {
  throw "SUPABASE_ACCESS_TOKEN is missing."
}

if (-not $env:SUPABASE_ACCESS_TOKEN.StartsWith("sbp_")) {
  throw "SUPABASE_ACCESS_TOKEN must be a Supabase account access token that starts with sbp_. Create it from Account Settings > Access Tokens."
}

if (-not $env:ALLOWED_ORIGINS) {
  throw "ALLOWED_ORIGINS is missing."
}

Push-Location $root
try {
  npx.cmd supabase secrets set `
    "ALLOWED_ORIGINS=$env:ALLOWED_ORIGINS" `
    --project-ref $projectRef

  npx.cmd supabase functions deploy submit-entry --project-ref $projectRef --no-verify-jwt
}
finally {
  Pop-Location
}
