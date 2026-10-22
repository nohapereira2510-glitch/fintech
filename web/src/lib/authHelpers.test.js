import { test } from 'node:test'
import assert from 'node:assert/strict'
import { authErrorMessage, isEmailValid, isPasswordValid, passwordChecks, readAuthUrlError, safeNextPath } from './authHelpers.js'

test('password rules', () => {
  assert.equal(isPasswordValid('short1'), false)
  assert.equal(isPasswordValid('longpassword'), false)
  assert.equal(isPasswordValid('12345678'), false)
  assert.equal(isPasswordValid('deposits2026'), true)
  assert.deepEqual(passwordChecks('abc').map((c) => c.ok), [false, true, false])
})

test('email validation', () => {
  assert.equal(isEmailValid('mark@pinecrest.org'), true)
  assert.equal(isEmailValid(' mark@pinecrest.org '), true)
  assert.equal(isEmailValid('mark@pinecrest'), false)
  assert.equal(isEmailValid(''), false)
})

test('safeNextPath blocks open redirects', () => {
  assert.equal(safeNextPath('/account'), '/account')
  assert.equal(safeNextPath('/account?tab=1'), '/account?tab=1')
  assert.equal(safeNextPath('https://evil.example'), '/account')
  assert.equal(safeNextPath('//evil.example'), '/account')
  assert.equal(safeNextPath('/\\evil.example'), '/account')
  assert.equal(safeNextPath(null), '/account')
})

test('auth error messages', () => {
  assert.match(authErrorMessage({ code: 'invalid_credentials' }), /don’t match/)
  assert.match(authErrorMessage({ message: 'Failed to fetch' }), /couldn’t reach/)
  assert.equal(authErrorMessage({ message: 'Custom' }), 'Custom')
  assert.equal(authErrorMessage(null), '')
})

test('reads errors from email-link URLs', () => {
  const fromHash = readAuthUrlError({ search: '', hash: '#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid' })
  assert.equal(fromHash.code, 'otp_expired')
  assert.match(fromHash.message, /expired/)
  const fromQuery = readAuthUrlError({ search: '?error=server_error&error_description=Boom+here', hash: '' })
  assert.equal(fromQuery.message, 'Boom here')
  assert.equal(readAuthUrlError({ search: '?next=/account', hash: '' }), null)
})
