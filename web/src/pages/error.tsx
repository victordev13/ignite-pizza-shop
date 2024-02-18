import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error | null

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        Vish, algo de errado não está certo 👀
      </h1>
      <p className="mb-2 text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
      </p>

      <pre>{error?.message || JSON.stringify(error)}</pre>

      <p className="mt-2 text-accent-foreground">
        Voltar para o{' '}
        <Link
          to="/"
          className="text-sky-600 transition-colors hover:text-sky-300 dark:text-sky-400"
        >
          Dashboard
        </Link>
      </p>
    </div>
  )
}
