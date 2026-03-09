# Contributing

Thank you for your interest in contributing to this project! Contributions are welcome and appreciated.

## How to Contribute

1. **Fork the repository** - Create your own fork of the project.

2. **Create a branch** - Create a branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** - Implement your changes following the project's coding style.

4. **Test your changes** - Ensure your changes work correctly by testing locally.

5. **Commit your changes** - Write clear, concise commit messages:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

6. **Push to your fork** - Push your changes to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** - Submit a pull request to the main repository with a clear description of your changes.

## Code Style

- Follow existing code patterns and conventions in the codebase
- Use meaningful variable and function names
- Add comments where necessary to explain complex logic
- Keep functions focused and modular

## Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub with:
- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## Governance Standards

Certain standards in this repository are maintained under the `governance/` directory as the **single source of truth**. The rules below apply to all files in that directory:

- **No duplication.** Do not copy or paraphrase a governance standard into another file (e.g., `docs/`, `README.md`, or elsewhere). Reference it by linking directly to the canonical file (e.g., `[Final Output Block standard](governance/final-output-block.md)`).
- **Final Output Block standard.** The authoritative definition lives in `governance/final-output-block.md`. Any change to that standard — including wording, required fields, or examples — must be made **only** in that file via a pull request.
- A CI check (`scripts/check-final-output-block.sh`) enforces that no `final-output-block*.md` file exists outside `governance/`. The pipeline will fail if a duplicate is introduced.

The full invariant map — covering coding conventions, repo layout, security baseline, and the Final Output Block standard — is at [governance/INDEX.md](governance/INDEX.md).

> **Phase 10 alignment:** this repository is in Phase 10 (deliberate execution). All contributor-facing governance surfaces point to [governance/INDEX.md](governance/INDEX.md) as the single source of truth. No enforcement logic changes are made during this phase — see [governance/PHASE10-PACKET.md](governance/PHASE10-PACKET.md) for full scope.

## Questions

For questions or feedback, please open an issue on GitHub.
