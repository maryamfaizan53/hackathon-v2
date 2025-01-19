import { createClient } from 'next-sanity'
// import { projectId } from '../env'

// import { apiVersion, dataset, projectId } from '../env'
// export const projectId = 'p8r5n9ko'   // <--- Replace
// export const dataset = 'production'        // <--- Replace
// export const apiVersion = '2024-12-31'       // today's date or a specific one
// export const useCdn = false
// export const token = "sk6W4KlLhji0gspQg0rFiV50YHGNGEV0pG5jk8G4JqkBVk4OQVXvmZNFW2cpHpRIoZ7kBYuzXfUl1MIZr5hUIJcpBdFbsqLG8RwRVpxe6968HO385utwm9aShR42IOBmi5y3PMpnuzRM2wL78GuSPuSs0W9D6GorqwPydyg8aOimCO3PeUKt"

export const sanityClient = createClient({
  projectId: 'p8r5n9ko',
  dataset: 'production',
  apiVersion: '2024-12-31',
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: "sk3rETFqBG9yKCzxZvEm5oNdHesrzT6YMAY791i3y50bK8KjmCruatFwFoxeVUvlxY6SY6qHyTXuWb9eJEmrx3UyaOB7hX2108Qkt7P4gZaNezeQSAS7RBJe5GOdNZ5Ig0NKAmw1ZWXEf47Ro3lEmwNTInroFQntnp0oIUbmUvFZEEfKEXrW"
})


//components bnai?