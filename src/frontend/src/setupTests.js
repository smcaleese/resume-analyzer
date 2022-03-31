import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import { server } from './tests/mocks/server.js'
import { beforeAll, afterEach, afterAll } from 'jest'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
