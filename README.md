# Betcast

The original TV-style Betcast prototype: a 90-second scripted sports viewing experience that follows three sample bets across basketball, football, and soccer.

## Features

- Animated sports coverage and automatic game switching
- Sample bet progress and outcomes
- Commentary explaining each switch, with optional browser speech
- TV mode, replay, manual game selection, and timeline seeking
- Responsive layout

This is a fictional simulation, not live broadcast footage, live betting data, or a wagering service.

## Run locally

Run `npm run dev`, then open http://localhost:3000.

## Build

Run `npm run build`. The static site is generated in `dist/`; no third-party packages or environment variables are required. Node.js 22 or later is recommended.

## Vercel

Import this GitHub repository into Vercel. The included `vercel.json` sets the build command to `npm run build` and output directory to `dist`.

Recovered from the original Betcast demo created November 4, 2026. This replaces the later React recreation; that version remains in Git history.
