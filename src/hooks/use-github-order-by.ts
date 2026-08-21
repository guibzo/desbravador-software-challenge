import { parseAsStringEnum, useQueryState } from 'nuqs'

export type GithubOrderBy = 'stars' | 'name' | 'forks' | 'updated'

const orderByValues: GithubOrderBy[] = ['stars', 'name', 'forks', 'updated']
const orderByParser = parseAsStringEnum(orderByValues).withDefault('stars')

export const useGithubOrderBy = () => useQueryState('orderBy', orderByParser)
