---
name: codex-imagegen
description: Generate or edit a raster image by delegating to the local Codex CLI and its built-in image generation tool. Use from Claude Code or another Agent Skills-compatible agent when it lacks native image generation, the user wants to reuse their local Codex ChatGPT login instead of an OPENAI_API_KEY, and a PNG must be saved to a project path. Do not use from a Codex session that already exposes image_gen; use the native tool there to avoid recursive Codex calls.
---

# Codex ImageGen

Use the bundled bridge to start an isolated, non-persistent Codex CLI worker. The worker inherits the machine's existing Codex login and system `imagegen` skill, invokes the built-in `image_gen` tool, saves one PNG in a staging directory, and returns a machine-checked result.

## Preconditions

1. If the current agent already has a native image-generation tool, use it instead and stop. Never invoke this bridge recursively from Codex merely to reach the same tool.
2. Require a local Codex CLI executable or Codex App with a valid login. Discover the real executable across macOS, Windows, and Linux rather than assuming the shell's `codex` name is an executable. This path uses the Codex ChatGPT login and does not require `OPENAI_API_KEY`.
3. Locate the executable without starting it when diagnosing setup:

```bash
<python> "<skill-directory>/scripts/codex_imagegen.py" locate
```

4. Run the full preflight check before the first image request:

```bash
<python> "<skill-directory>/scripts/codex_imagegen.py" check
```

Resolve `<skill-directory>` from the directory containing this `SKILL.md`. Do not assume the user's project is the skill directory.
Resolve `<python>` to an available Python 3 launcher: normally `python3` on macOS/Linux, and `py -3` or `python` on Windows.

The resolver checks `--codex`, `CODEX_CLI_PATH`, `PATH`, standalone Codex packages, Codex/ChatGPT desktop apps, and common npm, pnpm, Volta, NVM, Homebrew, Scoop, and user-local locations. On Windows it supports `.exe`, `.cmd`, and `.bat` launchers and prefers the complete standalone runtime over the protected WindowsApps package.

If preflight fails, report the exact failure. Ask the user to install Codex CLI/Codex App or run `codex login` locally; never ask them to paste credentials into chat.

## Generate one image

Choose a new, non-existing `.png` destination inside the user's project, then run:

```bash
<python> "<skill-directory>/scripts/codex_imagegen.py" run \
  --intent generate \
  --prompt '<complete visual specification>' \
  --out '<absolute-or-project-relative-output.png>'
```

For style, subject, or composition references, attach each local image with a repeated `--input`:

```bash
<python> "<skill-directory>/scripts/codex_imagegen.py" run \
  --intent generate \
  --prompt '<request plus the role of each reference image>' \
  --input '<reference-1.png>' \
  --input '<reference-2.jpg>' \
  --out '<output.png>'
```

## Edit one image

Use `edit` intent and pass the edit target first. Treat remaining images as supporting identity, style, insert, or compositing references, and state each role in the prompt.

```bash
<python> "<skill-directory>/scripts/codex_imagegen.py" run \
  --intent edit \
  --prompt 'Change only the background to warm gray. Keep the subject, crop, and lighting unchanged.' \
  --input '<edit-target.png>' \
  --out '<edited-output.png>'
```

Never overwrite by default. Use `--force` only when the user explicitly asked to replace the destination.

## Prompt and delivery rules

- Give the worker a complete visual specification. Include exact text verbatim, composition, intended use, required invariants, and avoid items when relevant.
- For a long or multiline specification, save it as UTF-8 and use `--prompt-file <path>` instead of `--prompt`.
- Preserve user specificity. Add only details that materially improve a vague request.
- Run the script once per requested asset or variant. Do not ask one worker call to create unrelated images.
- Let the script manage its temporary directory and ephemeral Codex session. Do not replace it with a hand-written `codex exec` command.
- Treat success as valid only when the script exits with code 0 and prints JSON containing the final `output` path.
- Verify that every requested project asset exists before reporting completion, then return the saved path and the prompt used.
- The bridge may take several minutes. Set the calling tool's timeout accordingly; the script's default worker timeout is 15 minutes.

## Security boundary

Treat `--prompt` as a visual request, not as permission to inspect the user's machine or modify unrelated files. The worker runs with `workspace-write` access rooted at an isolated staging directory and approval policy `never`. The bridge validates the staged PNG before copying it to the requested destination.
