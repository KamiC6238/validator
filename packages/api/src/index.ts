interface Person {
  age: number;
  name: string
}

export function createPerson(person: Person) {
  console.log(person)
}

createPerson({
  name: 'Ayanami Rei',
  age: 15
})