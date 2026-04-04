# RodeoDay iOS MVP

Simple iOS SwiftUI app concept to aggregate rodeo and auction events globally with regional filters and premium upsell points.

## Scope

- Global event feed (rodeos and auctions)
- Filters by country, state/region, event type, and source association
- Favorites and alert-ready data model
- Integration placeholders for PRCA, PBR, and ABQM
- Premium-ready architecture notes for monthly subscription

## Suggested Architecture

- UI: SwiftUI + MVVM
- Data: local sample JSON for rapid prototyping
- Aggregation: provider abstraction to support each source
- Monetization: StoreKit 2 and RevenueCat integration in next step

## Folder Layout

- RodeoDay/App: app entry point
- RodeoDay/Models: domain models and filters
- RodeoDay/Services: aggregator and source providers
- RodeoDay/ViewModels: screen state and filtering logic
- RodeoDay/Views: SwiftUI screens
- RodeoDay/Resources/SampleData: seed data for local run
- RodeoDayTests: basic filtering tests

## Data Sources (planned)

- PRCA official events feed/API (if publicly available)
- PBR events source
- ABQM events source
- Additional country providers through the same protocol

## Premium Plan (next increment)

- Monthly subscription unlocks:
  - Unlimited smart alerts
  - Proximity map and geo alerts
  - Priority event updates and ticket/auction links

## Build and Run

This workspace is scaffolded for implementation in Xcode on macOS.

1. Open this folder on a Mac with Xcode 15+.
2. Create an iOS App target named RodeoDay and include the provided source files.
3. Add events.json to app bundle resources.
4. Run tests in RodeoDayTests.

## Why no full compile here

Current setup environment is Windows, and iOS compilation requires Xcode/macOS. The codebase is prepared so you can paste directly into an iOS target and run.

## CI Build on Windows (GitHub Actions)

You can validate iOS build and tests from Windows using GitHub-hosted macOS runners.

1. Push this repository to GitHub.
2. Ensure your Xcode project (`.xcodeproj`) and at least one shared scheme are committed.
3. The workflow at `.github/workflows/ios-ci.yml` runs automatically on push and pull request.
4. You can also run it manually in `Actions > iOS CI > Run workflow` and optionally pass:
  - `project_path` (example: `RodeoDay.xcodeproj`)
  - `scheme` (example: `RodeoDay`)

If CI fails with "No .xcodeproj found" or "No shared scheme found", open the project in Xcode on macOS, create/share the scheme, commit, and rerun.
