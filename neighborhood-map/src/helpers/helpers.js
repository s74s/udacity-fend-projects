export const setInfoWindowContent = (place) => {
  const { name, location, categories } = place
  const address = location.address ? location.address : 'no address'
  const type = categories[0].name ? categories[0].name : ''
  return (
    `<div>
      <h2>${name}</h2>
      <p>${type}</p>
      <h3>${address}</h3>
    </div>`
  )
}