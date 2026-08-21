export const formatNumber = (value: number) => new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(value)

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
