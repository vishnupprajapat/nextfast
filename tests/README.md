# Playwright MCP Server Configuration

This directory contains configuration for the Playwright Model Context Protocol (MCP) Server, which enables AI to generate, run, debug, and fix tests automatically.

## Overview

The Playwright MCP Server provides:
- **Automatic test generation** from user stories or requirements
- **Intelligent selector generation** using best practices
- **Test execution and debugging** with detailed reports
- **Screenshot and trace capture** for debugging
- **Test fixing** based on failure analysis

## Installation

The MCP server is configured to run via npx, so no global installation is needed:

```bash
npx -y @executeautomation/playwright-mcp-server
```

## Configuration Files

### `.playwright-mcp.json`
Main configuration file for the MCP server. Contains:
- Server command and arguments
- Capabilities (test generation, debugging, etc.)
- Settings (test directory, config file, browsers)

### Integration with AI Tools

To use with AI assistants (like GitHub Copilot, Cursor, etc.):

1. The MCP server runs in the background
2. AI can invoke MCP tools to:
   - Generate tests from descriptions
   - Run existing tests
   - Debug failing tests
   - Generate optimal selectors
   - Capture screenshots and traces

## Usage

### Generate Tests
AI can generate tests by describing the scenario:
```
"Create an E2E test for user login flow"
```

### Run Tests
AI can execute tests and analyze results:
```
"Run the admin dashboard tests"
```

### Debug Tests
AI can help debug failing tests:
```
"Debug the failing product cart test"
```

### Generate Selectors
AI can generate robust selectors:
```
"Generate a selector for the submit button in the login form"
```

## Best Practices

1. **Test Organization**: Keep E2E tests in `tests/e2e/` and component tests in `tests/component/`
2. **Page Objects**: Use page object models for complex pages (see `tests/utils/page-objects.ts`)
3. **Custom Fixtures**: Extend fixtures for reusable test setup (see `tests/fixtures/`)
4. **Selectors**: Prefer data-testid attributes over CSS selectors
5. **Assertions**: Use specific assertions with clear error messages

## Troubleshooting

If the MCP server fails to start:
1. Ensure Node.js is installed (v18+)
2. Check network connectivity (npx downloads the package)
3. Verify Playwright is installed: `pnpm exec playwright --version`
4. Review logs in `test-results/` directory

## Documentation

- [Playwright Documentation](https://playwright.dev)
- [MCP Protocol](https://modelcontextprotocol.io)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
