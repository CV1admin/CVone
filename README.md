# Civilisation.One Test Platform

Civilisation.One Test Platform is a prototype hub interface for displaying global nodes, trust, activity, education, science, achievements, alerts, and verified flows on a 3D world sphere.

The platform is designed as an operational interface, not a decorative map.

```text
Earth as interface.
Nodes as civilization organs.
Flows as verified action.
Trust as measurable health.
Achievements as visible progress.
```

## Core Features

- Global Hub Sphere at `/hub`
- Hub API endpoint at `/api/hub/sphere`
- CIV1 Score engine
- Score-based node display
- Center Node, Country Nodes, MirrorME cluster, Research Node, Validator Node
- Alerts and achievements
- Sphere mode filters
- Privacy-safe member clustering model

## Stack

```text
Next.js
React
TypeScript
Tailwind CSS
react-globe.gl
Three.js
```

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open:

```text
http://localhost:3000/hub
```

API test:

```text
http://localhost:3000/api/hub/sphere
```

## CIV1 Score Formula

```ts
CIV1_SCORE =
  trust          * 0.22 +
  education      * 0.18 +
  science        * 0.14 +
  activity       * 0.14 +
  contribution   * 0.12 +
  auditIntegrity * 0.10 +
  fundingHealth  * 0.05 +
  nodeUptime     * 0.05;
```

## Score Grades

| Score | Grade |
|---:|---|
| 0–20 | inactive |
| 21–40 | weak |
| 41–60 | developing |
| 61–80 | healthy |
| 81–95 | strong |
| 96–100 | prime |

## Project Structure

```text
/app
  /hub
    page.tsx
  /api
    /hub
      /sphere
        route.ts
/components
  /sphere
    AlertsPanel.tsx
    GlobalScorePanel.tsx
    HubSphere.tsx
    NodePopup.tsx
    ScoreBadge.tsx
    SphereControls.tsx
    SphereLegend.tsx
/lib
  civScore.ts
  hubSphereData.ts
  nodeDisplay.ts
  sphereMetrics.ts
/types
  hub.ts
```

## Privacy Rule

No exact personal member locations are displayed. MirrorME users must appear only as anonymized clusters unless explicit opt-in exists.

## Strong Platform Rule

Every visible point must eventually connect to a real platform object:

```text
node account
country profile
member cluster
proposal
funding channel
education program
research project
audit log
blockchain transaction
MirrorME identity state
```

## Status

```text
Current status: test platform ready
Primary interface: Global Hub Sphere
Primary metric: Civilisation.One Score
Primary rule: every visual node must map to a real platform object
```
