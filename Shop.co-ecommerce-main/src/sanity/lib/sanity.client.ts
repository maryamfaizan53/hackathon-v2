import { createClient } from 'next-sanity'
// import { projectId } from '../env'


export const sanityClient = createClient({
  projectId: 'p8r5n9ko',
  dataset: 'production', 
  apiVersion: '2024-12-31',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: "sk3rETFqBG9yKCzxZvEm5oNdHesrzT6YMAY791i3y50bK8KjmCruatFwFoxeVUvlxY6SY6qHyTXuWb9eJEmrx3UyaOB7hX2108Qkt7P4gZaNezeQSAS7RBJe5GOdNZ5Ig0NKAmw1ZWXEf47Ro3lEmwNTInroFQntnp0oIUbmUvFZEEfKEXrW"
})

