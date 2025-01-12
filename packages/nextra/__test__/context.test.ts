import { describe, it, expect, beforeAll } from 'vitest'
import {
  getAllPages,
  getCurrentLevelPages,
  getPagesUnderRoute
} from '../src/context'
import { collectFiles } from '../src/plugin'
import { CWD } from '../src/constants'
import path from 'node:path'

const NEXTRA_INTERNAL = Symbol.for('__nextra_internal__')

describe('context', () => {
  beforeAll(async () => {
    const PAGES_DIR = path.join(
      CWD,
      '..',
      '..',
      'examples',
      'swr-site',
      'pages'
    )
    const { items } = await collectFiles(PAGES_DIR)
    const __nextra_internal__ = ((globalThis as any)[NEXTRA_INTERNAL] ||= {})
    Object.assign(__nextra_internal__, {
      pageMap: items,
      route: '/docs'
    })
  })

  describe('getAllPages()', () => {
    it('should work', () => {
      expect(getAllPages()).toMatchSnapshot()
    })
  })

  describe('getCurrentLevelPages()', () => {
    it('should work', () => {
      expect(getCurrentLevelPages()).toMatchSnapshot()
    })
  })

  describe('getPagesUnderRoute()', () => {
    it('should work', () => {
      expect(getPagesUnderRoute('/docs/advanced')).toMatchSnapshot()
    })
  })
})
