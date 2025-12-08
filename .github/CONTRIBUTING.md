# Contributing to NextFaster

Thank you for your interest in contributing to NextFaster! This guide will help you understand our workflow and standards.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style Guide](#code-style-guide)
- [Testing Requirements](#testing-requirements)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Maintain professional communication

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Git
- VS Code (recommended)

### Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nextfast.git
   cd nextfast
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

4. **Run Development Server**
   ```bash
   pnpm dev
   ```

5. **Verify Setup**
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch from `develop` (or `main`):

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write clean, maintainable code
- Follow the code style guide
- Add tests for new features
- Update documentation as needed

### 3. Commit Changes

Follow our commit message guidelines (see below)

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🌿 Branch Naming Convention

Branch names must follow this pattern: `<type>/<description>`

### Valid Types

| Type | Purpose | Example |
|------|---------|---------|
| `feature/` | New features | `feature/user-authentication` |
| `fix/` | Bug fixes | `fix/login-redirect-bug` |
| `hotfix/` | Critical production fixes | `hotfix/security-vulnerability` |
| `release/` | Release preparation | `release/v1.2.0` |
| `chore/` | Maintenance tasks | `chore/update-dependencies` |
| `docs/` | Documentation only | `docs/update-readme` |
| `refactor/` | Code refactoring | `refactor/simplify-auth-logic` |
| `test/` | Test additions/updates | `test/add-unit-tests` |
| `perf/` | Performance improvements | `perf/optimize-queries` |
| `ci/` | CI/CD changes | `ci/update-github-actions` |

### Rules

- Use lowercase letters
- Use hyphens to separate words
- Be descriptive but concise
- No special characters except hyphens and forward slashes

### Examples

✅ **Good:**
- `feature/admin-dashboard`
- `fix/cart-calculation-error`
- `docs/api-documentation`
- `refactor/user-service`

❌ **Bad:**
- `Feature/AdminDashboard` (wrong case)
- `fix_cart_bug` (use hyphens, not underscores)
- `admin-dashboard` (missing type)
- `feature/` (missing description)

## 💬 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Must be one of:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc)
- `refactor`: Code refactoring (no functional changes)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes (maintenance, tooling, etc)
- `revert`: Revert a previous commit

### Scope (Optional)

The scope provides additional context:

- `auth`: Authentication related
- `ui`: UI components
- `api`: API endpoints
- `db`: Database related
- `deps`: Dependencies

### Subject

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Maximum 100 characters

### Body (Optional)

- Explain the "what" and "why" vs "how"
- Wrap at 100 characters per line

### Footer (Optional)

- Reference issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

✅ **Good:**

```
feat(auth): add OAuth2 social login support

Implemented OAuth2 authentication flow for Google and GitHub.
Users can now sign in using their social media accounts.

Closes #234
```

```
fix(cart): correct total calculation for discounted items

Fixed a bug where discounts weren't properly applied when
calculating cart totals.

Fixes #456
```

```
docs: update installation instructions in README

Added troubleshooting section and clarified prerequisites.
```

```
chore(deps): update dependencies to latest versions

Updated all dependencies to their latest stable versions
to address security vulnerabilities.
```

❌ **Bad:**

```
Added new feature
```

```
Fixed bug
```

```
WIP
```

```
Update
```

## 🔍 Pull Request Process

### Before Creating a PR

1. **Ensure all checks pass:**
   ```bash
   pnpm lint        # Linting
   pnpm format      # Formatting
   pnpm typecheck   # Type checking
   pnpm test        # Tests
   ```

2. **Update documentation:**
   - Update README if needed
   - Add JSDoc comments
   - Update CHANGELOG.md

3. **Rebase on latest:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout your-branch
   git rebase develop
   ```

### PR Requirements

- [ ] Clear, descriptive title
- [ ] Detailed description of changes
- [ ] All CI/CD checks passing
- [ ] No merge conflicts
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Screenshots (if UI changes)
- [ ] Linked to related issues

### PR Title Format

Use the same format as commit messages:

```
<type>(<scope>): <description>
```

Examples:
- `feat(admin): add user management dashboard`
- `fix(auth): resolve session timeout issue`
- `docs: update API documentation`

### Review Process

1. **Self-Review:** Review your own PR first
2. **Automated Checks:** All CI/CD checks must pass
3. **Peer Review:** At least 1-2 approvals required
4. **Address Feedback:** Respond to all comments
5. **Final Approval:** Maintainer approval required

### After Approval

- Squash and merge (preferred) or rebase
- Delete your branch after merge
- Close related issues

## 🎨 Code Style Guide

### General Principles

- Write clear, readable code
- Follow DRY (Don't Repeat Yourself)
- Keep functions small and focused
- Use meaningful variable names
- Add comments for complex logic

### TypeScript

```typescript
// ✅ Good
interface User {
  id: number;
  username: string;
  email: string;
}

async function getUserById(id: number): Promise<User | null> {
  const user = await db.select().from(users).where(eq(users.id, id));
  return user[0] ?? null;
}

// ❌ Bad
function getUser(id) {
  return db.select().from(users).where(eq(users.id, id));
}
```

### React Components

```typescript
// ✅ Good - Functional component with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button className={cn("btn", `btn-${variant}`)} onClick={onClick}>
      {label}
    </button>
  );
}

// ❌ Bad - No types, unclear props
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Biome Configuration

We use Biome for linting and formatting. Run before committing:

```bash
pnpm check:fix  # Auto-fix issues
pnpm lint       # Check linting
pnpm format     # Format code
```

### File Naming

- Components: `PascalCase` (e.g., `UserProfile.tsx`)
- Utilities: `camelCase` or `kebab-case` (e.g., `formatDate.ts`, `use-auth.ts`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `API_ENDPOINTS.ts`)

## 🧪 Testing Requirements

### Test Coverage

- Aim for 80%+ code coverage
- All new features must have tests
- Bug fixes should include regression tests

### Running Tests

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

### Writing Tests

```typescript
// Example unit test
describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-01-15");
    expect(formatDate(date, "short")).toBe("Jan 15");
  });

  it("should handle invalid dates", () => {
    expect(() => formatDate(null)).toThrow();
  });
});
```

## 📞 Getting Help

- **Issues:** Check existing issues or create a new one
- **Discussions:** Use GitHub Discussions for questions
- **Discord:** Join our community server (if applicable)

## 🙏 Thank You!

Your contributions make this project better. We appreciate your time and effort!

---

**Happy Contributing! 🚀**
