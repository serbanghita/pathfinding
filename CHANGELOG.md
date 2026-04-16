# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.2.0] - 2026-04-16

### Fixed

- Heap now prioritizes nodes based on fCost (gCost + hCost) instead of just gCost
- Better cost comparison with hCost tiebreaker when fCosts are equal

### Changed

- Simplified bubbleUp/bubbleDown heap operations

## [0.1.0] - 2025-05-01

### Added

- `AStarPathFinding` class with continuous and step-by-step search modes
- Full path and waypoint-only result types
- Configurable distance heuristics via `DistanceStrategy` interface
- `EuclideanDistance` and `ManhattanDistance` implementations
- `MinHeapWithNodes` optimized priority queue with O(1) existence checks
- Support for 2D matrix and 1D array grid input
- Unit tests (27 tests) with Istanbul coverage reporting
- esbuild bundling configuration
- ESLint and Prettier configuration
