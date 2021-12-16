import CLONING_LIB from './cloning-lib-wrapper'

test('cloning lib deep cloning success', () => {
  const obj1 = { a: 123, b: 123, c: { a: 123, b: 123 } }
  const obj2 = CLONING_LIB.deepClone(obj1)
  obj2.c.a = 0
  expect(obj1.c.a).toBe(123)
})

test('cloning lib shallow cloning success', () => {
  const obj1 = { a: 123, b: 123, c: { a: 123, b: 123 } }
  const obj2 = CLONING_LIB.shallowClone(obj1)
  obj2.c.a = 0
  expect(obj1.c.a).toBe(0)
})

test('cloning lib shallow cloning fail', () => {
  const obj1 = { a: 123, b: 123, c: { a: 123, b: 123 } }
  const obj2 = CLONING_LIB.shallowClone(obj1)
  obj2.c.a = 0
  expect(obj1.c.a === 123).toBe(false)
})
