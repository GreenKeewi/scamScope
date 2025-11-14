# Contributing to ScamScope

Thank you for your interest in contributing to ScamScope! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues

- Use GitHub Issues to report bugs or suggest features
- Search existing issues before creating a new one
- Provide detailed information including steps to reproduce

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`, `npm run build`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Coding Standards

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Keep components focused and reusable

### Component Guidelines

- Use shadcn/ui components when available
- Follow the established folder structure
- Keep components in `src/components/`
- Put page-specific components in the page directory

### Database Changes

- Update `convex/schema.ts` for schema changes
- Create new query/mutation files in `convex/`
- Test database changes thoroughly

### Testing

- Test all new features manually
- Ensure the build succeeds (`npm run build`)
- Check for linting errors (`npm run lint`)
- Test in both light and dark modes
- Test responsive design on different screen sizes

## Development Setup

See README.md for detailed setup instructions.

## Questions?

Open an issue for questions about contributing.
