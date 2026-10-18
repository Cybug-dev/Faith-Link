# AGENT.md — Rules for any AI agent working on this repo

Read this file fully before doing anything. Then read `WORKING.md`.

## 1. Start of every session
1. Read `WORKING.md` to see where work stopped: in progress, blocked, cut off midway, or done.
2. If a task is marked **In progress**, finish it or check its state before you start anything new.
3. Check `git status` and the last few commits (`git log --oneline -5`) to confirm what is actually in the code.

## 2. Token discipline (most important rule)
Tokens cost money. Every read, search, and line of output has to serve the current task.
- **Never** read the whole repo, list every directory, or open files "for context".
- **Search before you read.** Use a targeted search (Grep / `rg`) for a component name, class name, route, or visible text (e.g. a button label) to find the exact file **and line**.
- **Read only the block you need.** Use line ranges (offset/limit, `sed -n 40,80p`). Don't open a 500-line file to change 3 lines.
- Don't re-read a file you just edited to check it. Run the typecheck/build instead.
- Combine searches that don't depend on each other into one call. Don't repeat a search that already gave an answer.
- Keep replies short: what changed, where, and whether it was verified. No long summaries, no repeating code back.
- Don't explore, refactor, or "improve" code that the task doesn't touch.

### How to locate code fast
| Looking for | Search for |
|---|---|
| A button/link | its visible label text, or its `href`/`to` value |
| A component | `function ComponentName` or its file name |
| Styles | the className in `*.scss` |
| Routes | `src/App.tsx`, `src/utils/navigation.ts` |
| Page content/data | `src/pages/<Page>/` (some pages keep copy in a `*Data.ts` file) |

## 3. Code rules: no overengineering
- Make the smallest change that solves the task. No new abstractions, libraries, or config unless the task needs them.
- Match the code around your change: naming, comment density, file layout, idiom.
- Reuse existing helpers/constants (e.g. `src/utils/navigation.ts`) instead of duplicating.
- Don't add features, options, or "future-proofing" nobody asked for.
- If the task is unclear or would need a big change, stop and ask instead of guessing.

## 4. Verify
- Run `npx tsc -b` (and `npm run build` for larger changes) before calling a task done.
- Report failures honestly, with the output.

## 5. Commits
Commit only when the user asks. Use Conventional Commits with a senior-style body:

```
type(scope): short imperative summary (≤72 chars)

- What changed and where (file/component)
- Why it changed (the bug, or the requirement)
- Any side effect, follow-up, or thing reviewers should check
```
Types: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`, `test`.
Each bullet should be one precise fact. No filler like "updated files" or "minor changes".
**Do not add `Co-Authored-By` or any AI attribution lines** to commits or PRs (owner's decision).

## 6. Keep WORKING.md current
Update `WORKING.md` **while** you work, not only at the end:
- When you start a task → add it under **In progress** with the files involved.
- When you finish a step → tick it off.
- If you might be cut off → the next step must already be written down.
- When a task is done → move it to **Recently completed** as one line.
- **Keep it small:** keep only the last ~5 completed items and delete older ones (git history has them). Delete notes that no longer matter. Aim to keep the file under ~80 lines.
