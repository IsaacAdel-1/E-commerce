  const formatCategoriesForAPI = (filters) => {
   
    return Object.keys(filters).filter(key => filters[key] == true)
    .map(key => key.replace(/_/g, "-"));

}

export default formatCategoriesForAPI ;