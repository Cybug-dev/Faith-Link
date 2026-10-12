// Single navigation helper: every button/link on a page resolves its target here.
// If the target's path is a route that exists in App.tsx we go there, otherwise home.
// Keep KNOWN_ROUTES in sync with the <Routes> in src/App.tsx.
const KNOWN_ROUTES = ['/', '/about', '/features', '/churches', '/contact'];

export function resolveRoute(target: string): string {
  // Match on the path only so "/#get-started" still counts as the "/" route.
  const path = target.split(/[?#]/)[0] ?? '';
  return KNOWN_ROUTES.includes(path) ? target : '/';
}
