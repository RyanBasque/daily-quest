'use client';

/**
 * SessionProvider vazio
 * NextAuth foi removido porque não é compatível com static export
 * Para autenticação, use Supabase, Firebase ou API externa
 * Veja AUTH_SETUP.md para instruções
 */
export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
